import { Fragment } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { authService } from '@/fbase';

import { useRecoilValue } from 'recoil';

import { modalListState } from '@/data/modalAtom';

import { useHandleModal } from '@/hooks';

import Bookshelf from '@/routes/Bookshelf';
import Challenge from '@/routes/Challenge';
import ClubDetail from '@/routes/ClubDetail';
import Home from '@/routes/Home';
import LogIn from '@/routes/LogIn';
import MonthlyClubInfo from '@/routes/MonthlyClubInfo';
import PreviousClub from '@/routes/PreviousClub';
import Search from '@/routes/Search';
import Setting from '@/routes/Setting';
import Vote from '@/routes/Vote';
import VoteDetail from '@/routes/VoteDetail';
import YearClosing from '@/routes/YearClosing';

import AppNavigation from '@/layout/AppNavigation';

import CreateAccount from '@/components/auth/CreateAccount';
import ResetPasswordEmail from '@/components/auth/ResetPasswordEmail';
import ScrollToTop from '@/components/common/ScrollToTop';
import PostListDetail from '@/components/post/PostListDetail';
import Absence from '@/components/setting/Absence';
import ChangePassword from '@/components/setting/ChangePassword';
import DeleteAccount from '@/components/setting/DeleteAccount';
import Developer from '@/components/setting/Developer';
import EditProfile from '@/components/setting/EditProfile';
import NotificationSetting from '@/components/setting/NotificationSetting';

interface RouterProps {
  isLoggedIn: boolean;
}

function Router({ isLoggedIn }: RouterProps) {
  const anonymous = authService.currentUser?.isAnonymous;
  const modalList = useRecoilValue(modalListState);

  const { hideModal } = useHandleModal();

  return (
    <BrowserRouter basename="/han-bookclub-app">
      <ScrollToTop />

      {isLoggedIn ? (
        <>
          <AppNavigation type="top" />

          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/monthlyinfo" element={<MonthlyClubInfo />} />
            <Route path="/challenge" element={<Challenge />} />
            <Route path="/yearClosingEvent" element={<YearClosing />} />
            <Route path="/search" element={<Search />} />

            <Route path="/previous-bookclub" element={<PreviousClub />} />

            <Route path="/bookclub/:id?" element={<ClubDetail />} />
            <Route
              path="/bookclub/:id?/subjects"
              element={<PostListDetail />}
            />
            <Route
              path="/bookclub/:id?/host-review"
              element={<PostListDetail />}
            />

            <Route path="/vote" element={<Vote />} />
            <Route path="/vote/:id" element={<VoteDetail />} />

            <Route path="/bookshelf/:username?" element={<Bookshelf />} />

            <Route path="/setting" element={<Setting />} />
            <Route path="/setting/absence" element={<Absence />} />
            <Route path="/setting/edit-profile" element={<EditProfile />} />
            <Route path="/setting/edit-password" element={<ChangePassword />} />
            <Route path="/setting/delete-account" element={<DeleteAccount />} />
            <Route path="/setting/developer" element={<Developer />} />
            <Route
              path="/setting/notification"
              element={<NotificationSetting />}
            />

            {anonymous && (
              <>
                <Route
                  path="/login"
                  element={<LogIn isLoggedIn={isLoggedIn} />}
                />
                <Route path="/create_account" element={<CreateAccount />} />
              </>
            )}
          </Routes>

          <AppNavigation type="bottom" />
        </>
      ) : (
        <Routes>
          <Route path="/" element={<LogIn isLoggedIn={isLoggedIn} />} />
          <Route path="/find_pw" element={<ResetPasswordEmail />} />
          <Route path="/*" element={<LogIn isLoggedIn={isLoggedIn} />} />
          <Route path="/create_account" element={<CreateAccount />} />
        </Routes>
      )}

      {modalList.length > 0 &&
        modalList.map(({ key, element, hideDim, dimUnclickable }) => (
          <Fragment key={key || 'modal'}>
            {!hideDim && (
              <div
                role="presentation"
                className={`fixed inset-0 z-10 size-full ${!dimUnclickable ? 'cursor-pointer' : 'cursor-default'} bg-black opacity-60`}
                onClick={key ? () => hideModal(key) : () => hideModal()}
              />
            )}
            {element}
          </Fragment>
        ))}
    </BrowserRouter>
  );
}

export default Router;
