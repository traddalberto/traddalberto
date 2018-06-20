import React from 'react';
import Footer from '../components/Footer';
import Link from 'gatsby-link';

const NotFoundPage = ({ data }) => (
  <section className="not-found-page center-content">
    <article>
      <h1>Erro 404</h1>
      <p>Você digitou um endereço que não existe.<br />Tente usar algum dos links abaixo.</p>
      <nav>
        <Link to="/galeria">Galeria</Link>
        <Link to="/projetos">Projetos</Link>
        <Link to="/sobre">Sobre</Link>
        <Link to="/contato">Contato</Link>
      </nav>
    </article>

    <Footer
      phone={data.footer.frontmatter.phone}
      email={data.footer.frontmatter.email}
      facebookLink={data.footer.frontmatter.facebookLink}
      instagramLink={data.footer.frontmatter.instagramLink}
    />
  </section>
);

export default NotFoundPage;

export const query = graphql`
  query NotFoundPageQuery {
    footer: markdownRemark(frontmatter: { page: { eq: "contact" } }) {
      frontmatter {
        instagramLink
        facebookLink
        phone
        email
      }
    }
  }
`;
