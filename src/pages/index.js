import React from 'react';
// import Link from 'gatsby-link';

import { smoothScrollToY } from '../utils';
import { windowGlobal } from '../constants';

import LogoType from '../components/LogoType';
import Gallery from '../components/Gallery';
import Icon from '../components/Icon';
import AnimateMount from '../components/AnimateMount';

const Home = class extends React.Component {
  state = {
    videoIsOpen: false,
  }

  componentDidMount() {
    // hack for play bg video on smartphone with data saver on
    window.addEventListener('click', this.playVideo);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.playVideo);
  }

  toggleVideoModal = () => {
    document.documentElement.style.overflowY = !this.state.videoIsOpen ? 'hidden' : null;

    this.setState({ videoIsOpen: !this.state.videoIsOpen });

    if (!this.state.videoIsOpen) {
      this.video.pause();
      this.videoIsPlaying = false;
    } else {
      this.playVideo();
    }
  }

  playVideo = () => {
    if (!this.videoIsPlaying) this.video.play();
    this.videoIsPlaying = true;
  }

  render() {
    const { props: { data, isMobile }, state: { videoIsOpen } } = this;

    return (
      <React.Fragment>
        <section className="home center-content">
          <div className="video center-content">
            <video
              ref={(i) => { this.video = i; }}
              src="/video/video-loop.v3.600kbps.mp4"
              muted
              autoPlay
              loop
              playsInline
              async
            />
            <div className="color-overlay" />
          </div>
          <div className="centered-container">
            <LogoType />
            <button className="button light" onClick={this.toggleVideoModal}>
              <Icon name="play_arrow" /><span>Assistir vídeo</span>
            </button>
          </div>
          <div
            className="scroll-indicator"
            onClick={() => {
              smoothScrollToY(windowGlobal.galleryPos());
            }}
          >
            <span>Galeria</span>
            <div className="line"><div className="animated-line" /></div>
          </div>
        </section>
        <Gallery
          images={data.gallery.edges}
          footer={data.contact.frontmatter}
          isMobile={isMobile}
          contactHeroImg={data.contact.fields.heroRelImg.childImageSharp.sizes}
          activePage="Galeria"
        />
        <AnimateMount
          containerClass="modal video-modal"
          mounted={videoIsOpen}
        >
          <iframe
            title="youtube video"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/ySOpghRdOMQ?rel=0&amp;showinfo=0&amp;autoplay=1"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            autoPlay
          />
          <button
            className="close-button center-content"
            onClick={this.toggleVideoModal}
          >
            <Icon name="close" />
          </button>
        </AnimateMount>
      </React.Fragment>
    );
  }
};

export default Home;

export const query = graphql`
  query indexQuery {
    gallery: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: {frontmatter: {type: {eq: "project"}}}
    ) {
      edges {
        node {
          id
          fields {
            images: galleryRelImgs {
              relPath {
                childImageSharp {
                  sizes(maxWidth: 700, quality: 70) {
                    ...GatsbyImageSharpSizes
                  }
                }
              }
              description
              featured
            }
          }
        }
      }
    }

    contact: markdownRemark(frontmatter: { page: { eq: "contact" }}) {
      frontmatter {
        instagramLink
        facebookLink
        phone
        email
      }
      fields {
        heroRelImg {
          childImageSharp {
            sizes(maxWidth: 700, quality: 70) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`;
