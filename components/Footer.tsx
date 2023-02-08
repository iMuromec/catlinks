import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full pb-5 pt-10 place-self-end flex justify-center">
      <Link href="/" className="text-gray-400">
        Cat links
      </Link>
    </div>
  );
}
