const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const data = {
            name: "Test API Project",
            slug: "test-api-" + Date.now(),
            description: "Testing",
            category: "CLIMATE",
            location: "Global",
            website: "https://example.com",
            twitter: "",
            github: "",
            karmaLink: "",
            milestones: "Milestone",
            impactDescription: "Impact text",
            logo: "url",
            banner: "url",
            images: [],
            fundingGoal: null,
            walletAddress: "0x123",
            status: 'PENDING',
            featured: false,
            totalRaised: 0,
            tipCount: 0,
            submittedBy: "0xabc"
        };

        const project = await prisma.project.create({ data });
        console.log("Success:", project);
    } catch (e) {
        console.error("Prisma error:", e);
    } finally {
        prisma.$disconnect();
    }
}
main();
