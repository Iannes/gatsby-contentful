import * as React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";

const ProductsIndex = (props) => {
  return (
    <Layout location={props.location}>
      <div style={{ background: "#fff" }}>
        <div className="wrapper">
          <h2 className="section-headline">Products</h2>
          <ul className="article-list">
            {props.data.products.nodes.map((product) => {
              return (
                <li key={product.slug}>
                  <Link to={`${product.slug}/`}>{product.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsIndex;

export const pageQuery = graphql`
  {
    products: allContentfulProduct {
      nodes {
        slug
        title
        childContentfulProductDescriptionRichTextNode {
          childContentfulRichText {
            html
          }
        }
      }
    }
  }
`;
