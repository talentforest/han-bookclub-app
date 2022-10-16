import { BrowserRouter, Routes, Route } from "react-router-dom";
import { deviceSizes } from "theme/mediaQueries";
import Home from "./routes/Home";
import LogIn from "./routes/LogIn";
import BookClubOfThisMonth from "./routes/BookClubOfThisMonth";
import Vote from "./routes/Vote";
import Setting from "./routes/AppSetting";
import Navigation from "components/common/Navigation";
import CreateAccount from "./routes/CreateAccount";
import EditProfile from "./routes/EditProfile";
import DesktopHeader from "components/template/DesktopHeader";
import useWindowSize from "hooks/useWindowSize";
import Search from "routes/Search";
import SearchedBookInfo from "routes/SearchedBookInfo";
import BookClubHistory from "routes/BookClubHistory";
import ResetPasswordEmail from "routes/ResetPasswordEmail";
import ChangePassword from "routes/ChangePassword";
import VoteDetail from "routes/VoteDetail";
import UpdateRequest from "routes/UpdateRequest";
import DeleteAccount from "components/appsetting/DeleteAccount";
import BookClubHistoryDetail from "routes/BookClubHistoryDetail";
import MobileHeader from "components/template/MobileHeader";
import ScrollToTop from "components/common/ScrollToTop";
import SubjectArea from "components/template/SubjectArea";
import RecommendationArea from "components/template/RecommendationArea";
import ReviewArea from "components/template/ReviewArea";
import MyBookshelf from "./routes/MyBookshelf";
interface PropsType {
  isLoggedIn: boolean;
}

function Router({ isLoggedIn }: PropsType) {
  const { windowSize } = useWindowSize();

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ScrollToTop />
      {isLoggedIn && windowSize.width >= +deviceSizes.tablet ? (
        <DesktopHeader />
      ) : (
        <MobileHeader isLoggedIn={isLoggedIn} />
      )}
      <Routes>
        <Route path="/create_account" element={<CreateAccount />} />
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/bookclub" element={<BookClubOfThisMonth />}>
              <Route path="subjects" element={<SubjectArea />} />
              <Route path="recommends" element={<RecommendationArea />} />
              <Route path="reviews" element={<ReviewArea />} />
            </Route>
            <Route path="/search" element={<Search />} />
            <Route path="/search/:id" element={<SearchedBookInfo />} />
            <Route path="/history" element={<BookClubHistory />} />
            <Route path="/history/:id/*" element={<BookClubHistoryDetail />} />
            <Route path="/vote" element={<Vote />} />
            <Route path="/vote/:id" element={<VoteDetail />} />
            <Route path="/mybookshelf" element={<MyBookshelf />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/setting/edit-profile" element={<EditProfile />} />
            <Route path="/setting/edit-password" element={<ChangePassword />} />
            <Route path="/setting/delete-account" element={<DeleteAccount />} />
            <Route path="/setting/update-request" element={<UpdateRequest />} />
          </>
        ) : (
          <>
            <Route path="/" element={<LogIn />} />
            <Route path="/find_pw" element={<ResetPasswordEmail />} />
            <Route path="/*" element={<LogIn />} />
          </>
        )}
      </Routes>
      {isLoggedIn && windowSize.width < +deviceSizes.tablet && <Navigation />}
    </BrowserRouter>
  );
}

export default Router;
