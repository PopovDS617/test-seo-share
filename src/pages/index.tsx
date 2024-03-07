import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen">
      <main className="flex h-full flex-col items-center justify-center gap-6">
        <h1 className="font-mono text-9xl">Hello there</h1>
        <Link
          href="/test/derevo"
          className="color rounded-md bg-emerald-500 p-2 font-mono text-2xl"
        >
          тест
        </Link>
      </main>
    </div>
  );
}
