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
  const [userObj, setUserObj] = useState<LogInUserInfo>({
    uid: "",
    displayName: "",
    email: "",
    photoURL: "",
  });

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserObj({
          uid: user.uid,
          displayName: user.displayName ? user.displayName : "한 페이지 멤버",
          email: user.email,
          photoURL: user.photoURL,
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshUser = () => {
    const user = auth.currentUser;
    setUserObj({ ...user });
  };

  return (
    <ThemeProvider theme={theme}>
      <ResetStyle />
      {init ? (
        <Router
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "Initializing..."
      )}
    </ThemeProvider>
  );
}

export default App;
