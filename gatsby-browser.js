/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import { windowGlobal } from './src/constants';

const galleryPos = () => (windowGlobal.innerHeight - (64 - 8));

exports.shouldUpdateScroll = (prevRouterProps) => {
  if (prevRouterProps.pathname === '/galeria') {
    return [0, galleryPos()];
  }

  return true;
};

exports.onClientEntry = () => {
  windowGlobal.galleryPos = galleryPos;
};
