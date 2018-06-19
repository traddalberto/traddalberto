import React from 'react';
import Link from 'gatsby-link';
import Icon from '../components/Icon';

import { smoothScrollToY } from '../utils';

const SocialLinkButton = ({ href, name }) => (
  <a
    className="center-content"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    <Icon name={name} />
  </a>
);

const Header = ({
  instagramLink,
  facebookLink,
  darkTheme,
  page,
  galleryActive,
  homeActive,
}) => (
  <header className={`top-bar center-content ${darkTheme ? 'dark' : ''}`}>
    <Link
      to="/"
      className={`nav-logo center-content ${homeActive ? 'active' : ''}`}
      onClick={(e) => {
        if (page === '/' || page === '/galeria') {
          smoothScrollToY();
          e.preventDefault();
        }
      }}
    >
      <Icon name="logo" />
    </Link>

    <div className="top-bar-social-links">
      {instagramLink && (
        <SocialLinkButton href={instagramLink} name="instagram" />
      )}
      {facebookLink && <SocialLinkButton href={facebookLink} name="facebook" />}
    </div>

    <nav className="top-bar-nav">
      <Link
        className={`center-content ${galleryActive ? 'active' : ''}`}
        to="/galeria"
        onClick={(e) => {
          if (page === '/' || page === '/galeria') {
            smoothScrollToY(window.galleryPos);
            e.preventDefault();
          }
        }}
      >
        <div className="text">
          <span>Galeria</span>
        </div>
      </Link>
      <Link className="center-content" to="/projetos" activeClassName="active">
        <div className="text">
          <span>Projetos</span>
        </div>
      </Link>
      <Link className="center-content" to="/sobre" activeClassName="active">
        <div className="text">
          <span>Sobre</span>
        </div>
      </Link>
      <Link className="center-content" to="/contato" activeClassName="active">
        <div className="text">
          <span>Contato</span>
        </div>
      </Link>
    </nav>
  </header>
);

export default Header;
