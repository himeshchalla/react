import Link from 'gatsby-link';
import MarkdownHeader from '../../components/MarkdownHeader';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './all.module.scss';
import dateToString from '../../utils/dateToString';
import toCommaSeparatedList from '../../utils/toCommaSeparatedList';

// This page has no floating side-menu
const emptyArray = [];

const AllBlogPosts = ({data}) => (
  <div className={styles.Page}>
    <div className={styles.Wrapper}>
      <MarkdownHeader title="All Posts" />
      <ul>
        {data.allMarkdownRemark.edges.map(({node}) => (
          <li className={styles.ListItem} key={node.fields.slug}>
            <Link
              className={styles.Link}
              key={node.fields.slug}
              to={node.fields.slug}>
              {node.frontmatter.title}
            </Link>
            {' '}
            on
            {' '}
            {dateToString(new Date(node.fields.date))}
            {' '}
            by
            {' '}
            {toCommaSeparatedList(node.frontmatter.author, author => (
              <span key={author.frontmatter.name}>
                {author.frontmatter.name}
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query AllBlogPostsPageQuery {
    allMarkdownRemark(
      filter: { id: { regex: "/_posts/" } }
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            author {
              frontmatter {
                name
                url
              }
            }
          }
          fields {
            date
            slug
          }
        }
      }
    }
  }
`;

export default AllBlogPosts;