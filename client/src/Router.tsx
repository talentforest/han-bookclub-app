import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CreateAccount from './components/auth/CreateAccount';
import EditProfile from './components/setting/EditProfile';
import BookClubOfThisMonth from './routes/BookClubOfThisMonth';
import Bookshelf from './routes/Bookshelf';
import Home from './routes/Home';
import LogIn from './routes/LogIn';
import Setting from './routes/Setting';
import Vote from './routes/Vote';
import { authService } from 'fbase';

import BookClubHistory from 'routes/BookClubHistory';
import BookClubHistoryDetail from 'routes/BookClubHistoryDetail';
import Challenge from 'routes/Challenge';
import Search from 'routes/Search';
// import SearchDetail from 'components/search/SearchedBookCard';
import VoteDetail from 'routes/VoteDetail';

import TopNavigation from 'layout/desktop/TopNavigation';
import BottomNavigation from 'layout/mobile/BottomNavigation';

import ResetPasswordEmail from 'components/auth/ResetPasswordEmail';
import BookClubInformation from 'components/bookClub/BookClubInformation';
import ScrollToTop from 'components/common/ScrollToTop';
import PostListDetail from 'components/post/PostListDetail';
import Absence from 'components/setting/Absence';
import ChangePassword from 'components/setting/ChangePassword';
import DeleteAccount from 'components/setting/DeleteAccount';

interface PropsType {
  isLoggedIn: boolean;
}

function Router({ isLoggedIn }: PropsType) {
  const anonymous = authService.currentUser?.isAnonymous;

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ScrollToTop />

      {isLoggedIn ? (
        <>
          <TopNavigation />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/monthlyinfo" element={<BookClubInformation />} />

            <>
              <Route path="/bookclub" element={<BookClubOfThisMonth />} />
              <Route path="/bookclub/subjects" element={<PostListDetail />} />
              <Route
                path="/bookclub/host-review"
                element={<PostListDetail />}
              />
            </>

            <Route path="/challenge" element={<Challenge />} />

            <Route path="/search" element={<Search />} />

            <>
              <Route path="/history" element={<BookClubHistory />} />
              <Route path="/history/:id" element={<BookClubHistoryDetail />} />
              <Route
                path="/history/:id/host-review"
                element={<PostListDetail />}
              />
              <Route
                path="/history/:id/subjects"
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
