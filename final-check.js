const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const projects = await prisma.project.findMany();
    projects.forEach(p => {
        console.log(`- ${p.name} | ${p.slug}`);
    });
}
main();
