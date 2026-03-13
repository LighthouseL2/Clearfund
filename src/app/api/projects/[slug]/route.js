import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request, { params }) {
    try {
        const { slug } = params;

        const project = await prisma.project.findUnique({
            where: { slug },
        });

        if (!project) {
            return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
        }

        // Fetch tip stats for this project
        const tipStats = await prisma.tip.aggregate({
            where: { projectId: project.id },
            _sum: { amount: true },
            _count: { _all: true }
        });

        const data = {
            ...project,
            _id: project.id,
            totalTipped: tipStats._sum.amount || 0,
            tipCount: tipStats._count._all || 0,
        };

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
