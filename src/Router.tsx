import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LogInUserInfo } from "components/App";
import { deviceSizes } from "theme/mediaQueries";
import Home from "./routes/Home";
import LogInPage from "./routes/LogInPage";
import Profile from "./routes/Profile";
import Book from "./routes/Book";
import Meeting from "./routes/Meeting";
import Vote from "./routes/Vote";
import Setting from "./routes/Setting";
import Navigation from "components/common/Navigation";
import CreateAccount from "./routes/CreateAccount";
import EditProfile from "./routes/EditProfile";
import ScrollToTop from "util/ScrollToTop";
import HeadNav from "components/common/HeadNav";
import useWindowSize from "hooks/useWindowSize";
import FindBook from "routes/FindBook";
import SelectedBook from "routes/SelectedBook";

interface PropsType {
  isLoggedIn: boolean;
  userObj: LogInUserInfo;
  refreshUser: () => void;
}

function Router({ isLoggedIn, userObj, refreshUser }: PropsType) {
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
          <Route
            path="/create_account"
            element={<CreateAccount userObj={userObj} />}
          />
          {isLoggedIn ? (
            <>
              <Route path="/book" element={<Book userObj={userObj} />} />
              <Route path="/book/find" element={<FindBook />} />
              <Route path="/book/find/:id" element={<SelectedBook />} />

              <Route path="/meeting" element={<Meeting />} />
              <Route path="/vote" element={<Vote />} />
              <Route path="/vote/:id" element={<Vote />} />
              <Route path="/profile" element={<Profile userObj={userObj} />} />
              <Route path="/setting" element={<Setting />} />
              <Route
                path="/setting/editprofile"
                element={
                  <EditProfile refreshUser={refreshUser} userObj={userObj} />
                }
              />
            </>
          ) : (
            <Route path="/*" element={<LogInPage />} />
          )}
        </>
      </Routes>
      {isLoggedIn && windowSize.width < +deviceSizes.tablet ? (
        <Navigation />
      ) : (
        <></>
      )}
    </BrowserRouter>
  );
}

export default Router;
