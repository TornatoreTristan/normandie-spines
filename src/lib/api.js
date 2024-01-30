export async function navQuery() {
  const siteNavQueryRes = await fetch(import.meta.env.WORDPRESS_API_URL, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
                menus(where: {location: PRIMARY}) {
                  nodes {
                    name
                    menuItems {
                        nodes {
                            id
                            databaseId
                            uri
                            url
                            order
                            label
                            parentDatabaseId
                            childItems {
                                nodes {
                                    id
                                    uri
                                    url
                                    order
                                    label
                                }
                            }
                        }
                    }
                  }
                }
                generalSettings {
                    title
                    url
                    description
                }
            }
            `,
    }),
  });
  const { data } = await siteNavQueryRes.json();
  return data;
}

export async function homePagePostsQuery() {
  const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
                posts {
                  nodes {
                    date
                    uri
                    title
                    commentCount
                    excerpt
                    tags {
                      nodes {
                        name
                      }
                    }
                    categories {
                      nodes {
                        name
                        uri
                      }
                    }
                    featuredImage {
                      node {
                        srcSet
                        sourceUrl
                        altText
                        mediaDetails {
                          height
                          width
                        }
                      }
                    }
                  }
                }
              }
            `,
    }),
  });
  const { data } = await response.json();
  return data;
}

export async function getNodeByURI(uri) {
  const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query GetNodeByURI($uri: String!) {
                nodeByUri(uri: $uri) {
                  __typename
                  isContentNode
                  isTermNode
                  ... on Post {
                    id
                    title
                    date
                    uri
                    excerpt
                    content
                    tags {
                      nodes {
                        name
                      }
                    }
                    categories {
                      nodes {
                        name
                        uri
                      }
                    }
                    featuredImage {
                      node {
                        srcSet
                        sourceUrl
                        altText
                        mediaDetails {
                          height
                          width
                        }
                      }
                    }
                    author {
                      node {
                        id
                        description
                        avatar {
                          url
                        }
                        name
                        lastName
                        nickname
                      }
                    }
                  }
                  ... on Page {
                    id
                    title
                    uri
                    date
                    content
                    pageOption {
                      tags_posts
                    }
                    template {
                      templateName
                    }
                  }
                  ... on Category {
                    id
                    name
                    posts {
                      nodes {
                        date
                        title
                        excerpt
                        uri
                        tags {
                          nodes {
                            name
                          }
                        }
                        categories {
                          nodes {
                            name
                            uri
                          }
                        }
                        featuredImage {
                          node {
                            srcSet
                            sourceUrl
                            altText
                            mediaDetails {
                              height
                              width
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            `,
      variables: {
        uri: uri,
      },
    }),
  });
  const { data } = await response.json();
  return data;
}

export async function getSiteLogo() {
  const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query Logo {
          generalSettings {
            customLogoUrl
          }
        }
      `,
    }),
  });

  const data = await response.json();
  return data;
}

export async function getAllUris() {
  const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query GetAllUris {
            terms {
              nodes {
                uri
              }
            }
            posts(first: 100) {
              nodes {
                uri
              }
            }
            pages(first: 100) {
              nodes {
                uri
              }
            }
          }
          `,
    }),
  });
  const { data } = await response.json();
  const uris = Object.values(data)
    .reduce(function (acc, currentValue) {
      return acc.concat(currentValue.nodes);
    }, [])
    .filter((node) => node.uri !== null)
    .map((node) => {
      let trimmedURI = node.uri.substring(1);
      trimmedURI = trimmedURI.substring(0, trimmedURI.length - 1);
      return {
        params: {
          uri: trimmedURI,
        },
      };
    });

  return uris;
}

export async function getPostsByCategoryNames(categoryNames) {
  const categoryNamesString = categoryNames.join(", ");

  const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query GetPostsByCategories($names: String) {
          posts(where: {categoryName: $names}) {
            nodes {
              date
              uri
              title
              commentCount
              excerpt
              tags {
                nodes {
                  name
                }
              }
              categories {
                nodes {
                  name
                  uri
                }
              }
              author {
                node {
                  id
                  description
                  avatar {
                    url
                  }
                  name
                }
              }
              featuredImage {
                node {
                  srcSet
                  sourceUrl
                  altText
                  mediaDetails {
                    height
                    width
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        names: categoryNamesString,
      },
    }),
  });

  const data = await response.json();
  return data;
}
