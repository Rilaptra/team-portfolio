// components/TreeItem.tsx
import { NavItem } from "@/lib/types";
import Link from "next/link";

type TreeItemProps = {
  item: NavItem;
  isLast: boolean;
  prefix?: string;
};

export default function TreeItem({ item, isLast, prefix = "" }: TreeItemProps) {
  const currentPrefix = "╰──•";
  const childPrefix = "   ";

  return (
    <div>
      <div className="flex items-center">
        <span className="mr-2 font-mono whitespace-pre text-gray-500">
          {prefix}
          {currentPrefix}
        </span>
        <Link
          href={item.href}
          className="transition-colors hover:text-cyan-400"
        >
          {item.title}
        </Link>
      </div>

      {item.children && (
        <div className="">
          {item.children.map((child, index) => (
            <TreeItem
              key={child.id}
              item={child}
              isLast={index === item.children!.length - 1}
              prefix={prefix + childPrefix}
            />
          ))}
        </div>
      )}
    </div>
  );
}
