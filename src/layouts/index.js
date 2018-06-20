import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import '../../style/main.scss';

import { windowGlobal } from '../constants';

import Header from '../components/Header';

// TODO: format 404 page
// HACK: replacing react router on home/gallery for scroll handling
const headerDarkPosYLimit = 100;

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headerDarkTheme: this.props.location.pathname === '/',
      lastPathName: this.props.location.pathname,
      galleryActive: windowGlobal.location.pathname === '/galeria',
      homeActive: windowGlobal.location.pathname === '/',
      isMobile: windowGlobal.innerWidth < 599,
    };
    this.running = false;
    this.onResizeWindowRunning = false;

    windowGlobal.addEventListener('scroll', this.changeHeaderTheme);
    windowGlobal.addEventListener('resize', this.onResizeWindow);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.lastPathName !== nextProps.location.pathname) {
      return {
        headerDarkTheme: nextProps.location.pathname === '/' && windowGlobal.scrollY < headerDarkPosYLimit,
        lastPathName: nextProps.location.pathname,
        homeActive: nextProps.location.pathname === '/',
        galleryActive: nextProps.location.pathname === '/galeria',
      };
    }

    return null;
  }

  onResizeWindow = () => {
    if (!this.onResizeWindowRunning) {
      windowGlobal.requestAnimationFrame(() => {
        this.setState({ isMobile: windowGlobal.innerWidth < 599 });

        this.onResizeWindowRunning = false;
      });

      this.onResizeWindowRunning = true;
    }
  }

  // change header theme when user scrolls
  changeHeaderTheme = () => {
    if (this.props.location.pathname === '/' || this.props.location.pathname === '/galeria') {
      const lastScrollPos = windowGlobal.scrollY;
      const galleryPos = windowGlobal.galleryPos / 2;

      if (!this.running) {
        windowGlobal.requestAnimationFrame(() => {
          if ((lastScrollPos <= headerDarkPosYLimit) !== this.state.headerDarkTheme) {
            this.setState({ headerDarkTheme: lastScrollPos <= headerDarkPosYLimit });
          }

          if (windowGlobal.scrollY < galleryPos && windowGlobal.location.pathname !== '/') {
            windowGlobal.history.pushState(null, null, '/');
            this.setState({
              homeActive: true,
              galleryActive: false,
            });
          } else if (windowGlobal.scrollY >= galleryPos && windowGlobal.location.pathname !== '/galeria') {
            windowGlobal.history.pushState(null, null, '/galeria');
            this.setState({
              homeActive: false,
              galleryActive: true,
            });
          }

          this.running = false;
        });

        this.running = true;
      }
    }
  }

  render() {
    const { children, data, location: { pathname } } = this.props;
    const {
      headerDarkTheme,
      homeActive,
      galleryActive,
      isMobile,
    } = this.state;

    const activePage = homeActive ? '/' : (
      galleryActive ? '/galeria' : pathname
    );

    return (
      <React.Fragment>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
          link={[
            {
              href:
                'https://fonts.googleapis.com/css?family=Montserrat:300,400,500|Source+Sans+Pro:300,400,600',
              rel: 'stylesheet',
            },
          ]}
        />
        <Header
          facebookLink={data.markdownRemark.frontmatter.facebookLink}
          instagramLink={data.markdownRemark.frontmatter.instagramLink}
          email={data.markdownRemark.frontmatter.email}
          whatsapp={data.markdownRemark.frontmatter.whatsapp}
          darkTheme={headerDarkTheme}
          page={activePage}
          homeActive={homeActive}
          galleryActive={galleryActive}
          isMobile={isMobile}
        />
        {children({ ...this.props, isMobile })}
      </React.Fragment>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.func,
};

export default Layout;

export const query = graphql`
  query siteQuery {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { page: { eq: "contact" } }) {
      frontmatter {
        instagramLink
        facebookLink
        email
        whatsapp
      }
    }
  }
`;
