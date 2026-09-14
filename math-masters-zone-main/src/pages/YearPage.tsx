import { useState, Suspense, lazy } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PdfCard from "@/components/PdfCard";
import AdBanner from "@/components/AdBanner";

/** Só é montado depois de um clique (viewingPdf começa null) — seguro para code-split sem afetar o SSR. */
const PdfViewer = lazy(() => import("@/components/PdfViewer"));
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getTopicsByYear } from "@/data/topics";
import { useResources } from "@/hooks/useResources";
import { findPageSeo } from "@/seo/registry";
import { toDomainPdfUrl } from "@/lib/pdf";

interface YearPageProps {
  year: 10 | 11 | 12;
}

const YearPage = ({ year: yearNum }: YearPageProps) => {
  const topics = getTopicsByYear(yearNum);
  const { data: resources = [], isLoading, isError, error } = useResources(yearNum);
  if (isError) {
    console.error("Erro Supabase:", error);
  }

  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set(topics.map(t => t.id)));
  const [viewingPdf, setViewingPdf] = useState<{ url: string; title: string } | null>(null);
  const seo = findPageSeo(`/matematica-a/${yearNum}-ano`)!;

  const toggleTopic = (id: string) => {
    setExpandedTopics(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Seo {...seo} />
      <Header />

      <main className="flex-1">
        <section className="section-spacing">
          <div className="container-narrow">
            <Breadcrumbs items={seo.breadcrumb ?? []} />
            <h1 className="text-3xl font-extrabold mb-2 text-primary">{seo.h1}</h1>
            <p className="text-muted-foreground mb-8">Explora os recursos disponíveis por tema.</p>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-20 rounded-lg bg-muted animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {topics.map((topic, index) => {
                  const topicResources = resources.filter(r => r.topic === topic.id);
                  const isExpanded = expandedTopics.has(topic.id);
                  const panelId = `${topic.id}-panel`;

                  return (
                    <div key={topic.id} id={topic.id} className="scroll-mt-24">
                      <div className="w-full flex items-center gap-3 rounded-lg bg-card border border-border p-4 hover:border-primary/30 transition-colors">
                        <h2 className="font-semibold flex-1 min-w-0">
                          <a href={`#${topic.id}`} className="glass-link hover:text-primary transition-colors">{topic.name}</a>
                        </h2>
                        <span className="text-xs text-muted-foreground shrink-0">{topicResources.length} recursos</span>
                        <button
                          type="button"
                          onClick={() => toggleTopic(topic.id)}
                          aria-expanded={isExpanded}
                          aria-controls={panelId}
                          aria-label={isExpanded ? `Fechar recursos de ${topic.name}` : `Abrir recursos de ${topic.name}`}
                          className="shrink-0 -m-1 p-3 rounded-md glass glass-ghost glass-interactive"
                        >
                          {isExpanded ? <ChevronDown className="h-5 w-5 text-primary" /> : <ChevronRight className="h-5 w-5 text-muted-foreground" />}
                        </button>
                      </div>

                      {isExpanded && (
                        <div id={panelId} className="mt-2 ml-4 md:ml-8 space-y-2">
                          {topicResources.length === 0 ? (
                            <p className="text-sm text-muted-foreground py-3 px-4">Ainda não existem recursos para este tema. Volta em breve!</p>
                          ) : (
                            topicResources.map(r => (
                              <PdfCard
                                key={r.id}
                                title={r.title}
                                type={r.type as "ficha" | "guia"}
                                fileUrl={toDomainPdfUrl(r.file_url)}
                                onView={() => setViewingPdf({ url: toDomainPdfUrl(r.file_url), title: r.title })}
                              />
                            ))
                          )}
                        </div>
                      )}

                      {/* AdSense entre blocos (a cada 3 temas) */}
                      {(index + 1) % 3 === 0 && index < topics.length - 1 && (
                        <AdBanner className="my-6" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {viewingPdf && (
        <Suspense fallback={null}>
          <PdfViewer
            fileUrl={viewingPdf.url}
            title={viewingPdf.title}
            onClose={() => setViewingPdf(null)}
          />
        </Suspense>
      )}
    </div>
  );
};

export default YearPage;
