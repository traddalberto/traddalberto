/* eslint-disable */
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require("path");

exports.createPages = ({ boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  createPage({
    path: '/galeria',
    component: path.resolve(`src/pages/index.js`),
  });
};

exports.onCreateNode = ({
  node,
  getNode,
  loadNodeContent,
  boundActionCreators,
}) => {
  const { createNodeField } = boundActionCreators;
  const { frontmatter } = node;

  if (frontmatter) {
    const { heroImg, images, page } = frontmatter;

    // create relativePath field for hero imgs
    if (heroImg) {
      const relImg = path.relative(
        path.dirname(node.fileAbsolutePath),
        path.join(__dirname, '/src/images/', heroImg)
      )

      createNodeField({
        node,
        name: 'heroRelImg',
        value: relImg,
      });
    }

    // create relativePath field for gallery imgs
    if (images) {
      const relImgs = images.map((item) => {
        const relPath = path.relative(
          path.dirname(node.fileAbsolutePath),
          path.join(__dirname, '/src/images/', item.img)
        )

        return {
          imgRef: item.img,
          relPath,
          description: item.description,
          featured: item.featured,
        }
      });

      createNodeField({
        node,
        name: 'relImgs',
        value: relImgs,
      });
    }
  }
}

// TODO: add chache plugin
