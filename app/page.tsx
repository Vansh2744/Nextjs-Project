import { redirect } from "next/navigation";

export default async function Home() {

  return (
    <div>
      <h1>Home</h1>
      <button className="bg-blue-500 py-2 px-4">dashboard</button>
    </div>
  );
}
