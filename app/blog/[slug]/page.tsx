import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getArticleBySlug, getAllArticleSlugs, getRelatedArticles } from "@/lib/articles";
import { getAuthorBySlug } from "@/lib/authors";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumb, { buildBreadcrumbSchema } from "@/components/breadcrumb";
import ArticleCard from "@/components/article-card";
import JsonLd from "@/components/json-ld";
import FadeIn from "@/components/ui/fade-in";
import { StripedPattern } from "@/components/ui/striped-pattern";
import Image from "next/image";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
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
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const author = getAuthorBySlug(article.authorSlug);
  const related = getRelatedArticles(article.relatedSlugs);

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

      <article className="relative pt-28 pb-20 px-4 overflow-hidden">
        <StripedPattern className="absolute inset-0 z-0 fill-white/[0.015] [mask-image:radial-gradient(800px_circle_at_center,white,transparent)]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />

          <FadeIn>
            <div className="mt-6 mb-4 flex items-center gap-3 text-sm text-white/50">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs">{article.category}</span>
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })}
              </time>
              <span>·</span>
              <span>{article.readingTime} min czytania</span>
            </div>

            <h1 className="font-montserrat text-3xl md:text-4xl font-bold leading-tight mb-6">
              {article.title}
            </h1>
          </FadeIn>

          {article.coverImage && (
            <FadeIn delay={0.1}>
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-10">
                <Image
                  src={article.coverImage}
                  alt={article.coverAlt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </FadeIn>
          )}

          {/* Article content — all content is from our own lib/articles.ts, not user input */}
          <FadeIn delay={0.2}>
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
            <FadeIn delay={0.3}>
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

          {/* Related articles */}
          {related.length > 0 && (
            <div className="mt-16">
              <FadeIn>
                <h2 className="font-montserrat text-2xl font-bold mb-8">Powiązane artykuły</h2>
              </FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.slice(0, 3).map((a, idx) => (
                  <FadeIn key={a.slug} delay={idx * 0.1}>
                    <ArticleCard article={a} />
                  </FadeIn>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <FadeIn delay={0.4}>
            <div className="mt-16 gradient-primary rounded-xl p-8 text-center">
              <h2 className="font-montserrat text-2xl font-bold mb-3">Potrzebujesz klimatyzacji?</h2>
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
      <Footer />
    </main>
  );
}
