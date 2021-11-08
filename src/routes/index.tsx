import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from 'components/atoms';
import { Header } from 'components/organisms';
import { Dashboard } from 'components/pages';
import styled from 'styled-components';

const RouteApp = () => {
  return (
    <Router>
      <Container>
        <Header />
        <Routes>
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Container>
    </Router>
  );
};

const Container = styled(Box)`
  background-color: ${({ theme }) => theme.colors.background};
  height: 100vh;
  flex-direction: column;
`;

export default React.memo(RouteApp);
