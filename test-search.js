const fetch = require('node-fetch');

async function testSearch() {
    console.log("Testing search for 'Nigeria'...");
    const resp = await fetch('http://localhost:3000/api/giveth?category=ALL&search=Nigeria');
    const data = await resp.json();
    console.log(`Found ${data.data.length} projects.`);
    data.data.forEach(p => console.log(`- ${p.name}`));

    console.log("\nTesting search for 'Impact'...");
    const resp2 = await fetch('http://localhost:3000/api/giveth?category=ALL&search=Impact');
    const data2 = await resp2.json();
    console.log(`Found ${data2.data.length} projects.`);
    data2.data.forEach(p => console.log(`- ${p.name}`));
}

testSearch();
