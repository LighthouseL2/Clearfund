const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const p = await prisma.project.findFirst({ where: { slug: 'learn-for-impact' } });
    console.log(JSON.stringify(p, null, 2));
}
main();
