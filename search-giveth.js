const fetch = require('node-fetch');

const GIVETH_GRAPHQL = 'https://mainnet.serve.giveth.io/graphql';

const query = `
  query GetProjects($limit: Int, $skip: Int, $searchTerm: String) {
    allProjects(limit: $limit, skip: $skip, searchTerm: $searchTerm) {
      projects {
        id
        title
        slug
        image
      }
    }
  }
`;

async function main() {
    const resp = await fetch(GIVETH_GRAPHQL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query,
            variables: { limit: 10, skip: 0, searchTerm: "Learn for Impact" }
        })
    });
    const data = await resp.json();
    console.log(JSON.stringify(data, null, 2));
}

main();
