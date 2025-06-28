import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | 404 Not Found",
  description: "Page not found",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-4 py-12 text-center sm:px-6 lg:px-8">
      <h1 className="text-primary mb-4 text-6xl font-bold">404</h1>
      <h2 className="text-foreground mb-6 text-3xl font-semibold">
        Page Not Found
      </h2>
      <p className="text-muted-foreground mb-8 text-lg">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="text-primary-foreground bg-primary hover:bg-primary/90 focus:ring-primary inline-flex items-center rounded-md border border-transparent px-6 py-3 text-base font-medium shadow-sm transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none"
      >
        Go back home
      </Link>
    </div>
  );
}
