const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const projects = await prisma.project.findMany();
    for (const p of projects) {
        console.log(`NAME: ${p.name} | SLUG: ${p.slug}`);
    }
}
main();
