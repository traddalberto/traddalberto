import React from 'react';
import Markdown from 'react-markdown';

import Icon from './Icon';
import AnimateMount from './AnimateMount';
import Img from './BlurUpLoadingImg';

const GalleryModal = class extends React.Component {
  state = {
    infoIsExpanded: false,
  }

  getImageSrc = (srcSet) => {
    const srcSetList = srcSet.split(',');

    return srcSetList[srcSetList.length - 1].trim().replace(/\s.*/, '');
  }

  toggleInfoIsExpanded = () => {
    this.setState({ infoIsExpanded: !this.state.infoIsExpanded });
  }

  closeModal = () => {
    this.props.closeModal();
    this.setState({ infoIsExpanded: false });
  }

  increasePos = () => {
    this.setState({ infoIsExpanded: false });
    this.props.increasePos();
  }

  decreasePos = () => {
    this.setState({ infoIsExpanded: false });
    this.props.decreasePos();
  }

  render() {
    const {
      props: {
        images,
        pos,
        isOpen,
      },
      state: {
        infoIsExpanded,
      },
    } = this;

    const description = pos ? (images[pos].description || null) : null;

    return (
      <AnimateMount
        containerClass="modal gallery-modal"
        mounted={isOpen}
      >
        <div className="image-container">
          {images.map((img, i) => (
            pos - i === 1 ||
            pos - i === -1 ||
            pos - i === 0 ? (
              <Img
                key={i}
                src={this.getImageSrc(img.relPath.childImageSharp.sizes.srcSet)}
                base64={img.relPath.childImageSharp.sizes.base64}
                style={{ transform: `translate3d(${(i - pos) * 100}vw, 0, 0)` }}

              />
            ) : null
          ))}
        </div>
        {pos !== 0 &&
          <div className="prev-button center-content" onClick={this.decreasePos}>
            <Icon name="arrow_left" />
          </div>
        }
        {description &&
          <div key={pos} className={`image-info ${infoIsExpanded ? 'expanded' : ''}`}>
            <div className="info-text-wrapper">
              <div className="scrollable"><Markdown source={description} /></div>
            </div>
            <button className="info-button center-content" title={infoIsExpanded ? 'fechar' : 'Sobre o projeto'} onClick={this.toggleInfoIsExpanded}>
              <Icon name="info" className="info-icon" />
              <Icon name="arrow_up" className="up-arrow-icon" />
            </button>
          </div>
        }
        {pos !== images.length - 1 &&
          <div className="next-button center-content" onClick={this.increasePos}>
            <Icon name="arrow_right" />
          </div>
        }
        <button
          className="close-button center-content"
          onClick={this.closeModal}
        >
          <Icon name="close" />
        </button>
      </AnimateMount>
    );
  }
};

export default GalleryModal;
