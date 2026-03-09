'use client';

import React from 'react';
import ProjectForm from '@/components/ProjectForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const ProjectSubmitPage = () => {
    return (
        <div className="bg-gray-50 min-h-screen pt-20 pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 animate-in fade-in slide-in-from-left-5 duration-700">
                    <Link href="/projects" className="inline-flex items-center gap-2 text-gray-500 hover:text-gd-teal transition-colors font-bold group">
                        <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Projects
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black text-gd-dark-blue mt-6">
                        Submit Your Impact Project
                    </h1>
                    <p className="text-xl text-gray-600 mt-2 max-w-2xl font-medium">
                        Start your journey to getting funded. Fill out the form below to share your project with the community.
                    </p>
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
                    <ProjectForm />
                </div>
            </div>
        </div>
    );
};

export default ProjectSubmitPage;
