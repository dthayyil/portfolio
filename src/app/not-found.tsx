import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page grid min-h-screen place-items-center py-32 text-center">
      <div>
        <p className="text-display-lg text-gradient">404</p>
        <h1 className="mt-4 text-headline">Page not found</h1>
        <p className="mt-3 text-fg-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
