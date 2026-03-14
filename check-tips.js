const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const tips = await prisma.tip.findMany();
    const projects = await prisma.project.findMany();
    const projectIds = new Set(projects.map(p => p.id));

    const ghostTips = tips.filter(t => !projectIds.has(t.projectId));
    console.log(`Found ${ghostTips.length} ghost tips.`);
    for (const t of ghostTips) {
        console.log(`Tip ${t.id} for project ID ${t.projectId}`);
    }
}
main();
