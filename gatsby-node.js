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
    const { heroImg, gallery, project, description } = frontmatter;

    // create relativePath field for hero imgs
    if (heroImg) {
      const relImg = path.relative(
        path.dirname(node.fileAbsolutePath),
        path.join(__dirname, '/static/', heroImg)
      )

      createNodeField({
        node,
        name: 'heroRelImg',
        value: relImg,
      });
    }

    // create relativePath field for gallery imgs
    if (gallery) {
      const relImgs = gallery
      .filter(item => item.img)
      .map((item) => {
        const relPath = path.relative(
          path.dirname(node.fileAbsolutePath),
          path.join(__dirname, '/static/', item.img)
        )

        return {
          imgRef: item.img,
          relPath,
          description: item.description || description || '',
          featured: item.featured || false,
        }
      });

      createNodeField({
        node,
        name: 'galleryRelImgs',
        value: relImgs,
      });
    }

    // create relativePath field for project imgs
    if (project) {
      const relImgs = project
      .filter(item => item.img)
      .map((item) => {
        const relPath = path.relative(
          path.dirname(node.fileAbsolutePath),
          path.join(__dirname, '/static/', item.img)
        )

        return {
          imgRef: item.img,
          relPath,
          description: item.description || description || '',
          featured: item.featured || false,
        }
      });

      createNodeField({
        node,
        name: 'projectRelImgs',
        value: relImgs,
      });
    }
  }
}

/* gatsby-plugin-netlify-cache */

const { resolve, basename } = require(`path`);

const { ensureDir, readdir, copy } = require(`fs-extra`);

async function calculateDirs(store) {
  const program = store.getState().program

  const dirsToCache = [
    resolve(program.directory, `public`),
    resolve(program.directory, `public`, `static`),
    resolve(program.directory, `.cache`)
  ]

  for (const dir of dirsToCache) {
    await ensureDir(dir)
  }

  const netlifyCacheDir = resolve(
    process.env.NETLIFY_BUILD_BASE,
    `cache`,
    `gatsby`
  )

  await ensureDir(netlifyCacheDir)

  return {
    dirsToCache,
    netlifyCacheDir
  }
}

exports.onPreBootstrap = async function({ store }) {
  if (!process.env.NETLIFY_BUILD_BASE) {
    return
  }

  const { dirsToCache, netlifyCacheDir } = await calculateDirs(store)

  for (const dirPath of dirsToCache) {
    const dirName = basename(dirPath)
    const cachePath = resolve(netlifyCacheDir, dirName)

    await ensureDir(cachePath)

    const dirFiles = await readdir(dirPath)
    const cacheFiles = await readdir(cachePath)

    console.log(
      `Found ${cacheFiles.length} cached files for ${dirName} directory with ${
        dirFiles.length
      } files.`
    )

    await copy(cachePath, dirPath)
  }

  console.log(`Netlify cache restored`)
}

exports.onPostBuild = async function({ store }) {
  if (!process.env.NETLIFY_BUILD_BASE) {
    return
  }

  const { dirsToCache, netlifyCacheDir } = await calculateDirs(store)

  for (const dirPath of dirsToCache) {
    const dirName = basename(dirPath)
    const cachePath = resolve(netlifyCacheDir, dirName)

    const dirFiles = await readdir(dirPath)
    const cacheFiles = await readdir(cachePath)

    console.log(
      `Found ${dirFiles.length} files in ${dirName} directory with ${
        cacheFiles.length
      } already cached files.`
    )

    await copy(dirPath, cachePath)
  }

  console.log(`Netlify cache refilled`)
}
