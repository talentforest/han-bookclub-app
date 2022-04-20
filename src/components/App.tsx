import Router from "../routes/Router";
import { useState } from "react";
import { authService } from "../firebase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <Router isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Han Book Club </footer>
    </>
  );
}

export default App;
