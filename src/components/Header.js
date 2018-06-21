import React from 'react';
import Link from 'gatsby-link';

import { smoothScrollToY } from '../utils';
import { windowGlobal } from '../constants';

import Icon from './Icon';
import MenuButton from './MenuButton';
import MobileMenu from './MobileMenu';

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

const Header = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileMenuIsOpen: false,
    };
  }

  toggleMobileMenu = () => {
    // document.documentElement.style.overflowY =
    //   !this.state.mobileMenuIsOpen
    //     ? 'hidden'
    //     : null;

    this.setState({ mobileMenuIsOpen: !this.state.mobileMenuIsOpen });
  }

  closeMobileMenu = () => {
    // document.documentElement.style.overflowY = null;

    this.setState({ mobileMenuIsOpen: false });
  }

  render() {
    const {
      props: {
        instagramLink,
        facebookLink,
        darkTheme,
        page,
        galleryActive,
        homeActive,
        email,
        whatsapp,
        isMobile,
      },
      state: {
        mobileMenuIsOpen,
      },
    } = this;

    return (
      <React.Fragment>
        {isMobile &&
          <MobileMenu
            activePage={page}
            close={this.closeMobileMenu}
            instagramLink={instagramLink}
            facebookLink={facebookLink}
            email={email}
            whatsapp={whatsapp}
            isOpen={mobileMenuIsOpen}
          />
        }
        <header
          className={`top-bar center-content noselect ${!darkTheme ? 'light' : 'dark'} ${mobileMenuIsOpen ? 'mobile-menu-is-open' : ''}`}
        >
          <Link
            to="/"
            className={`nav-logo center-content ${homeActive ? 'active' : ''}`}
            onClick={(e) => {
              this.closeMobileMenu();

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
                  smoothScrollToY(windowGlobal.galleryPos());
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

          {isMobile &&
            <MenuButton
              theme={page === '/' ? 'dark' : 'light'}
              state={mobileMenuIsOpen ? 'close' : 'normal'}
              onClick={this.toggleMobileMenu}
            />
          }
        </header>
      </React.Fragment>
    );
  }
};

export default Header;
