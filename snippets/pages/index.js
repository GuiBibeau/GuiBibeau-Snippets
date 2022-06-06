import Link from "next/link";

export default function () {
  return (
    <ul>
      <li>
        <Link href="/mexican-suspense">Suspend with SWR</Link>
      </li>
      <li>
        <Link href="/swr-ssr-no-undefined">
          Avoid SWR undefined on first render
        </Link>
      </li>
    </ul>
  );
}
