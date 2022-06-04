import { BrowserRouter, Routes, Route } from "react-router-dom";
import { deviceSizes } from "theme/mediaQueries";
import Home from "./routes/Home";
import LogInPage from "./routes/LogInPage";
import Profile from "./routes/Profile";
import BookMeeting from "./routes/BookMeeting";
import Vote from "./routes/Vote";
import Setting from "./routes/Setting";
import BottomNav from "components/common/BottomNav";
import CreateAccount from "./routes/CreateAccount";
import EditProfile from "./routes/EditProfile";
import ScrollToTop from "util/ScrollToTop";
import HeadNav from "components/common/HeadNav";
import useWindowSize from "hooks/useWindowSize";
import FindBook from "routes/FindBook";
import SelectedBook from "routes/FindedBook";
import ClubBooksHistory from "routes/ClubBooksHistory";

interface PropsType {
  isLoggedIn: boolean;
}

function Router({ isLoggedIn }: PropsType) {
  const { windowSize } = useWindowSize();

  return (
    <BrowserRouter>
      <ScrollToTop />
      {isLoggedIn && windowSize.width >= +deviceSizes.tablet ? (
        <HeadNav />
      ) : (
        <></>
      )}
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<LogInPage />} />
        )}
        <>
          <Route path="/create_account" element={<CreateAccount />} />
          {isLoggedIn ? (
            <>
              <Route path="/bookmeeting/*" element={<BookMeeting />} />
              <Route path="/bookmeeting/find" element={<FindBook />} />
              <Route path="/bookmeeting/find/:id" element={<SelectedBook />} />
              <Route path="/history" element={<ClubBooksHistory />} />
              <Route path="/vote" element={<Vote />} />
              <Route path="/vote/:id" element={<Vote />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/setting/editprofile" element={<EditProfile />} />
            </>
          ) : (
            <Route path="/*" element={<LogInPage />} />
          )}
        </>
      </Routes>
      {isLoggedIn && windowSize.width < +deviceSizes.tablet ? (
        <BottomNav />
      ) : (
        <></>
      )}
    </BrowserRouter>
  );
}

export default Router;
