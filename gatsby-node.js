const Promise = require("bluebird");
const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve("./src/templates/blog-post.js");
    const productTemplate = path.resolve("./src/templates/product.js");

    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

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

        // const products = result.data.allContentfulBlogPost.edges;
        // products.forEach((post) => {
        //   createPage({
        //     path: `/products/${post.node.slug}/`,
        //     component: productTemplate,
        //     context: {
        //       slug: product.node.slug,
        //     },
        //   });
        // });
      })
    );
  });
};
