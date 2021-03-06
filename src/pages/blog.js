import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const BlogPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <div className="post-list">
        {posts.map(post => (
          <div key={post.node.id} className="post-list__item">
          <div className="post-list__thumbnail">
              <Link to={post.node.fields.slug}>
              <GatsbyImage image={getImage(post.node.frontmatter.thumbnail)} alt={post.node.frontmatter.title} />
              </Link>
            </div>
            <div className="post-list__content">
            <h2>{post.node.frontmatter.title}</h2>
            <p>{post.node.frontmatter.date}</p>
            <div className="post-list__excerpt">
              <p>{post.node.excerpt}</p>
            </div>
            <Link to={post.node.fields.slug}>Read More</Link>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default BlogPage;

// Get all markdown data, in descending order by date, and grab the id, excerpt, slug, date, and title
export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
        edges {
          node {
            id
            excerpt(pruneLength: 250)
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              thumbnail {
                childImageSharp {
                  gatsbyImageData(
                    width: 200
                    placeholder: BLURRED
                    transformOptions: {cropFocus: CENTER}
                    aspectRatio: 1
                  )
                }
              }
            }
          }
        }
      }
  }
`;