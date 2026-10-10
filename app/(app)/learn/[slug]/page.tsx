import { notFound } from "next/navigation";
import ArticleView from "@/components/learn/ArticleView";
import { ARTICLES, getArticle, safeFrom } from "@/lib/learn";
export const generateStaticParams = () => ARTICLES.map((a) => ({ slug: a.slug }));
export function generateMetadata({ params }: { params: { slug: string } }) { const a = getArticle(params.slug); return a ? { title: `${a.title} — PRAGYA`, description: a.summary } : {}; }
export default function ArticlePage({ params, searchParams }: { params: { slug: string }; searchParams: { from?: string | string[] } }) {
  const a = getArticle(params.slug); if (!a) notFound();
  return <ArticleView a={a} back={safeFrom(searchParams.from)} />;
}
