import { BrowserRouter, Route, Routes } from 'react-router-dom';

import BookClubOfThisMonth from './routes/BookClubOfThisMonth';
import Bookshelf from './routes/Bookshelf';
import CreateAccount from './routes/CreateAccount';
import EditProfile from './routes/EditProfile';
import Home from './routes/Home';
import LogIn from './routes/LogIn';
import Setting from './routes/Setting';
import Vote from './routes/Vote';
import { authService } from 'fbase';

import Absence from 'routes/Absence';
import BookClubHistory from 'routes/BookClubHistory';
import BookClubHistoryDetail from 'routes/BookClubHistoryDetail';
import BookClubInformation from 'routes/BookClubInformation';
import Challenge from 'routes/Challenge';
import ChangePassword from 'routes/ChangePassword';
import DeleteAccount from 'routes/DeleteAccount';
import PostDetail from 'routes/PostDetail';
import ResetPasswordEmail from 'routes/ResetPasswordEmail';
import Search from 'routes/Search';
// import SearchDetail from 'components/search/SearchedBookCard';
import VoteDetail from 'routes/VoteDetail';

import TopNavigation from 'layout/desktop/TopNavigation';
import BottomNavigation from 'layout/mobile/BottomNavigation';

import ScrollToTop from 'components/common/ScrollToTop';

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

            <Route path="/bookclub" element={<BookClubOfThisMonth />} />
            <Route path="/bookclub/subjects" element={<PostDetail />} />
            <Route path="/bookclub/host-review" element={<PostDetail />} />

            <Route path="/challenge" element={<Challenge />} />

            <Route path="/search" element={<Search />} />
            {/* <Route path="/search/:id" element={<SearchDetail />} /> */}

            <Route path="/history" element={<BookClubHistory />} />
            <Route path="/history/:id" element={<BookClubHistoryDetail />} />
            <Route path="/history/:id/host-review" element={<PostDetail />} />
            <Route path="/history/:id/subjects" element={<PostDetail />} />

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
