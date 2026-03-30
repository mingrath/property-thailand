"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-heading font-bold text-brand-dark mb-4">
          Something went wrong
        </h2>
        <p className="text-brand-slate mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-brand-accent hover:bg-teal-700 text-white rounded-xl transition-colors font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
