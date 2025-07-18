import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CreateAccount from '@/components/auth/CreateAccount';
import ResetPasswordEmail from '@/components/auth/ResetPasswordEmail';
import ScrollToTop from '@/components/common/ScrollToTop';
import PostListDetail from '@/components/post/PostListDetail';
import Absence from '@/components/setting/Absence';
import ChangePassword from '@/components/setting/ChangePassword';
import DeleteAccount from '@/components/setting/DeleteAccount';
import Developer from '@/components/setting/Developer';
import EditProfile from '@/components/setting/EditProfile';
import NotificationSetting from '@/components/setting/NotificationSetting';
import { authService } from '@/fbase';
import TopNavigation from '@/layout/desktop/TopNavigation';
import BottomNavigation from '@/layout/mobile/BottomNavigation';
import Bookshelf from '@/routes/Bookshelf';
import Challenge from '@/routes/Challenge';
import ClubDetail from '@/routes/ClubDetail';
import Home from '@/routes/Home';
import LogIn from '@/routes/LogIn';
import MonthlyClubInfo from '@/routes/MonthlyClubInfo';
import PreviousClub from '@/routes/PreviousClub';
import Search from '@/routes/Search';
import Setting from '@/routes/Setting';
import Vote from '@/routes/Vote';
import VoteDetail from '@/routes/VoteDetail';

interface PropsType {
  isLoggedIn: boolean;
}

function Router({ isLoggedIn }: PropsType) {
  const anonymous = authService.currentUser?.isAnonymous;

  return (
    <BrowserRouter basename="/han-bookclub-app">
      <ScrollToTop />

      {isLoggedIn ? (
        <>
          <TopNavigation />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/monthlyinfo" element={<MonthlyClubInfo />} />

            <>
              <Route path="/bookclub" element={<ClubDetail />} />
              <Route path="/bookclub/subjects" element={<PostListDetail />} />
              <Route
                path="/bookclub/host-review"
                element={<PostListDetail />}
              />
            </>

            <Route path="/challenge" element={<Challenge />} />

            <Route path="/search" element={<Search />} />

            <>
              <Route path="/previous-club" element={<PreviousClub />} />
              <Route path="/previous-club/:id" element={<ClubDetail />} />
              <Route
                path="/previous-club/:id/host-review"
                element={<PostListDetail />}
              />
              <Route
                path="/previous-club/:id/subjects"
                element={<PostListDetail />}
              />
            </>

            <>
              <Route path="/vote" element={<Vote />} />
              <Route path="/vote/:id" element={<VoteDetail />} />
            </>

            <Route path="/bookshelf" element={<Bookshelf />} />
            <Route path="/bookshelf/:username" element={<Bookshelf />} />

            <Route path="/setting" element={<Setting />} />
            <Route path="/setting/absence" element={<Absence />} />
            <Route path="/setting/edit-profile" element={<EditProfile />} />
            <Route path="/setting/edit-password" element={<ChangePassword />} />
            <Route path="/setting/delete-account" element={<DeleteAccount />} />
            <Route path="/setting/developer" element={<Developer />} />
            <Route
              path="/setting/notification"
              element={<NotificationSetting />}
            />

            {anonymous && (
              <>
                <Route
                  path="/login"
                  element={<LogIn isLoggedIn={isLoggedIn} />}
                />
                <Route path="/create_account" element={<CreateAccount />} />
              </>
            )}
          </Routes>
          <BottomNavigation />
        </>
      ) : (
        <Routes>
          <Route path="/" element={<LogIn isLoggedIn={isLoggedIn} />} />
          <Route path="/find_pw" element={<ResetPasswordEmail />} />
          <Route path="/*" element={<LogIn isLoggedIn={isLoggedIn} />} />
          <Route path="/create_account" element={<CreateAccount />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default Router;
