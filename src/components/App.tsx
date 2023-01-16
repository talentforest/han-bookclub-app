import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { ResetStyle } from 'theme/resetStyle';
import { theme } from 'theme/theme';
import { ThemeProvider } from 'styled-components';
import { currentUserState } from 'data/userAtom';
import { useRecoilState } from 'recoil';
import Router from '../Router';
import Loading from './atoms/Loading';

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
      {init ? <Router isLoggedIn={Boolean(userData)} /> : <Loading full />}
    </ThemeProvider>
  );
}

export default App;
