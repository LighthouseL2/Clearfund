import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';

export async function PATCH(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();

        await dbConnect();

        const project = await Project.findByIdAndUpdate(id, body, { new: true });

        if (!project) {
            return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: project });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
