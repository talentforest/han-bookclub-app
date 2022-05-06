import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { GlobalStyle } from "theme/globalStyle";
import { theme } from "theme/theme";
import { ThemeProvider } from "styled-components";
import Router from "../routes/Router";
import { authService } from "fbase";

export interface UserInfo {
  uid: string;
  displayName: string | null;
  email?: string;
  phoneNumber?: string;
  photoURL?: string;
}

function App() {
  const [init, setInit] = useState(false); // user가 null이 되지 않기 위해 초기화
  const [loggedInUserObj, setLoggedInUserObj] = useState<UserInfo>({
    uid: "",
    displayName: null,
    email: "",
    phoneNumber: "",
    photoURL: "",
  });

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUserObj({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
        });
      } else {
        setLoggedInUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = auth.currentUser;
    setLoggedInUserObj({ ...user });
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {init ? (
        <Router
          isLoggedIn={Boolean(loggedInUserObj)}
          loggedInUserObj={loggedInUserObj}
          refreshUser={refreshUser}
        />
      ) : (
        "Initializing..."
      )}
    </ThemeProvider>
  );
}

export default App;
