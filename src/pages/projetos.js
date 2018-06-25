import React from 'react';
import Gallery from '../components/Gallery';

const Projetos = ({ data, isMobile }) => (
  <Gallery
    className="projects"
    images={data.gallery.edges}
    footer={data.contact.frontmatter}
    activePage="Projetos"
    isMobile={isMobile}
    contactHeroImg={data.contact.fields.heroRelImg.childImageSharp.sizes}
  />
);

export default Projetos;

export const query = graphql`
  query projectsQuery {
    gallery: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: {frontmatter: {type: {eq: "project"}}}
    ) {
      edges {
        node {
          id
          fields {
            images: projectRelImgs {
              relPath {
                childImageSharp {
                  sizes(maxWidth: 700, quality: 70) {
                    ...GatsbyImageSharpSizes
                  }
                }
              }
              description
              featured
            }
          }
        }
      }
    }

    contact: markdownRemark(frontmatter: { page: { eq: "contact" }}) {
      frontmatter {
        instagramLink
        facebookLink
        phone
        email
      }
      fields {
        heroRelImg {
          childImageSharp {
            sizes(maxWidth: 700, quality: 70) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`;
