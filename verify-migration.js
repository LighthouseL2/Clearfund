const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const projects = await prisma.project.findMany({
            select: { name: true, slug: true, status: true }
        });
        console.log('Project Count:', projects.length);
        projects.forEach(p => console.log(`- ${p.name} (${p.slug}) [${p.status}]`));
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}
main();
