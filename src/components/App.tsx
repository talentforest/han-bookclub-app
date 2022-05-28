import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ResetStyle } from "theme/resetStyle";
import { theme } from "theme/theme";
import { ThemeProvider } from "styled-components";
import Router from "../Router";
import Loading from "./common/Loading";

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
        <Loading />
      )}
    </ThemeProvider>
  );
}

export default App;

// vote UI 만들기
// vote box id 생성할 방법 생각하고 홈에 해당 아이디로 이동할 수 있도록 변경하기

// 로직:
// 1. 이달의 책 정보를 firebase에 저장하기
// 2. 저장된 정보를 홈 / 북에 나타내기

//* 탭으로 도서정보 | 발제문 나타내기 */

//* 월별로 발제문, 모임 후기 구분해서 볼 수 있도록 하기. 월별은 버튼으로 구현 */
