const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const counts = await prisma.project.groupBy({
        by: ['status'],
        _count: { _all: true }
    });
    console.log(counts);
}
main();
