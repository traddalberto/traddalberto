import React from 'react';
import Gallery from '../components/Gallery';

const Projetos = ({ data, isMobile }) => (
  <Gallery
    className="projects"
    images={data.gallery.fields.relImgs}
    footer={data.footer.frontmatter}
    activePage="Projetos"
    isMobile={isMobile}
  />
);

export default Projetos;

export const query = graphql`
  query projectsQuery {
    gallery: markdownRemark(frontmatter: {page: {eq: "projects"}}) {
      fields {
        relImgs {
          featured
          imgRef
          relPath {
            childImageSharp {
              sizes(maxWidth: 700, quality: 70) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
      }
    }

    footer: markdownRemark(frontmatter: { page: { eq: "contact" }}) {
      frontmatter {
        instagramLink
        facebookLink
        phone
        email
      }
    }
  }
`;
