export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F6F4]">
      <div className="text-center">
        <p className="text-5xl font-semibold text-[#263746]">404</p>
        <p className="mt-3 text-sm text-[#64748B]">Page not found</p>
        <a
          href="/"
          className="mt-6 inline-block rounded-md border border-[#DCE1E5] bg-white px-4 py-2 text-sm font-medium text-[#263746] transition-colors hover:bg-[#F5F6F4]"
        >
          Go home
        </a>
      </div>
    </main>
  );
}
