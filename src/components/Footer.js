import React from 'react';

import Icon from './Icon';

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

const Footer = ({
  phone,
  email,
  instagramLink,
  facebookLink,
}) => (
  <footer className="page-footer center-content">
    <span className="dev-credits">Designed by <a target="_blank" rel="noopener noreferrer" href="https://lucassantos.net">Lucas Santos</a></span>
    <span className="footer-contact"><a href={`mailto:${email}`}>{email}</a>&ensp;|&ensp;{phone}</span>
    <div className="footer-social">
      {instagramLink &&
        <SocialLinkButton href={instagramLink} name="instagram" />
      }
      {facebookLink &&
        <SocialLinkButton href={facebookLink} name="facebook" />
      }
    </div>
  </footer>
);

export default Footer;
