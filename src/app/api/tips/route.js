import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { CURATED_REFI_PROJECTS } from '@/lib/curatedProjects';

export const dynamic = 'force-dynamic';

// Build a lookup map for curated projects
const curatedMap = {};
CURATED_REFI_PROJECTS.forEach(p => {
    curatedMap[p._id] = { name: p.name, slug: p.slug, logo: p.logo };
});

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const projectId = searchParams.get('projectId');
        const donorWallet = searchParams.get('donorWallet') || searchParams.get('tipperWallet');
        const limit = parseInt(searchParams.get('limit')) || 15;

        const where = {};
        if (projectId) where.projectId = projectId;
        if (donorWallet) where.donorWallet = donorWallet;

        const tips = await prisma.tip.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: limit,
            include: {
                project: {
                    select: { id: true, name: true, slug: true, logo: true },
                },
            },
        });

        // Enrich each tip with project metadata (DB project or curated fallback)
        const enrichedTips = tips.map(t => {
            const projectInfo = t.project
                ? { _id: t.project.id, name: t.project.name, slug: t.project.slug, logo: t.project.logo }
                : curatedMap[t.projectId]
                    ? { _id: t.projectId, ...curatedMap[t.projectId] }
                    : { _id: t.projectId, name: 'ReFi Project', slug: t.projectId, logo: '/donate-images/grass.jpg' };

            return {
                _id: t.id,
                projectId: projectInfo,
                donorWallet: t.donorWallet,
                amount: t.amount,
                txHash: t.txHash,
                network: t.network,
                anonymous: t.anonymous,
                createdAt: t.createdAt
            };
        });

        return NextResponse.json({ success: true, data: enrichedTips, count: enrichedTips.length });
    } catch (error) {
        console.error('Tips GET error:', error.message);
        return NextResponse.json({ success: true, data: [], count: 0 });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();

        const tip = await prisma.tip.create({
            data: {
                projectId: data.projectId,
                donorWallet: data.donorWallet,
                amount: data.amount,
                txHash: data.txHash,
                network: data.network || 'celo',
                anonymous: data.anonymous || false,
            },
        });

        // Update Project totals if the projectId matches a DB project
        try {
            await prisma.project.update({
                where: { id: data.projectId },
                data: {
                    totalRaised: { increment: data.amount },
                    tipCount: { increment: 1 },
                },
            });
        } catch (pError) {
            // Project might be a curated one (not in DB) — that's OK
            console.log('Project totals update skipped (likely curated project):', data.projectId);
        }

        return NextResponse.json({ success: true, data: tip });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
