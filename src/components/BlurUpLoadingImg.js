import React from 'react';
import PropTypes from 'prop-types';

class BlurUpLoadingImg extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hideBlurUp: false,
      src: this.props.src,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.src !== prevState.src) {
      return {
        hideBlurUp: false,
        src: nextProps.src,
      };
    }

    return null;
  }

  hideBlurUp = () => {
    this.setState({ hideBlurUp: true });
  };

  render() {
    const { src, base64, style } = this.props;
    const { hideBlurUp } = this.state;

    return (
      <div className="responsive-image-container fill-container .noselect" style={style} >
        <img
          src={base64}
          className="blur-up"
          alt=""
          border="0"
          style={{ opacity: hideBlurUp ? '0' : '1', transition: '0.3s' }}
        />
        <img src={src} border="0" onLoad={this.hideBlurUp} alt="" />
      </div>
    );
  }
}

BlurUpLoadingImg.propTypes = {
  src: PropTypes.string,
  base64: PropTypes.string,
};

export default BlurUpLoadingImg;
