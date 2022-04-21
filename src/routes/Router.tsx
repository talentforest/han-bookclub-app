import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Auth from "./Auth";
import Profile from "./Profile";
import Book from "./Book";
import Meeting from "./Meeting";
import Vote from "./Vote";
import Navigation from "components/Navigation";
import CreateAccount from "./CreateAccount";
import styled from "styled-components";

interface propsType {
  isLoggedIn: boolean;
}

function Router({ isLoggedIn }: propsType) {
  return (
    <Container>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          {isLoggedIn ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="/" element={<Auth />} />
          )}
          <Route path="/book" element={<Book />} />
          <Route path="/meeting" element={<Meeting />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create_account" element={<CreateAccount />} />
        </Routes>
        {isLoggedIn && <Navigation />}
      </BrowserRouter>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: scroll;
`;

export default Router;
