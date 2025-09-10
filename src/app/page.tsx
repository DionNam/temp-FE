"use client";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <button
        onClick={() => window.location.href = '/blog'}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-colors duration-200"
      >
        Go to Blog
            </button>
    </div>
  );
}