// components/TreeItem.tsx
import { NavItem } from "@/lib/types";
import Link from "next/link";

type TreeItemProps = {
  item: NavItem;
  prefix?: string;
};

export default function TreeItem({ item, prefix = "" }: TreeItemProps) {
  const currentPrefix = "╰──";
  const childPrefix = "   ";

  return (
    <div>
      <div className="flex items-center">
        <span className="mr-2 font-mono whitespace-pre text-neutral-500">
          {prefix}
          {currentPrefix}
        </span>
        <Link
          href={item.href}
          className="dark:text-offwhite text-onyx transition-colors hover:underline"
        >
          {item.title}
        </Link>
      </div>

      {item.children && (
        <div className="">
          {item.children.map((child, index) => (
            <TreeItem key={index} item={child} prefix={prefix + childPrefix} />
          ))}
        </div>
      )}
    </div>
  );
}
