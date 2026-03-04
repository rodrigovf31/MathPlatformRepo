import { useParams } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PdfCard from "@/components/PdfCard";
import PdfViewer from "@/components/PdfViewer";
import AdBanner from "@/components/AdBanner";
import { getTopicsByYear } from "@/data/topics";
import { useResources } from "@/hooks/useResources";

const YearPage = () => {
  const { year } = useParams();
  const yearNum = Number(year);
  const topics = getTopicsByYear(yearNum);
  const { data: resources = [], isLoading } = useResources(yearNum);

  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set(topics.map(t => t.id)));
  const [viewingPdf, setViewingPdf] = useState<{ url: string; title: string } | null>(null);

  const toggleTopic = (id: string) => {
    setExpandedTopics(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  if (![10, 11, 12].includes(yearNum)) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Ano não encontrado.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="section-spacing">
          <div className="container-narrow">
            <h1 className="text-3xl font-extrabold mb-2 text-primary">{yearNum}º Ano — Matemática A</h1>
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

                  return (
                    <div key={topic.id}>
                      <button
                        onClick={() => toggleTopic(topic.id)}
                        className="w-full flex items-center gap-3 rounded-lg bg-card border border-border p-4 hover:border-primary/30 transition-colors text-left"
                      >
                        {isExpanded ? <ChevronDown className="h-5 w-5 text-primary shrink-0" /> : <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />}
                        <h2 className="font-semibold">{topic.name}</h2>
                        <span className="ml-auto text-xs text-muted-foreground">{topicResources.length} recursos</span>
                      </button>

                      {isExpanded && (
                        <div className="mt-2 ml-4 md:ml-8 space-y-2">
                          {topicResources.length === 0 ? (
                            <p className="text-sm text-muted-foreground py-3 px-4">Ainda não existem recursos para este tema. Volta em breve!</p>
                          ) : (
                            topicResources.map(r => (
                              <PdfCard
                                key={r.id}
                                title={r.title}
                                type={r.type as "ficha" | "guia"}
                                fileUrl={r.file_url}
                                onView={() => setViewingPdf({ url: r.file_url, title: r.title })}
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
        <PdfViewer
          fileUrl={viewingPdf.url}
          title={viewingPdf.title}
          onClose={() => setViewingPdf(null)}
        />
      )}
    </div>
  );
};

export default YearPage;
