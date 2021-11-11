import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import Layout from '../components/layout';

const PostTemplate = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const image = getImage(frontmatter.thumbnail);
  return (
    <Layout>
      <section>
      <GatsbyImage image={image} alt={frontmatter.title} />
        <div>
          <h1>{frontmatter.title}</h1>
          <span>{frontmatter.date}</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    </Layout>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        thumbnail {
            childImageSharp {
              gatsbyImageData(
                width: 400
                placeholder: BLURRED
                transformOptions: {cropFocus: CENTER}
              )
            }
        }
      }
    }
  }
`;