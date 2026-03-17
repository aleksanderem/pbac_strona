import Link from "next/link";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Nawigacja okruszkowa" className="text-sm text-white/50">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href && i < items.length - 1 ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-white"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-white/70">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function buildBreadcrumbSchema(
  items: BreadcrumbItem[],
  baseUrl = "https://pbac.pl"
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items
      .filter((item) => item.href)
      .map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: `${baseUrl}${item.href}`,
      })),
  };
}
