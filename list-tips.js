const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const tips = await prisma.tip.findMany();
    console.log('Total Tips:', tips.length);
    for (const t of tips) {
        console.log(`Tip for ProjectID: ${t.projectId}, Amount: ${t.amount}`);
    }
}
main();
