import React from 'react';

const MenuButton = ({ theme, onClick, state }) => (
  <div
    className={`menu-button center-content ${theme} ${state}`}
    onClick={onClick}
  >
    <div className="menu-button-bars-container">
      <div className="menu-button-bar top" />
      <div className="menu-button-bar middle" />
      <div className="menu-button-bar bottom" />
    </div>
  </div>
);

export default MenuButton;
