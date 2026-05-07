import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import {
  getArticleBySlugAsync,
  getAllArticleSlugsAsync,
  getRelatedArticlesAsync,
  getAuthorBySlugAsync,
} from "@/lib/cms";
import Navbar from "@/components/navbar";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import Breadcrumb, { buildBreadcrumbSchema } from "@/components/breadcrumb";
import ArticleCard from "@/components/article-card";
import JsonLd from "@/components/json-ld";
import FadeIn from "@/components/ui/fade-in";
import { StripedPattern } from "@/components/ui/striped-pattern";
import { DotPattern } from "@/components/ui/dot-pattern";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { formatPLDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;  // refresh CMS data on demand within 60s for live preview

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugsAsync();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlugAsync(slug);
  if (!article) return {};
  return {
    title: `${article.title} | PBAC`,
    description: article.metaDescription,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: "article",
      publishedTime: article.date,
      siteName: "PBAC",
      images: article.coverImage ? [{ url: article.coverImage, width: 800, height: 500 }] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlugAsync(slug);
  if (!article) notFound();

  const author = await getAuthorBySlugAsync(article.authorSlug);
  const related = await getRelatedArticlesAsync(article.relatedSlugs);

  const breadcrumbItems = [
    { name: "Strona główna", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: article.title },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://pbac.pl/blog/${article.slug}`,
    headline: article.title,
    description: article.metaDescription,
    image: article.coverImage ? { "@type": "ImageObject", url: article.coverImage, width: 800, height: 500 } : undefined,
    datePublished: article.date,
    dateModified: article.date,
    author: author
      ? { "@type": "Person", name: author.name, jobTitle: author.role, description: author.description }
      : { "@type": "Organization", "@id": "https://pbac.pl/#organization", name: "PBAC" },
    publisher: {
      "@type": "Organization",
      "@id": "https://pbac.pl/#organization",
      name: "PBAC",
      logo: { "@type": "ImageObject", url: "https://pbac.pl/images/pbac-logo.png", width: 184, height: 150 },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://pbac.pl/blog/${article.slug}` },
    url: `https://pbac.pl/blog/${article.slug}`,
    inLanguage: "pl-PL",
    articleSection: article.category,
    wordCount: article.sections.reduce((acc, s) => acc + s.content.split(/\s+/).length, 0),
    timeRequired: `PT${article.readingTime}M`,
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <JsonLd data={[articleSchema, buildBreadcrumbSchema(breadcrumbItems)]} />
      <Navbar />

      {/* ═══ COVER IMAGE HERO ═══ */}
      {article.coverImage && (
        <section className="relative min-h-[50vh] flex items-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={article.coverImage}
              alt={article.coverAlt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16 pt-32 w-full">
            <Breadcrumb items={breadcrumbItems} />
            <FadeIn>
              <div className="mt-6 mb-4 flex items-center gap-3 text-sm text-white/60">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur-sm">{article.category}</span>
                <time dateTime={article.date}>
                  {formatPLDate(article.date)}
                </time>
                <span>·</span>
                <span>{article.readingTime} min czytania</span>
              </div>
              <h1 className="font-montserrat text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                {article.title}
              </h1>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ═══ FALLBACK HEADER (no cover image) ═══ */}
      {!article.coverImage && (
        <section className="pt-28 pb-8 px-4">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb items={breadcrumbItems} />
            <FadeIn>
              <div className="mt-6 mb-4 flex items-center gap-3 text-sm text-white/50">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs">{article.category}</span>
                <time dateTime={article.date}>
                  {formatPLDate(article.date)}
                </time>
                <span>·</span>
                <span>{article.readingTime} min czytania</span>
              </div>
              <h1 className="font-montserrat text-3xl md:text-4xl font-bold leading-tight">
                {article.title}
              </h1>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ═══ ARTICLE CONTENT ═══ */}
      <article className="relative py-16 px-4 overflow-hidden">
        <StripedPattern
          width={12}
          height={12}
          className="absolute inset-x-0 top-0 h-[60%] z-0 text-white/25 [mask-image:radial-gradient(600px_circle_at_50%_30%,white,transparent)]"
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Article content — all content is from our own lib/articles.ts, not user input */}
          <FadeIn>
            <div className="space-y-8">
              {article.sections.map((section, idx) => (
                <div key={idx}>
                  <h2 className="font-montserrat text-2xl font-bold mb-4">{section.heading}</h2>
                  <div className="text-white/70 leading-relaxed space-y-4">
                    {section.content.split("\n\n").map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Author */}
          {author && (
            <FadeIn delay={0.2}>
              <div className="mt-12 flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5">
                <Image
                  src={author.image}
                  alt={author.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <div className="font-montserrat font-bold text-sm">{author.name}</div>
                  <div className="text-xs text-white/50">{author.role}</div>
                </div>
              </div>
            </FadeIn>
          )}

          {/* Internal links */}
          <FadeIn delay={0.3}>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/produkty" className="group flex items-center gap-4 rounded-xl border border-white/10 p-5 hover:bg-white/5 transition-colors">
                <div className="flex-1">
                  <div className="font-montserrat font-bold text-sm mb-1">Zobacz nasze klimatyzatory</div>
                  <div className="text-xs text-white/40">Katalog produktów z cenami</div>
                </div>
                <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
              </Link>
              <Link href="/kontakt" className="group flex items-center gap-4 rounded-xl border border-white/10 p-5 hover:bg-white/5 transition-colors">
                <div className="flex-1">
                  <div className="font-montserrat font-bold text-sm mb-1">Bezpłatna wycena</div>
                  <div className="text-xs text-white/40">Skontaktuj się z nami</div>
                </div>
                <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
              </Link>
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn delay={0.4}>
            <div className="mt-16 gradient-primary rounded-2xl p-8 md:p-10 text-center">
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">Potrzebujesz klimatyzacji?</h2>
              <p className="text-white/80 mb-6">Skontaktuj się z nami — bezpłatna wycena w 24h</p>
              <a
                href="/#wycena"
                className="inline-flex items-center justify-center bg-white text-black rounded-full px-8 py-3 font-bold text-sm hover:bg-white/90 transition-colors"
              >
                Bezpłatna wycena
              </a>
            </div>
          </FadeIn>
        </div>
      </article>

      {/* ═══ RELATED ARTICLES ═══ */}
      {related.length > 0 && (
        <section className="relative py-20 px-4 overflow-hidden">
          <DotPattern
            width={20}
            height={20}
            cr={1}
            className="absolute inset-x-0 top-0 h-[60%] fill-white/5 [mask-image:radial-gradient(700px,#ffffff45,#00000000)]"
          />
          <div className="relative z-10 max-w-7xl mx-auto">
            <FadeIn>
              <h2 className="font-montserrat text-2xl sm:text-3xl font-bold mb-8">Powiązane artykuły</h2>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.slice(0, 3).map((a, idx) => (
                <FadeIn key={a.slug} delay={idx * 0.1}>
                  <ArticleCard article={a} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactSection />
      <Footer />
    </main>
  );
}