import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

const ProductTemplate = ({ data }) => {
  console.log(data, "hello");
  return (
    <Layout>
      <h1>{data.contentfulProduct.title}</h1>
      <article
        dangerouslySetInnerHTML={{
          __html:
            data?.contentfulProduct
              ?.childContentfulProductDescriptionRichTextNode
              ?.childContentfulRichText?.html ?? `<p>No Description</p>`,
        }}
      />
    </Layout>
  );
};

export default ProductTemplate;

export const pageQuery = graphql`
  query ProductBySlug($id: String!) {
    contentfulProduct(id: { eq: $id }) {
      title
      slug
      childContentfulProductDescriptionRichTextNode {
        childContentfulRichText {
          html
        }
      }
    }
  }
`;
