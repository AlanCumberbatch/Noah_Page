import React, { useState } from 'react';
import './Drawer.css';

const DrawerDemo: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button className="drawer-toggle-btn" onClick={toggleDrawer}>
        {open ? 'Close Drawer' : 'Open Drawer'}
      </button>

      <div className={`drawer ${open ? 'open' : ''}`}>
        <nav className="drawer-content">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </div>

      <div className={`content ${open ? 'drawer-open' : ''}`}>
        <h2>Welcome to My App!</h2>
        <p>This is a simple drawer demo using only React and CSS.</p>
      </div>
    </div>
  );
}

export default DrawerDemo;