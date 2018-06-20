import React from 'react';
import Link from 'gatsby-link';

import { smoothScrollToY } from '../utils';
import { windowGlobal } from '../constants';

import SocialLinkButton from './SocialLinkButton';

const MobileMenu = ({
  isOpen,
  activePage,
  instagramLink,
  facebookLink,
  email,
  whatsapp,
  close,
}) => (
  <div className={`mobile-menu ${isOpen ? 'show' : ''}`}>
    <div className="mobile-menu-menu-links">
      <Link
        className={activePage === '/galeria' ? 'active' : ''}
        to="/galeria"
        onClick={(e) => {
          close();

          if (activePage === '/' || activePage === '/galeria') {
            smoothScrollToY(windowGlobal.galleryPos());
            e.preventDefault();
          }
        }}
      >
        Galeria
      </Link>
      <Link
        activeClassName="active"
        to="/projetos"
        onClick={close}
      >
        Projetos
      </Link>
      <Link
        activeClassName="active"
        onClick={close}
        to="/sobre"
      >
        Sobre
      </Link>
      <Link
        activeClassName="active"
        onClick={close}
        to="/contato"
      >
        Contato
      </Link>
    </div>
    <div className="mobile-menu-social-links center-content">
      {instagramLink &&
        <SocialLinkButton href={instagramLink} icon="instagram" />
      }
      {facebookLink &&
        <SocialLinkButton href={facebookLink} icon="facebook" />
      }
      {email &&
        <SocialLinkButton href={`mailto:${email}`} icon="email" />
      }
      {whatsapp &&
        <SocialLinkButton href={`https://api.whatsapp.com/send?phone=${whatsapp}`} icon="whatsapp" />
      }
    </div>
  </div>
);

export default MobileMenu;
