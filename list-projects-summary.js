const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const projects = await prisma.project.findMany();
        console.log('--- ALL PROJECTS IN DB ---');
        projects.forEach(p => {
            console.log(`ID: ${p.id}`);
            console.log(`Name: ${p.name}`);
            console.log(`Slug: ${p.slug}`);
            console.log(`Description: ${p.description?.substring(0, 50)}...`);
            console.log(`Logo: ${p.logo}`);
            console.log(`Banner: ${p.banner}`);
            console.log('---');
        });
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}
main();
