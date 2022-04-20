import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Auth from "./Auth";
import { User } from "firebase/auth";

interface propsType {
  isLoggedIn: User | null;
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
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
