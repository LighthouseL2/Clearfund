const fetch = require('node-fetch');

const GIVETH_GRAPHQL = 'https://mainnet.serve.giveth.io/graphql';

const query = `
  query GetProjectBySlug($slug: String!) {
    projectBySlug(slug: $slug) {
      id
      title
      slug
      image
    }
  }
`;

async function main() {
    const resp = await fetch(GIVETH_GRAPHQL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query,
            variables: { slug: "learn-for-impact" }
        })
    });
    const data = await resp.json();
    console.log(JSON.stringify(data, null, 2));
}

main();
