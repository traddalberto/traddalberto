import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import '../../style/main.scss';

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
      galleryActive: window.location.pathname === '/galeria',
      homeActive: window.location.pathname === '/',
    };
    this.running = false;

    window.addEventListener('scroll', this.changeHeaderTheme);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.lastPathName !== nextProps.location.pathname) {
      return {
        headerDarkTheme: nextProps.location.pathname === '/' && window.scrollY < headerDarkPosYLimit,
        lastPathName: nextProps.location.pathname,
        homeActive: nextProps.location.pathname === '/',
        galleryActive: nextProps.location.pathname === '/galeria',
      };
    }

    return null;
  }

  // change header theme when user scrolls
  changeHeaderTheme = () => {
    if (this.props.location.pathname === '/' || this.props.location.pathname === '/galeria') {
      const lastScrollPos = window.scrollY;
      const galleryPos = window.galleryPos / 2;

      if (!this.running) {
        window.requestAnimationFrame(() => {
          if ((lastScrollPos <= headerDarkPosYLimit) !== this.state.headerDarkTheme) {
            this.setState({ headerDarkTheme: lastScrollPos <= headerDarkPosYLimit });
          }

          if (window.scrollY < galleryPos && window.location.pathname !== '/') {
            window.history.pushState(null, null, '/');
            this.setState({
              homeActive: true,
              galleryActive: false,
            });
          } else if (window.scrollY >= galleryPos && window.location.pathname !== '/galeria') {
            window.history.pushState(null, null, '/galeria');
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
    const { headerDarkTheme, homeActive, galleryActive } = this.state;

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
                'https://fonts.googleapis.com/css?family=Montserrat:300,500|Source+Sans+Pro:300,400,600',
              rel: 'stylesheet',
            },
          ]}
        />
        <Header
          facebookLink={data.markdownRemark.frontmatter.facebookLink}
          instagramLink={data.markdownRemark.frontmatter.instagramLink}
          darkTheme={headerDarkTheme}
          page={pathname}
          homeActive={homeActive}
          galleryActive={galleryActive}
        />
        {children()}
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
      }
    }
  }
`;
