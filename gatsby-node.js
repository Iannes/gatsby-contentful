const Promise = require("bluebird");
const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve("./src/templates/blog-post.js");
    const productTemplate = path.resolve("./src/templates/product.jsx");
    const pageTemplate = path.resolve("./src/templates/pageTemplate.jsx");

    resolve(
      graphql(
        `
          {
            allContentfulPage {
              nodes {
                heroDescription
                heroTitle
                id
                slug
                name
                topLevel
                pageGroup
                heroImage {
                  file {
                    url
                  }
                }
              }
            }
            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                }
              }
            }
            allContentfulProduct {
              nodes {
                slug
                title
                id
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const pages = result.data.allContentfulPage.nodes;
        pages.forEach((page) => {
          createPage({
            path: `/${page.slug}/`,
            component: pageTemplate,
            context: {
              id: page.id,
            },
          });
        });

        const posts = result.data.allContentfulBlogPost.edges;
        posts.forEach((post) => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug,
            },
          });
        });

        const products = result.data.allContentfulProduct.nodes;
        products.forEach((product) => {
          console.log(product);
          createPage({
            path: `/products/${product.slug}/`,
            component: productTemplate,
            context: {
              id: product.id,
            },
          });
        });
      })
    );
  });
};
