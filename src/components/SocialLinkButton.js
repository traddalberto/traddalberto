import React from 'react';
import Icon from './Icon';

const SocialLinkButton = ({ href, icon }) => (
  <a
    className="center-content"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    <Icon name={icon} />
  </a>
);

export default SocialLinkButton;
