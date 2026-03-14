const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const p = await prisma.project.findUnique({
        where: { slug: 'silvi-kakamega-forest' }
    });
    console.log('Project:', JSON.stringify(p, null, 2));

    const tipCount = await prisma.tip.count({
        where: { projectId: p.id }
    });
    console.log('Actual Tip Count from Tip table:', tipCount);

    // Check if there are tips with projectId matching the curated ID instead of DB ID
    const ghostTipCount = await prisma.tip.count({
        where: { projectId: 'gc2' } // silvi curated ID
    });
    console.log('Ghost Tip Count (gc2):', ghostTipCount);
}
main();
