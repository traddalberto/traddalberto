import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

import Footer from '../components/Footer';

const About = ({ data, isMobile }) => (
  <section className="about">
    <header>
      <Img className="fill-container" sizes={data.markdownRemark.fields.heroRelImg.childImageSharp.sizes} />
      <div className="color-overlay fill-container" />
      <h1>{data.markdownRemark.frontmatter.title}</h1>
    </header>
    <article>
      <p className="about-text">{data.markdownRemark.frontmatter.content}</p>
    </article>
    {isMobile &&
      <div className="bottom-nav">
        <Link to="/galeria">Galeria</Link>
        <Link to="/projetos">Projetos</Link>
        <Link to="/contato">Contato</Link>
      </div>
    }
    <Footer
      phone={data.footer.frontmatter.phone}
      email={data.footer.frontmatter.email}
      facebookLink={data.footer.frontmatter.facebookLink}
      instagramLink={data.footer.frontmatter.instagramLink}
    />
  </section>
);

export default About;

export const query = graphql`
  query AboutQuery {
    markdownRemark(frontmatter: { page: { eq: "about" }}) {
      frontmatter {
        title
        content
      }
      fields {
        heroRelImg {
          childImageSharp {
            sizes(maxWidth: 2000) {
              ...GatsbyImageSharpSizes
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
