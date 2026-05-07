import Link from "next/link";
import FadeIn from "@/components/ui/fade-in";
import { DotPattern } from "@/components/ui/dot-pattern";
import ProductCard from "@/components/product-card";
import { getFeaturedProductsAsync } from "@/lib/cms";

export default async function FeaturedProductsSection() {
  const featured = await getFeaturedProductsAsync();
  if (featured.length === 0) return null;

  return (
    <section id="produkty" className="relative py-20 px-4 overflow-hidden">
      <DotPattern
        width={20}
        height={20}
        cr={1}
        className="absolute inset-x-0 top-0 h-[60%] fill-white/5 [mask-image:radial-gradient(700px,#ffffff45,#00000000)]"
      />
      <div className="relative z-10 max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-center mb-4">
            Polecane klimatyzatory
          </h2>
          <p className="text-center text-white/60 text-lg mb-16 max-w-2xl mx-auto">
            Najczęściej wybierane modele przez naszych klientów
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featured.map((product, idx) => (
            <FadeIn key={product.slug} delay={idx * 0.1}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="text-center">
            <Link
              href="/produkty"
              className="inline-flex items-center justify-center border border-white/20 text-white rounded-full uppercase text-sm tracking-wider px-8 py-4 font-bold transition-colors hover:bg-white/10"
            >
              Zobacz wszystkie produkty
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
