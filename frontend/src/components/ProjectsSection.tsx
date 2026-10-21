import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SectionHeading from "@/components/SectionHeading";
import { extraCategories, projects, securityCategories, type PortfolioProject } from "@/content/site";

const detailFields: { key: "objective" | "context" | "implementation" | "results" | "limitations" | "conclusions"; label: string }[] = [
  { key: "objective", label: "Objetivo" },
  { key: "context", label: "Contexto" },
  { key: "implementation", label: "Implementação" },
  { key: "results", label: "Resultados" },
  { key: "limitations", label: "Limitações" },
  { key: "conclusions", label: "Conclusões" },
];

const ProjectCard = ({ project, onOpen }: { project: PortfolioProject; onOpen: (project: PortfolioProject) => void }) => (
  <article className="bg-card border border-border rounded-lg p-6 flex flex-col gap-4 hover:border-primary/50 transition-colors">
    <div className="flex items-start justify-between gap-3">
      <h3 className="font-heading text-lg text-foreground">{project.title}</h3>
      <span className="shrink-0 font-mono text-[11px] uppercase tracking-wide text-primary border border-primary/30 rounded-full px-2 py-1">
        {project.label}
      </span>
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed">{project.summary}</p>
    <div className="flex flex-wrap gap-2">
      {project.technologies.map((tech) => (
        <span key={tech} className="text-xs font-mono px-2 py-1 rounded bg-secondary text-primary/80">
          {tech}
        </span>
      ))}
    </div>
    <div className="flex flex-wrap gap-4 mt-auto pt-2">
      <button type="button" onClick={() => onOpen(project)} className="font-mono text-sm text-primary hover:underline">
        Ver detalhes
      </button>
      <a href={project.url} target="_blank" rel="noreferrer" className="font-mono text-sm text-muted-foreground hover:text-primary">
        Repositório
      </a>
    </div>
  </article>
);

const ProjectsSection = () => {
  const [selected, setSelected] = useState<PortfolioProject | null>(null);
  const securityProjects = projects.filter(
    (project) => project.category === "offensive" || project.category === "defensive" || project.category === "automation",
  );
  const extraProjects = projects.filter((project) => project.category === "development" || project.category === "data");

  return (
    <section id="projetos" className="py-24 px-4 scroll-mt-20">
      <div className="container max-w-5xl">
        <SectionHeading
          eyebrow="> cd projetos/"
          title="Projetos"
          description="O destaque é Segurança da Informação. Só entram projetos com repositório público. Não há trabalhos de cliente nesta página. Onde não há projeto, a categoria fica vazia de propósito."
        />

        <Tabs defaultValue="offensive" className="w-full">
          <TabsList className="flex w-full flex-col sm:grid sm:grid-cols-3 bg-card border border-border h-auto p-1 mb-8 gap-1">
            {securityCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="w-full justify-center font-mono text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border data-[state=active]:border-primary/30 py-2.5 px-3 whitespace-normal text-center leading-tight"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {securityCategories.map((category) => {
            const items = securityProjects.filter((project) => project.category === category.id);
            return (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <p className="text-sm text-muted-foreground mb-6">{category.description}</p>
                {items.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {items.map((project, index) => (
                      <motion.div
                        key={project.slug}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <ProjectCard project={project} onOpen={setSelected} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="border border-dashed border-border rounded-lg p-8 text-sm text-muted-foreground leading-relaxed">
                    {category.empty}
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>

        <div className="mt-20">
          <p className="font-mono text-primary text-sm tracking-widest mb-2">&gt; ls extra.py</p>
          <h3 className="font-heading text-2xl text-foreground mb-3">Desenvolvimento e dados</h3>
          <p className="text-sm text-muted-foreground mb-8 max-w-3xl">
            Projetos pessoais de desenvolvimento e de dados, no mesmo formato dos projetos de segurança.
          </p>

          <Tabs defaultValue="development" className="w-full">
            <TabsList className="flex w-full flex-col sm:grid sm:grid-cols-2 bg-card border border-border h-auto p-1 mb-8 gap-1">
              {extraCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="w-full justify-center font-mono text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border data-[state=active]:border-primary/30 py-2.5 px-3 whitespace-normal text-center leading-tight"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {extraCategories.map((category) => {
              const items = extraProjects.filter((project) => project.category === category.id);
              return (
                <TabsContent key={category.id} value={category.id} className="mt-0">
                  <p className="text-sm text-muted-foreground mb-6">{category.description}</p>
                  {items.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {items.map((project) => (
                        <ProjectCard key={project.slug} project={project} onOpen={setSelected} />
                      ))}
                    </div>
                  ) : (
                    <div className="border border-dashed border-border rounded-lg p-8 text-sm text-muted-foreground leading-relaxed">
                      {category.empty}
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selected ? (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading text-xl pr-6">{selected.title}</DialogTitle>
                <DialogDescription>{selected.label}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 text-sm leading-relaxed">
                {detailFields.map((field) => (
                  <div key={field.key}>
                    <h4 className="font-heading text-foreground mb-1">{field.label}</h4>
                    <p className="text-muted-foreground">{selected[field.key]}</p>
                  </div>
                ))}
                <div>
                  <h4 className="font-heading text-foreground mb-2">Tecnologias</h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.technologies.map((tech) => (
                      <span key={tech} className="text-xs font-mono px-2 py-1 rounded bg-secondary text-primary/80">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <a href={selected.url} target="_blank" rel="noreferrer" className="inline-block font-mono text-primary hover:underline">
                  Abrir repositório
                </a>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;
