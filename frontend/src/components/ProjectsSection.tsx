import { motion } from "framer-motion";
import { Shield, Bug, Lock, Wifi, Database, BarChart3, Brain, Code2, Server, Layers, GitBranch } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Project = {
  icon: typeof Shield;
  title: string;
  description: string;
  tags: string[];
};

const securityProjects: Project[] = [
  {
    icon: Shield,
    title: "SecAudit Framework",
    description: "Framework automatizado de auditoria de segurança para ambientes corporativos. Realiza varreduras de vulnerabilidades, análise de configurações e gera relatórios detalhados de compliance.",
    tags: ["Python", "OWASP", "Nmap", "Compliance"],
  },
  {
    icon: Bug,
    title: "ThreatHunter",
    description: "Plataforma de threat hunting que correlaciona logs de múltiplas fontes (SIEM, firewall, endpoints) para detecção proativa de ameaças avançadas e APTs.",
    tags: ["SIEM", "ELK Stack", "MITRE ATT&CK", "Python"],
  },
  {
    icon: Lock,
    title: "CryptoVault",
    description: "Sistema de gerenciamento de chaves criptográficas e secrets para equipes DevOps. Integração com CI/CD pipelines e rotação automática de credenciais.",
    tags: ["Go", "HashiCorp Vault", "Docker", "API REST"],
  },
  {
    icon: Wifi,
    title: "NetGuard Monitor",
    description: "Solução de monitoramento de rede em tempo real com detecção de intrusão baseada em machine learning. Dashboard interativo com alertas e análise de tráfego.",
    tags: ["Wireshark", "ML", "React", "Suricata"],
  },
];

const programmingProjects: Project[] = [
  {
    icon: Code2,
    title: "API Gateway Microservices",
    description: "Arquitetura de microserviços com API Gateway customizado, autenticação JWT, rate limiting e observabilidade completa via OpenTelemetry.",
    tags: ["Python", "FastAPI", "Docker", "Kubernetes"],
  },
  {
    icon: Layers,
    title: "Dashboard Full Stack",
    description: "Aplicação web completa para gestão empresarial com dashboard analítico em tempo real, autenticação multi-tenant e integrações com APIs externas.",
    tags: ["TypeScript", "React", "Node.js", "PostgreSQL"],
  },
  {
    icon: Server,
    title: "Task Automation Engine",
    description: "Motor de automação de tarefas backend com fila distribuída, retry policies e workflows configuráveis para processamento de jobs em larga escala.",
    tags: ["Python", "Celery", "Redis", "RabbitMQ"],
  },
  {
    icon: GitBranch,
    title: "CI/CD Pipeline Toolkit",
    description: "Conjunto de ferramentas para padronização de pipelines CI/CD com testes automatizados, análise estática e deploy progressivo.",
    tags: ["TypeScript", "GitHub Actions", "Docker", "Terraform"],
  },
];

const dataScienceProjects: Project[] = [
  {
    icon: BarChart3,
    title: "Sales Forecasting Model",
    description: "Modelo preditivo de vendas utilizando séries temporais e ensemble learning para previsão de demanda com precisão acima de 90%.",
    tags: ["Python", "Pandas", "Scikit-learn", "Prophet"],
  },
  {
    icon: Brain,
    title: "Customer Churn Predictor",
    description: "Sistema de predição de churn com pipeline completo de feature engineering, treinamento e deploy de modelos em produção.",
    tags: ["Python", "XGBoost", "MLflow", "AWS"],
  },
  {
    icon: Database,
    title: "ETL Data Pipeline",
    description: "Pipeline de ETL escalável para ingestão e transformação de dados de múltiplas fontes em data warehouse, com qualidade de dados monitorada.",
    tags: ["Python", "Airflow", "Spark", "BigQuery"],
  },
];

const categories = [
  {
    id: "seguranca",
    label: "Segurança",
    command: "ls projetos/seguranca/",
    description: "Foco atual — projetos de cibersegurança, threat hunting e compliance",
    projects: securityProjects,
  },
  {
    id: "programacao",
    label: "Programação",
    command: "ls projetos/programacao/",
    description: "Backend Python e Full Stack TypeScript",
    projects: programmingProjects,
  },
  {
    id: "dados",
    label: "Ciência de Dados",
    command: "ls projetos/data-science/",
    description: "Modelagem preditiva, ML e engenharia de dados",
    projects: dataScienceProjects,
  },
];

const ProjectsSection = () => {
  return (
    <section className="py-24 px-4" id="projetos">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="font-mono text-primary text-sm tracking-widest mb-2">&gt; cd projetos/ &amp;&amp; ls -la</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Projetos
          </h2>
          <p className="text-muted-foreground font-body mt-3 max-w-2xl">
            Trabalhos divididos pelas três áreas que moldaram minha carreira. O foco atual é{" "}
            <span className="text-primary">Segurança da Informação</span>.
          </p>
        </motion.div>

        <Tabs defaultValue="seguranca" className="w-full">
          <TabsList className="flex w-full flex-col sm:grid sm:grid-cols-3 bg-card border border-border h-auto p-1 mb-8 gap-1">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="w-full justify-center font-mono text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border data-[state=active]:border-primary/30 py-2.5 px-3 whitespace-normal text-center leading-tight"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-6"
              >
                <p className="font-mono text-primary text-xs md:text-sm mb-1">&gt; {cat.command}</p>
                <p className="text-muted-foreground text-sm font-body">{cat.description}</p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {cat.projects.map((project, i) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="group relative bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:neon-border"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-secondary">
                        <project.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 space-y-3">
                        <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-mono px-2 py-1 rounded bg-secondary text-primary/80"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ProjectsSection;
