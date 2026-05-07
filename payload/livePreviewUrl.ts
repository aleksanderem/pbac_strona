// Helpers building public URLs for Payload Live Preview iframes.
// Each collection passes a small builder so it can know its own type.

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.PAYLOAD_PUBLIC_SERVER_URL ||
  "https://pbac.pl";

type LivePreviewArgs = {
  data: Record<string, unknown>;
};

const slugOf = (data: Record<string, unknown>): string => {
  const s = data?.slug;
  return typeof s === "string" ? s : "";
};

export const articleUrl = ({ data }: LivePreviewArgs): string =>
  `${SERVER_URL}/blog/${slugOf(data)}?preview=1`;

export const productUrl = ({ data }: LivePreviewArgs): string => {
  const brandRaw = data?.brand;
  const brandSlug =
    typeof brandRaw === "object" && brandRaw && "slug" in brandRaw
      ? String((brandRaw as { slug?: string }).slug ?? "")
      : typeof data?.brandSlug === "string"
        ? data.brandSlug
        : "";
  return `${SERVER_URL}/produkty/${brandSlug}/${slugOf(data)}?preview=1`;
};

export const brandUrl = ({ data }: LivePreviewArgs): string =>
  `${SERVER_URL}/produkty/${slugOf(data)}?preview=1`;

export const locationUrl = ({ data }: LivePreviewArgs): string => {
  const services = Array.isArray(data?.services) ? (data.services as string[]) : [];
  const seg = services.includes("montaz")
    ? "montaz"
    : services.includes("serwis")
      ? "serwis"
      : "montaz";
  return `${SERVER_URL}/${seg}/${slugOf(data)}?preview=1`;
};

export const serviceUrl = ({ data }: LivePreviewArgs): string =>
  `${SERVER_URL}/${slugOf(data)}?preview=1`;

export const homeUrl = (): string => `${SERVER_URL}/?preview=1`;
