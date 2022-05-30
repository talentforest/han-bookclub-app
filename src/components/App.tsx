import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { ResetStyle } from "theme/resetStyle";
import { theme } from "theme/theme";
import { ThemeProvider } from "styled-components";
import { currentUserState } from "data/userAtom";
import { useRecoilState } from "recoil";
import Router from "../Router";
import Loading from "./common/Loading";

function App() {
  const [init, setInit] = useState(false); // user가 null이 되지 않기 위해 초기화
  const [userData, setUserData] = useRecoilState(currentUserState);

  useEffect(() => {
    const user = getAuth().currentUser;
    setUserData({
      uid: user?.uid,
      displayName: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
    });
    setInit(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ResetStyle />
      {init ? <Router isLoggedIn={Boolean(userData)} /> : <Loading />}
    </ThemeProvider>
  );
}

export default App;

// vote UI 만들기
// vote box id 생성할 방법 생각하고 홈에 해당 아이디로 이동할 수 있도록 변경하기
//* 월별로 발제문, 모임 후기 구분해서 볼 수 있도록 하기. 월별은 버튼으로 구현 */
