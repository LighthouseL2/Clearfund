const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const projects = await prisma.project.findMany();
        console.log(projects.map(p => ({ id: p.id, name: p.name })));
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}
main();
