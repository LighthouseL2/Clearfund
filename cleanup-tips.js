const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const projects = await prisma.project.findMany({ select: { id: true } });
        const projectIds = new Set(projects.map(p => p.id));

        // Also include curated IDs from curatedProjects.js
        const curatedIds = ["gc1", "gc2", "gc3", "gc4", "gc5", "g2"];
        curatedIds.forEach(id => projectIds.add(id));

        const tips = await prisma.tip.findMany();
        const tipsToDelete = tips.filter(t => !projectIds.has(t.projectId));

        console.log(`Deleting ${tipsToDelete.length} ghost tips...`);
        for (const t of tipsToDelete) {
            await prisma.tip.delete({ where: { id: t.id } });
            console.log(`- Deleted tip ${t.id} (Project ID: ${t.projectId})`);
        }
        console.log('Cleanup finished.');
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}
main();
