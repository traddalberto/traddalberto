import React from 'react';
import Img from 'gatsby-image';

import Footer from '../components/Footer';
import Icon from '../components/Icon';
import ContactForm from '../components/ContactForm';

const SocialLinkButton = ({ href, icon }) => (
  <a className="center-content" target="_blank" rel="noopener noreferrer" href={href}><Icon name={icon} /></a>
);

const Contact = ({ data: { markdownRemark: data } }) => (
  <section className="contact">
    <header>
      <Img sizes={data.fields.heroRelImg.childImageSharp.sizes} />
      <div className="color-overlay fill-container" />
      <h1>ENTRE EM CONTATO</h1>
    </header>
    <article>
      <div className="contact-info">
        <div className="phone">{data.frontmatter.phone}</div>
        <a className="email" href={`mailto:${data.frontmatter.email}`}>{data.frontmatter.email}</a>
        <div className="address">{data.frontmatter.address.replace('<br>', '\n')}</div>
      </div>
      <ContactForm />
      <div className="horizontal-divider" />
      <div className="social-links center-content">
        {data.frontmatter.instagramLink &&
          <SocialLinkButton href={data.frontmatter.instagramLink} icon="instagram" />
        }
        {data.frontmatter.facebookLink &&
          <SocialLinkButton href={data.frontmatter.facebookLink} icon="facebook" />
        }
        {data.frontmatter.email &&
          <SocialLinkButton href={`mailto:${data.frontmatter.email}`} icon="email" />
        }
        {data.frontmatter.whatsapp &&
          <SocialLinkButton href={`https://api.whatsapp.com/send?phone=${data.frontmatter.whatsapp}`} icon="whatsapp" />
        }
      </div>
    </article>
    <Footer phone={data.frontmatter.phone} email={data.frontmatter.email} facebookLink={data.frontmatter.facebookLink} instagramLink={data.frontmatter.instagramLink} />
  </section>
);

export default Contact;

export const query = graphql`
  query ContactQuery {
    markdownRemark(frontmatter: { page: { eq: "contact" }}) {
      frontmatter {
        phone
        email
        address
        instagramLink
        facebookLink
        whatsapp
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
  }
`;
