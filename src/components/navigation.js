import * as React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import styles from "./navigation.module.css";

export default ({ data }) => {
  console.log(data, "nav");
  return (
    <StaticQuery
      query={graphql`
        query {
          menu: allContentfulPage(filter: { topLevel: { eq: true } }) {
            nodes {
              pageGroup
              slug
              topLevel
              name
            }
          }
        }
      `}
      render={({ menu }) => {
        return (
          <nav role="navigation">
            <ul className={styles.navigation}>
              <li className={styles.navigationItem}>
                <Link to="/">Home</Link>
              </li>
              {menu.nodes.map((menuItem) => (
                <li key={menuItem.slug} className={styles.navigationItem}>
                  <Link to={`/${menuItem.slug}`}>{menuItem.name}</Link>
                </li>
              ))}
              <li className={styles.navigationItem}>
                <Link to="/blog/">Blog</Link>
              </li>
              <li className={styles.navigationItem}>
                <Link to="/products/">Products</Link>
              </li>
            </ul>
          </nav>
        );
      }}
    />
  );
};
