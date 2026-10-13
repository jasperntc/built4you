import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>This page doesn&apos;t exist.</h1>
      <p>
        <Link href="/">Back to Built4You</Link>
      </p>
    </main>
  );
}
