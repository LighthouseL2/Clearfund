const fetch = require('node-fetch');

async function main() {
    try {
        const payload = {
            name: "Test API Project",
            description: "Testing API description",
            category: "CLIMATE",
            location: "Global",
            website: "https://example.com",
            twitter: "",
            github: "",
            karmaLink: "",
            milestones: "Milestone 1",
            impactDescription: "Impact text",
            logo: "https://ipfs.io/ipfs/QmZ8P8P1f8P1f8P1f8P1f8P1f8P1f8P1f8P1f8P1f8",
            banner: "https://ipfs.io/ipfs/QmZ8P8P1f8P1f8P1f8P1f8P1f8P1f8P1f8P1f8P1f8",
            walletAddress: "0x1234567890123456789012345678901234567890",
            status: 'PENDING'
        };

        console.log("Sending POST to localhost:3000/api/projects...");
        const res = await fetch('http://localhost:3000/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        console.log("Response:", data);
    } catch (e) {
        console.error("Fetch failed:", e);
    }
}
main();
