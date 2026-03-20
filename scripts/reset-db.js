const { PrismaClient } = require('@prisma/client');

async function resetDatabase() {
    const prisma = new PrismaClient();

    try {
        // Delete all tips
        const deletedTips = await prisma.tip.deleteMany({});
        console.log('Tips deleted:', deletedTips.count);

        // Reset all project totals to zero
        const updatedProjects = await prisma.project.updateMany({
            data: { totalRaised: 0, tipCount: 0 }
        });
        console.log('Projects reset:', updatedProjects.count);

        console.log('Database is now clean!');
    } catch (e) {
        console.error('Error:', e.message);
    } finally {
        await prisma.$disconnect();
    }
}

resetDatabase();
