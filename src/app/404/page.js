'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-green-700 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl max-w-md w-full text-center shadow-lg ">
        <Image
          src="/404-illustration.svg" // replace with your image path (SVG or PNG)
          alt="404 error illustration"
          width={300}
          height={300}
          className="mx-auto mb-6"
        />
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          Looks like you’ve got lost….
        </h1>
        <Link
          href="/"
          className="inline-block w-full py-3 bg-green-700 text-white font-medium rounded hover:bg-green-800 transition"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
