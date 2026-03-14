const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const projects = await prisma.project.findMany({
            where: {
                OR: [
                    { name: { contains: 'Green Pill Nigeria', mode: 'insensitive' } },
                    { name: { contains: 'Learn for Impact', mode: 'insensitive' } }
                ]
            }
        });
        console.log(JSON.stringify(projects, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        prisma.$disconnect();
    }
}
main();
