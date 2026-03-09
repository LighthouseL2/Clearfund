import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';

// GET /api/admin/projects/pending - List pending projects
export async function GET() {
    try {
        await dbConnect();
        const projects = await Project.find({ status: 'PENDING' }).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: projects });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
