import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full bg-white">
      <nav className="max-w-[1200px] mx-auto py-4">
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/kitties">Kitties</Link>
          </li>
          <li>
            <Link href="/puppies">Puppies</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
