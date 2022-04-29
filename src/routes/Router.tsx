import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Auth from "./Auth";
import Profile from "./Profile";
import Book from "./Book";
import Meeting from "./Meeting";
import Vote from "./Vote";
import Setting from "./Setting";
import Navigation from "components/common/Navigation";
import CreateAccount from "./CreateAccount";
import EditProfile from "./EditProfile";

interface propsType {
  isLoggedIn: boolean;
}

function Router({ isLoggedIn }: propsType) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Auth />} />
        )}
        <Route path="/create_account" element={<CreateAccount />} />
        <Route path="/book" element={<Book />} />
        <Route path="/meeting" element={<Meeting />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/setting/editprofile" element={<EditProfile />} />
      </Routes>
      {isLoggedIn && <Navigation />}
    </BrowserRouter>
  );
}

export default Router;
