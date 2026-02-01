import React, {useState} from 'react';
import styled from 'styled-components';
import Snackbar from './Snackbar';

// Define AppBar and its components with styled-components
const AppBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #6200ea;
  padding: 10px 20px;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const AppBar: React.FC = () => {

  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleMenuClick = () => {
    setSnackbarOpen(true);
  };

  return (
    <>
    <AppBarWrapper>
      <Logo>MyApp</Logo>
      <Title>Dashboard</Title>
      <MenuButton onClick={handleMenuClick}>☰</MenuButton>
    </AppBarWrapper>

      <Snackbar
      message="Menu clicked!"
      open={isSnackbarOpen}
      onClose={handleSnackbarClose}
      />
    </>
  );
};

export default AppBar;