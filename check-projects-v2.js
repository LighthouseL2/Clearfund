const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const learn = await prisma.project.findMany({
            where: { name: { contains: 'Learn for Impact', mode: 'insensitive' } }
        });
        const green = await prisma.project.findMany({
            where: { name: { contains: 'Green pill nigeria', mode: 'insensitive' } }
        });

        console.log('LEARN_DATA:');
        console.log(JSON.stringify(learn, null, 2));
        console.log('GREEN_DATA:');
        console.log(JSON.stringify(green, null, 2));

    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}
main();
