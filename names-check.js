const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const projects = await prisma.project.findMany();
    const names = projects.map(p => p.name).join(', ');
    console.log('NAMES:', names);
}
main();
