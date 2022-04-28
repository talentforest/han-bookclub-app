import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { GlobalStyle } from "theme/globalStyle";
import { theme } from "theme/theme";
import { ThemeProvider } from "styled-components";
import Router from "../routes/Router";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      user ? setIsLoggedIn(true) : setIsLoggedIn(false);
      setInit(true);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {init ? <Router isLoggedIn={isLoggedIn} /> : "Initializing..."}
    </ThemeProvider>
  );
}

export default App;
