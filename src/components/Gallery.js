import React from 'react';
import Img from 'gatsby-image';
import Link from 'gatsby-link';

import { removeSpaceFromSrcSet } from '../utils';

import Footer from './Footer';
import GalleryModal from './GalleryModal';

// TODO: se der tempo, colocar inicie um projeto com a gente como um bloco da grid

const Gallery = class extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedPos: null,
      modalIsOpen: false,
    };

    this.flattenedImages = this.props.images
      .map(item => item.node.fields.images)
      .reduce((a, b) => a.concat(b), [])
      .filter(item => item);
  }

  setImage = (i) => {
    document.documentElement.style.overflowY = 'hidden';

    this.setState({
      selectedPos: i,
      modalIsOpen: true,
    });
  }

  closeModal = () => {
    document.documentElement.style.overflowY = null;

    this.setState({ modalIsOpen: false });
  }

  increasePos = () => {
    this.setState({
      selectedPos: this.state.selectedPos + 1 <= this.flattenedImages.length - 1
        ? this.state.selectedPos + 1 : this.state.selectedPos,
    });
  }

  decreasePos = () => {
    this.setState({
      selectedPos: this.state.selectedPos - 1 >= 0
        ? this.state.selectedPos - 1 : this.state.selectedPos,
    });
  }

  render() {
    const {
      props: {
        footer,
        className,
        isMobile,
        activePage,
        contactHeroImg,
      },
      state: {
        selectedPos,
        modalIsOpen,
      },
      flattenedImages,
    } = this;

    return (
      <React.Fragment>
        <section className={`gallery ${className}`}>
          <div className="photo-container">
            {flattenedImages.map((img, i) => (
              <div
                key={i}
                className={`photo ${img.featured ? 'featured' : ''}`}
                onClick={() => this.setImage(i)}
              >
                <Img sizes={{
                  ...img.relPath.childImageSharp.sizes,
                  srcSet: removeSpaceFromSrcSet(img.relPath.childImageSharp.sizes.srcSet),
                  }}
                />
                <div className="color-overlay fill-container" />
              </div>
            ))}
            <Link to="/contato" className="photo">
              <Img sizes={contactHeroImg} />
              <div className="color-overlay fill-container" />
              <div className="text-wrapper fill-container center-content">
                <span>Inicie um projeto<br /> com a gente</span>
              </div>
            </Link>
          </div>
          {isMobile &&
            <div className="bottom-nav">
              <Link to={activePage !== 'Galeria' ? '/galeria' : '/projetos'}>
                {activePage !== 'Galeria' ? 'Galeria' : 'Projetos'}
              </Link>
              <Link to="/sobre">Sobre</Link>
              <Link to="/contato">Contato</Link>
            </div>
          }
          <Footer phone={footer.phone} email={footer.email} facebookLink={footer.facebookLink} instagramLink={footer.instagramLink} />
        </section>
        <GalleryModal
          pos={selectedPos}
          closeModal={this.closeModal}
          images={flattenedImages}
          isOpen={modalIsOpen}
          increasePos={this.increasePos}
          decreasePos={this.decreasePos}
        />
      </React.Fragment>
    );
  }
};

Gallery.defaultProps = {
  className: '',
};

export default Gallery;
