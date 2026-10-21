import { projects, skillGroups } from "@/content/site";
import SectionHeading from "@/components/SectionHeading";

const SkillsSection = () => {
  return (
    <section id="competencias" className="py-24 px-4 scroll-mt-20">
      <div className="container max-w-5xl">
        <SectionHeading
          eyebrow="> cat competencias.txt"
          title="Competências"
          description="Sem porcentagens. Cada item indica de onde vem a prática. O que não está publicado não aparece como domínio."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {skillGroups.map((group) => {
            const related = projects.find((project) => project.slug === group.projectSlug);
            return (
              <article key={group.id} className="bg-card border border-border rounded-lg p-6 flex flex-col gap-4">
                <div>
                  <h3 className="font-heading text-lg text-foreground">{group.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{group.description}</p>
                </div>
                {group.items.length > 0 ? (
                  <ul className="space-y-3">
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <p className="text-sm text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.context}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">Nenhuma competência publicada nesta categoria.</p>
                )}
                {related ? (
                  <a href="#projetos" className="font-mono text-sm text-primary hover:underline mt-auto">
                    Ver {related.title}
                  </a>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
