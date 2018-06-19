import React from 'react';
import PropTypes from 'prop-types';

import svgPaths from '../constants/icons';

const Icon = ({
  name,
  color,
  size,
  className,
}) => {
  const styles = {
    fill: color,
  };

  return (
    <svg
      className={className}
      width={`${size}px`}
      height={`${size}px`}
      style={styles}
      viewBox="0 0 1024 1024"
    >
      <path
        d={svgPaths[name]}
      />
    </svg>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
};

Icon.defaultProps = {
  size: 48,
  color: null,
  className: 'icon',
};

export default Icon;
