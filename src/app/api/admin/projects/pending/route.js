import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET /api/admin/projects/pending - List pending projects
export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            where: { status: 'PENDING' },
            orderBy: { createdAt: 'desc' },
        });

        const data = projects.map(p => ({ ...p, _id: p.id }));

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
