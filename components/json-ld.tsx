/**
 * Server Component that renders JSON-LD structured data.
 * Uses React 19 native script children support (no dangerouslySetInnerHTML).
 * Data is serialized via JSON.stringify from internal application data only.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script type="application/ld+json">{JSON.stringify(data)}</script>
  );
}
