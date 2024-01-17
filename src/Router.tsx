import { authService } from 'fbase';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import LogIn from './routes/LogIn';
import BookClubOfThisMonth from './routes/BookClubOfThisMonth';
import Vote from './routes/Vote';
import Setting from './routes/Setting';
import BottomNavigation from 'layout/mobile/BottomNavigation';
import CreateAccount from './routes/CreateAccount';
import EditProfile from './routes/EditProfile';
import TopNavigation from 'layout/desktop/TopNavigation';
import Search from 'routes/Search';
import SearchedBookInfo from 'routes/SearchedBookInfo';
import BookClubHistory from 'routes/BookClubHistory';
import ResetPasswordEmail from 'routes/ResetPasswordEmail';
import ChangePassword from 'routes/ChangePassword';
import VoteDetail from 'routes/VoteDetail';
import DeleteAccount from 'routes/DeleteAccount';
import BookClubHistoryDetail from 'routes/BookClubHistoryDetail';
import ScrollToTop from 'components/atoms/ScrollToTop';
import Bookshelf from './routes/Bookshelf';
import Post from 'routes/Post';

interface PropsType {
  isLoggedIn: boolean;
}

function Router({ isLoggedIn }: PropsType) {
  const anonymous = authService.currentUser?.isAnonymous;

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ScrollToTop />

      {isLoggedIn && <TopNavigation />}

      <Routes>
        {isLoggedIn ? (
          <>
            <Route path='/' element={<Home />} />

            <Route path='/bookclub' element={<BookClubOfThisMonth />} />
            <Route path='/bookclub/subjects' element={<Post />} />
            <Route path='/bookclub/host-review' element={<Post />} />

            <Route path='/search' element={<Search />} />
            <Route path='/search/:id' element={<SearchedBookInfo />} />

            <Route path='/history' element={<BookClubHistory />} />
            <Route path='/history/:id' element={<BookClubHistoryDetail />} />
            <Route path='/history/:id/host-review' element={<Post />} />
            <Route path='/history/:id/subjects' element={<Post />} />

            <Route path='/vote' element={<Vote />} />
            <Route path='/vote/:id' element={<VoteDetail />} />

            <Route path='/bookshelf' element={<Bookshelf />} />
            <Route path='/bookshelf/:username' element={<Bookshelf />} />

            <Route path='/setting' element={<Setting />} />
            <Route path='/setting/edit-profile' element={<EditProfile />} />
            <Route path='/setting/edit-password' element={<ChangePassword />} />
            <Route path='/setting/delete-account' element={<DeleteAccount />} />

            {anonymous && (
              <Route
                path='/login'
                element={<LogIn isLoggedIn={isLoggedIn} />}
              />
            )}
          </>
        ) : (
          <>
            <Route path='/' element={<LogIn isLoggedIn={isLoggedIn} />} />
            <Route path='/find_pw' element={<ResetPasswordEmail />} />
            <Route path='/*' element={<LogIn isLoggedIn={isLoggedIn} />} />
            <Route path='/create_account' element={<CreateAccount />} />
          </>
        )}
      </Routes>

      {isLoggedIn && <BottomNavigation />}
    </BrowserRouter>
  );
}

export default Router;
