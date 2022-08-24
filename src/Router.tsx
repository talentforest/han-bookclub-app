import { BrowserRouter, Routes, Route } from "react-router-dom";
import { deviceSizes } from "theme/mediaQueries";
import Home from "./routes/Home";
import LogInPage from "./routes/LogInPage";
import Profile from "./routes/Profile";
import BookMeeting from "./routes/BookMeeting";
import Vote from "./routes/Vote";
import Setting from "./routes/Setting";
import Navigation from "components/common/Navigation";
import CreateAccount from "./routes/CreateAccount";
import EditProfile from "./routes/EditProfile";
import ScrollToTop from "util/ScrollToTop";
import DesktopHeader from "components/header/DesktopHeader";
import useWindowSize from "hooks/useWindowSize";
import Search from "routes/Search";
import SearchedBookInfo from "routes/SearchedBookInfo";
import ClubHistory from "routes/ClubHistory";
import UserDataInputForm from "components/loginForm/UserDataInputForm";
import ResetPasswordEmail from "routes/ResetPasswordEmail";
import EditPassword from "routes/EditPassword";
import VoteDetail from "routes/VoteDetail";
import UpdateRequest from "routes/UpdateRequest";
import DeleteAccount from "components/settings/DeleteAccount";
import ClubHistoryDetail from "routes/ClubHistoryDetail";

interface PropsType {
  isLoggedIn: boolean;
}

function Router({ isLoggedIn }: PropsType) {
  const { windowSize } = useWindowSize();

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ScrollToTop />
      {isLoggedIn && windowSize.width >= +deviceSizes.tablet && (
        <DesktopHeader />
      )}
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<LogInPage />} />
        )}
        <>
          <Route path="/find_pw" element={<ResetPasswordEmail />} />
          <Route path="/create_account" element={<CreateAccount />} />
          <Route
            path="/create_account/userInfo"
            element={<UserDataInputForm />}
          />
          {isLoggedIn ? (
            <>
              <Route path="/bookmeeting/*" element={<BookMeeting />} />
              <Route path="/bookmeeting/search" element={<Search />} />
              <Route
                path="/bookmeeting/search/:id"
                element={<SearchedBookInfo />}
              />
              <Route path="/history" element={<ClubHistory />} />
              <Route path="/history/:id" element={<ClubHistoryDetail />} />
              <Route path="/vote" element={<Vote />} />
              <Route path="/vote/:id" element={<VoteDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/setting/edit-profile" element={<EditProfile />} />
              <Route path="/setting/edit-password" element={<EditPassword />} />
              <Route
                path="/setting/delete-account"
                element={<DeleteAccount />}
              />
              <Route
                path="/setting/update-request"
                element={<UpdateRequest />}
              />
            </>
          ) : (
            <Route path="/*" element={<LogInPage />} />
          )}
        </>
      </Routes>
      {isLoggedIn && windowSize.width < +deviceSizes.tablet && <Navigation />}
    </BrowserRouter>
  );
}

export default Router;
