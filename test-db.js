const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    try {
        const projectsCount = await prisma.project.count();
        console.log(`Database connection successful. Projects count: ${projectsCount}`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
