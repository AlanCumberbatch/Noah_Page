import React, {useState} from 'react';
import Snackbar from '@/UIComponents/Snackbar';
import Button from '@/UIComponents/Button';

const SnackbarDemo: React.FC = () => {

  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);

    // Close Snackbar after 3 seconds
    setTimeout(() => {
      setSnackbarOpen(false);
    }, 3000);
  };

  return (
      <div >
        <Button label='Show Snackbar' color='#6200ea' onClick={handleSnackbarOpen} />
        {/* Snackbar Component */}
        <Snackbar
          message="This is a snackbar message!"
          open={isSnackbarOpen}
          onClose={handleSnackbarClose}
        />
      </div>
  );
};

export default SnackbarDemo;