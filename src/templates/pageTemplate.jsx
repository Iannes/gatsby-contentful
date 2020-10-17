import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Img from "gatsby-image";

const PageTemplate = ({ data }) => {
  console.log(data, "hello");
  return (
    <Layout>
      <h1>{data.contentfulPage.name}</h1>
      <img
        srcSet={data.contentfulPage.heroImage.srcset}
        src={data.contentfulPage.heroImage.file.url}
        sizes={data.contentfulPage.heroImage.sizes}
        alt=""
      />
    </Layout>
  );
};

export default PageTemplate;

export const pageQuery = graphql`
  query PageById($id: String!) {
    contentfulPage(id: { eq: $id }) {
      id
      name
      pageGroup
      slug
      heroTitle
      heroDescription
      heroImage {
        fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
          ...GatsbyContentfulFluid_tracedSVG
        }
        file {
          url
        }
      }
    }
  }
`;
