import SectionHeading from "@/components/SectionHeading";
import { methodology } from "@/content/site";

const MethodologySection = () => {
  return (
    <section id="metodologia" className="py-24 px-4 scroll-mt-20">
      <div className="container max-w-5xl">
        <SectionHeading
          eyebrow="> cat metodologia.txt"
          title="Como pretendo trabalhar"
          description="Segurança ofensiva e defensiva se complementam: primeiro o problema precisa ser compreendido, depois documentado, e só então corrigido quando isso fizer parte do combinado."
        />

        <ol className="grid md:grid-cols-3 gap-6">
          {methodology.map((step) => (
            <li key={step.step} className="bg-card border border-border rounded-lg p-6">
              <p className="font-mono text-primary text-sm mb-3">{step.step}</p>
              <h3 className="font-heading text-xl text-foreground mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-sm text-muted-foreground leading-relaxed max-w-3xl">
          Testes de segurança só acontecem com autorização e escopo definidos antes do início. A etapa de fortalecer não faz parte de toda avaliação: a implementação de correções ocorre quando for contratada e for tecnicamente adequada.
        </p>
      </div>
    </section>
  );
};

export default MethodologySection;
