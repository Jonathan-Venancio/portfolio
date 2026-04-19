import { motion } from "framer-motion";
import { Database, Code, Layers, Shield, GraduationCap, Briefcase } from "lucide-react";

const journeySteps = [
  {
    icon: Database,
    title: "Cientista de Dados",
    period: "Início da carreira",
    description: "Análise de dados, modelagem estatística e extração de insights para tomada de decisões.",
    command: "init --role data-scientist"
  },
  {
    icon: Code,
    title: "Backend Python",
    period: "Transição técnica",
    description: "Desenvolvimento de APIs robustas, automação de processos e arquitetura de sistemas.",
    command: "switch --stack python-backend"
  },
  {
    icon: Layers,
    title: "Full Stack TypeScript",
    period: "Expansão de skills",
    description: "Construção de aplicações completas, integração frontend-backend e experiência do usuário.",
    command: "expand --stack typescript-fullstack"
  },
  {
    icon: Shield,
    title: "Segurança da Informação",
    period: "Atual",
    description: "Análise de vulnerabilidades, proteção de sistemas e defesa contra ameaças cibernéticas.",
    command: "focus --area infosec"
  }
];

const education = [
  {
    icon: GraduationCap,
    title: "Pós-graduação em Ciência de Dados",
    description: "Especialização em análise avançada de dados e machine learning"
  },
  {
    icon: Briefcase,
    title: "Graduação em Segurança da Informação",
    description: "Formação focada em proteção de dados e cibersegurança"
  }
];

const JourneySection = () => {
  return (
    <section id="trajetoria" className="py-24 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-4">
            &gt; cat minha_historia.txt
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Minha <span className="text-primary neon-text">Trajetória</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            Uma jornada em constante evolução, combinando dados, código e segurança
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/20 z-0" />

          {journeySteps.map((step, index) => {
            const isLast = index === journeySteps.length - 1;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative mb-12 last:mb-0"
              >
                {/* Node on the line - vertically centered with card */}
                <div className="absolute left-6 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                  <div className={`relative w-5 h-5 rounded-full bg-background border-2 ${isLast ? 'border-primary neon-border' : 'border-primary/70'}`}>
                    <span className="absolute inset-1 rounded-full bg-primary/60" />
                    {isLast && (
                      <span className="absolute -inset-1 rounded-full bg-primary/30 animate-ping" />
                    )}
                  </div>
                </div>

                {/* Card row */}
                <div className={`flex md:items-start ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>
                  <div className={`pl-16 md:pl-0 w-full md:w-[calc(50%-2.5rem)] ${isLeft ? 'md:pr-10 md:text-right' : 'md:pl-10 md:text-left'}`}>
                    <div className={`bg-card/60 backdrop-blur-sm border rounded-lg p-5 transition-all duration-300 hover:border-primary/60 hover:bg-card/80 ${isLast ? 'border-primary/50 shadow-[0_0_30px_-10px_hsl(var(--primary)/0.4)]' : 'border-border'}`}>
                      <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                        <div className={`p-2 rounded-md ${isLast ? 'bg-primary/15' : 'bg-primary/5'}`}>
                          <step.icon className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                          {step.period}
                        </span>
                        {isLast && (
                          <span className={`font-mono text-[10px] text-primary border border-primary/40 px-2 py-0.5 rounded-full bg-primary/5 ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}`}>
                            ATIVO
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-heading font-bold text-foreground mb-1">{step.title}</h3>
                      <p className="font-mono text-xs text-primary/70 mb-3">&gt; {step.command}</p>
                      <p className="text-muted-foreground text-sm font-body leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Education section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <div className="text-center mb-8">
            <p className="font-mono text-primary text-sm tracking-widest uppercase">
              &gt; ls formacao_academica/
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {education.map((edu, index) => (
              <motion.div
                key={edu.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-card/50 border border-border rounded-lg p-6 flex items-start gap-4 hover:border-primary/50 transition-colors"
              >
                <div className="p-3 bg-primary/10 rounded-lg">
                  <edu.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-1">{edu.title}</h4>
                  <p className="text-muted-foreground text-sm font-body">{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Summary text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <div className="p-6 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 rounded-lg">
            <p className="font-mono text-primary text-sm mb-4">&gt; echo $RESUMO</p>
            <p className="text-muted-foreground font-body leading-relaxed">
              Combinando minha formação em <span className="text-primary">Ciência de Dados</span> com experiência 
              prática em <span className="text-primary">desenvolvimento de software</span>, trago uma visão 
              única para a <span className="text-primary">Segurança da Informação</span>. Entendo tanto o 
              código quanto os dados que ele processa, permitindo identificar vulnerabilidades que outros 
              podem ignorar.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneySection;
