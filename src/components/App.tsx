import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ResetStyle } from "theme/resetStyle";
import { theme } from "theme/theme";
import { ThemeProvider } from "styled-components";
import Router from "../Router";

export interface LogInUserInfo {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
}

function App() {
  const [init, setInit] = useState(false); // user가 null이 되지 않기 위해 초기화
  const [loggedInUserObj, setLoggedInUserObj] = useState<LogInUserInfo>({
    uid: "",
    displayName: "",
    email: "",
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
          photoURL: user.photoURL,
        });
      } else {
        setLoggedInUserObj(null);
      }
      setInit(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshUser = () => {
    const user = auth.currentUser;
    setLoggedInUserObj({ ...user });
  };

  return (
    <ThemeProvider theme={theme}>
      <ResetStyle />
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
