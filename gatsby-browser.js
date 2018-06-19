/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

const galleryPos = window.innerHeight - (64 - 8);

exports.shouldUpdateScroll = (prevRouterProps) => {
  if (prevRouterProps.pathname === '/galeria') {
    return [0, galleryPos];
  }

  return true;
};

exports.onClientEntry = () => {
  window.galleryPos = galleryPos;
};
