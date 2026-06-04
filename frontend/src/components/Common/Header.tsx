import React from 'react';
import './Header.scss';

interface HeaderProps {
  title?: string;
  showMenu?: boolean;
  onMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'NiCE AI Quiz Platform',
  showMenu = true,
  onMenuToggle,
}) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          {showMenu && (
            <button
              className="header-menu-btn"
              onClick={onMenuToggle}
              aria-label="Toggle menu"
            >
              <span className="menu-icon">☰</span>
            </button>
          )}
          <h1 className="header-title">{title}</h1>
        </div>

        <div className="header-right">
          <div className="header-user">
            <span className="user-name">Trainer Name</span>
            <button className="user-avatar" aria-label="User menu">
              <span>T</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
