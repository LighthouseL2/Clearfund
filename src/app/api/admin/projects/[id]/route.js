import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function PATCH(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();

        const project = await prisma.project.update({
            where: { id },
            data: body,
        });

        if (!project) {
            return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: { ...project, _id: project.id } });
    } catch (error) {
        if (error.code === 'P2025') {
            return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
        }
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
