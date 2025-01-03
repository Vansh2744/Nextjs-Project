import Link from "next/link";

export default async function Home() {

  return (
    <div>
      <h1>Home</h1>
      <Link className="bg-blue-500 py-2 px-4" href="/dashboard">dashboard</Link>
    </div>
  );
}
