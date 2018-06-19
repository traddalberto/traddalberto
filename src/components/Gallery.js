import React from 'react';
import Img from 'gatsby-image';

import Footer from './Footer';
import GalleryModal from './GalleryModal';

// TODO: se der tempo, colocar inicie um projeto com a gente como um bloco da grid

const Gallery = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPos: null,
      modalIsOpen: false,
    };
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
      selectedPos: this.state.selectedPos + 1 <= this.props.images.length - 1
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
        images,
        footer,
        className,
      },
      state: {
        selectedPos,
        modalIsOpen,
      },
    } = this;

    return (
      <React.Fragment>
        <section className={`gallery ${className}`}>
          <div className="photo-container">
            {images.map((img, i) => (
              <div
                key={i}
                className={`photo ${img.featured ? 'featured' : ''}`}
                onClick={() => this.setImage(i)}
              >
                <Img id={i} sizes={img.relPath.childImageSharp.sizes} />
                <div className="color-overlay fill-container" />
              </div>
            ))}
          </div>
          <button className="button">Inicie um projeto com a gente</button>
          <Footer phone={footer.phone} email={footer.email} facebookLink={footer.facebookLink} instagramLink={footer.instagramLink} />
        </section>
        <GalleryModal
          pos={selectedPos}
          closeModal={this.closeModal}
          images={images}
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
