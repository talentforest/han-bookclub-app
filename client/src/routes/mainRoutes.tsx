import { Suspense } from 'react';

import { RouteObject } from 'react-router-dom';

import Bookshelf from '@/pages/Bookshelf';
import BookshelfDetail from '@/pages/BookshelfDetail';
import Challenge from '@/pages/Challenge';
import ClubDetail from '@/pages/ClubDetail';
import ErrorPage from '@/pages/ErrorPage';
import Home from '@/pages/Home';
import LogIn from '@/pages/LogIn';
import MonthlyClubInfo from '@/pages/MonthlyClubInfo';
import PreviousClub from '@/pages/PreviousClub';
import RecommendedBookDetail from '@/pages/RecommendedBookDetail';
import Search from '@/pages/Search';
import Setting from '@/pages/Setting';
import Vote from '@/pages/Vote';
import VoteDetail from '@/pages/VoteDetail';
import YearClosingDetail from '@/pages/YearClosingDetail';

import Layout from '@/layout/Layout';

import PostListDetail from '@/components/post/PostListDetail';
import BookClubRules from '@/components/setting/BookClubRules';
import ChangePassword from '@/components/setting/ChangePassword';
import DeleteAccount from '@/components/setting/DeleteAccount';
import Developer from '@/components/setting/Developer';
import EditProfile from '@/components/setting/EditProfile';
import MyAbsenceMonth from '@/components/setting/MyAbsenceMonth';
import NotificationSetting from '@/components/setting/NotificationSetting';

const mainRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    ErrorBoundary: () => (
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/previous-bookclub',
        element: <PreviousClub />,
      },
      {
        path: '/bookclub/:id?',
        children: [
          {
            index: true,
            element: <ClubDetail />,
          },
          {
            path: 'subjects',
            element: <PostListDetail />,
          },
          {
            path: 'host-review',
            element: <PostListDetail />,
          },
        ],
      },
      {
        path: '/vote',
        children: [
          {
            index: true,
            element: <Vote />,
          },
          {
            path: ':id',
            element: <VoteDetail />,
          },
        ],
      },
      {
        path: '/bookshelf/:username?',
        children: [
          {
            index: true,
            element: <Bookshelf />,
          },
          {
            path: 'detail/:username?',
            element: <BookshelfDetail />,
          },
        ],
      },
      {
        path: '/setting',
        children: [
          {
            index: true,
            element: <Setting />,
          },
          {
            path: 'myAbsenceMonth',
            element: <MyAbsenceMonth />,
          },
          {
            path: 'edit-profile',
            element: <EditProfile />,
          },
          {
            path: 'edit-password',
            element: <ChangePassword />,
          },
          {
            path: 'delete-account',
            element: <DeleteAccount />,
          },
          {
            path: 'developer',
            element: <Developer />,
          },
          {
            path: 'bookclub-rules',
            element: <BookClubRules />,
          },
          {
            path: 'notification',
            element: <NotificationSetting />,
          },
        ],
      },
      {
        path: 'recommendedBooks',
        element: <RecommendedBookDetail />,
      },
      {
        path: 'monthlyinfo',
        element: <MonthlyClubInfo />,
      },
      {
        path: 'challenge',
        element: <Challenge />,
      },
      {
        path: 'yearClosingEvent/:id',
        element: <YearClosingDetail />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      { path: 'login', element: <LogIn isLoggedIn={true} /> },
    ],
  },
];

export default mainRoutes;
