const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const projects = await prisma.project.findMany();
    console.log('--- ALL PROJECTS ---');
    for (const p of projects) {
        console.log(`[${p.id}] ${p.name} (${p.slug})`);
    }
}
main();
