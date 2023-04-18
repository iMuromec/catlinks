import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full pb-5 pt-10 flex-col place-self-end flex justify-center items-center gap-1 text-sm text-gray-400">
      <Link href="/">Котолинкус — Всё в одной ссылке</Link>
      <p>
        Исходный код на{" "}
        <a
          href="https://github.com/iMuromec/catlinks"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          GitHub
        </a>
        .
      </p>
    </div>
  );
}
