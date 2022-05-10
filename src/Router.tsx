import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { LogInUserInfo } from "components/App";

interface PropsType {
  isLoggedIn: boolean;
  loggedInUserObj: LogInUserInfo;
  refreshUser: () => void;
}

function Router({ isLoggedIn, loggedInUserObj, refreshUser }: PropsType) {
  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<LogInPage />} />
        )}
        <>
          {isLoggedIn ? (
            <>
              <Route path="/create_account" element={<CreateAccount />} />
              <Route path="/book" element={<Book />} />
              <Route path="/meeting" element={<Meeting />} />
              <Route path="/vote" element={<Vote />} />
              <Route
                path="/profile"
                element={<Profile loggedInUserObj={loggedInUserObj} />}
              />
              <Route path="/setting" element={<Setting />} />
              <Route
                path="/setting/editprofile"
                element={
                  <EditProfile
                    refreshUser={refreshUser}
                    loggedInUserObj={loggedInUserObj}
                  />
                }
              />
            </>
          ) : (
            <Route path="/*" element={<LogInPage />} />
          )}
        </>
      </Routes>
      {isLoggedIn && <Navigation />}
    </BrowserRouter>
  );
}

export default Router;
