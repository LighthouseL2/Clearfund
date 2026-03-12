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

        const data = {
            ...project,
            _id: project.id,
            totalTipped: project.totalRaised || 0,
            tipCount: project.tipCount || 0,
        };

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
