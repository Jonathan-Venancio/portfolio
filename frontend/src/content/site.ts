/**
 * Conteúdo público do portfólio.
 * Serviços, projetos e competências ficam aqui para serem ajustados sem inventar dados.
 * Para publicar um serviço, mude `status` para "disponivel".
 */

export type ServiceStatus = "disponivel" | "em-preparacao" | "pratica-pessoal";

export const serviceStatusLabel: Record<ServiceStatus, string> = {
  disponivel: "Posso conversar sobre um escopo",
  "em-preparacao": "Em preparação",
  "pratica-pessoal": "Prática em projeto pessoal",
};

export const profileCopy = {
  name: "Jonathan Venancio",
  title: "Cybersecurity | Offensive & Defensive Security",
  headline: "Identificar vulnerabilidades. Reduzir riscos. Fortalecer sistemas.",
  description:
    "Profissional de tecnologia com foco em Segurança da Informação, desenvolvendo competências em segurança ofensiva e defensiva por meio de projetos técnicos, laboratórios e estudos práticos. Meu objetivo é ajudar pequenos negócios a compreender seus riscos e melhorar a segurança de seus sistemas e aplicações.",
  about:
    "Sou Jonathan Venancio, profissional de tecnologia com interesse e foco em Segurança da Informação. Venho desenvolvendo meus conhecimentos por meio de estudos, projetos pessoais e laboratórios práticos, explorando tanto técnicas de identificação de vulnerabilidades quanto medidas de proteção e fortalecimento de sistemas. Tenho interesse especial em Segurança Ofensiva, Segurança Defensiva e Automação de Segurança. Meu objetivo é transformar esse conhecimento em soluções práticas, documentadas e responsáveis, ajudando pequenos negócios a compreender melhor seus riscos e a melhorar sua postura de segurança.",
  email: "jonathan.ghabriel@gmail.com",
  github: "https://github.com/Jonathan-Venancio",
  linkedin: "https://www.linkedin.com/in/jonathan-ven%C3%A2ncio-93aa5420a/",
};

export const services: {
  id: string;
  title: string;
  description: string;
  status: ServiceStatus;
  note?: string;
}[] = [
  {
    id: "avaliacao",
    title: "Avaliação de segurança",
    description:
      "Avaliação estruturada de aplicações e sistemas para identificar possíveis vulnerabilidades, configurações inseguras e oportunidades de melhoria.",
    status: "em-preparacao",
  },
  {
    id: "web",
    title: "Segurança de aplicações web",
    description:
      "Análise de aspectos de segurança de aplicações web, incluindo configurações, mecanismos de autenticação e possíveis vulnerabilidades, conforme o escopo acordado.",
    status: "em-preparacao",
  },
  {
    id: "hardening",
    title: "Hardening de sistemas",
    description:
      "Revisão e fortalecimento das configurações de segurança de sistemas e servidores, buscando reduzir a exposição a riscos.",
    status: "em-preparacao",
  },
  {
    id: "logs",
    title: "Análise de logs e monitoramento",
    description:
      "Análise de registros e eventos de sistemas para compreender comportamentos relevantes e identificar possíveis atividades suspeitas.",
    status: "em-preparacao",
  },
  {
    id: "automacao",
    title: "Automação de segurança",
    description:
      "Desenvolvimento de scripts e pequenas ferramentas para automatizar verificações e tarefas relacionadas à segurança.",
    status: "pratica-pessoal",
    note: "O projeto pessoal SurfaceOps organiza dados de reconhecimento. A execução automática de nmap, subfinder e theHarvester ainda não está implementada no código.",
  },
];

export const methodology = [
  {
    step: "01",
    title: "Identificar",
    description:
      "Analisar o ambiente dentro do escopo autorizado, identificar possíveis problemas e compreender os riscos observados.",
  },
  {
    step: "02",
    title: "Recomendar",
    description:
      "Documentar os resultados, explicar sua relevância e apresentar recomendações técnicas de mitigação.",
  },
  {
    step: "03",
    title: "Fortalecer",
    description:
      "Quando contratado e tecnicamente adequado, auxiliar na implementação de medidas defensivas e verificar os resultados das correções.",
  },
];

export type ProjectCategory = "offensive" | "defensive" | "automation" | "development" | "data";

export interface PortfolioProject {
  slug: string;
  title: string;
  category: ProjectCategory;
  label: "Projeto pessoal";
  summary: string;
  objective: string;
  context: string;
  technologies: string[];
  implementation: string;
  results: string;
  limitations: string;
  conclusions: string;
  url: string;
}

export const extraCategories: {
  id: Extract<ProjectCategory, "development" | "data">;
  name: string;
  description: string;
  empty: string;
}[] = [
  {
    id: "development",
    name: "Desenvolvimento",
    description: "Aplicações e APIs pessoais, em Python e TypeScript.",
    empty: "Nenhum projeto de desenvolvimento publicado nesta lista.",
  },
  {
    id: "data",
    name: "Dados",
    description: "Projetos pessoais de leitura, visualização e tratamento de dados.",
    empty: "Nenhum projeto de dados publicado nesta lista.",
  },
];

export const securityCategories: {
  id: Exclude<ProjectCategory, "development" | "data">;
  name: string;
  description: string;
  empty: string;
}[] = [
  {
    id: "offensive",
    name: "Offensive Security",
    description: "Projetos pessoais ligados a reconhecimento e organização de informações de segurança.",
    empty: "Nenhum projeto publicado nesta categoria ainda.",
  },
  {
    id: "defensive",
    name: "Defensive Security",
    description: "Espaço reservado para hardening, monitoramento e validação de medidas defensivas.",
    empty: "Ainda não há projetos publicados nesta categoria.",
  },
  {
    id: "automation",
    name: "Security Automation",
    description: "Espaço reservado para scripts e ferramentas que executem verificações de segurança.",
    empty:
      "Ainda não há uma ferramenta publicada que execute verificações automaticamente. O SurfaceOps deixa rotas preparadas para scanners, mas essa parte do código ainda não funciona.",
  },
];

export const projects: PortfolioProject[] = [
  {
    slug: "surfaceops",
    title: "SurfaceOps",
    category: "offensive",
    label: "Projeto pessoal",
    summary:
      "Plataforma pessoal para organizar dados de reconhecimento e OSINT: alvos, subdomínios, registros de vulnerabilidades, pessoas, e-mails e notas.",
    objective:
      "Concentrar, em uma API, o registro de informações coletadas durante um reconhecimento, em vez de espalhá-las em anotações soltas.",
    context:
      "Projeto pessoal. O repositório descreve a plataforma como apoio ao trabalho de pentesters. Não é um teste realizado para um cliente e não há achados de um alvo real publicados.",
    technologies: ["Python", "FastAPI", "SQLite", "TypeScript", "Vite"],
    implementation:
      "O backend expõe rotas para alvos, subdomínios, vulnerabilidades, pessoas, e-mails, notas e tags. Também há rotas para nmap, subfinder e theHarvester.",
    results: "Não há resultados de varredura ou vulnerabilidades encontradas publicados no repositório.",
    limitations:
      "A integração com nmap, subfinder e theHarvester está marcada no código como mock. Essas rotas não executam as ferramentas.",
    conclusions:
      "O projeto mostra a modelagem de um fluxo de reconhecimento. A automação da coleta ainda precisa ser implementada.",
    url: "https://github.com/Jonathan-Venancio/SurfaceOps",
  },
  {
    slug: "magic-deck-tracker",
    title: "Magic Deck Tracker",
    category: "development",
    label: "Projeto pessoal",
    summary: "Companion para consultar traduções de cartas físicas de Magic durante a partida.",
    objective: "Ajudar a consultar traduções de cartas físicas durante uma partida.",
    context: "Projeto pessoal. Frontend em React e backend em FastAPI.",
    technologies: ["React", "Vite", "TypeScript", "FastAPI", "Poetry", "PostgreSQL", "SQLite", "Docker"],
    implementation: "O backend usa PostgreSQL em produção e SQLite quando não há banco configurado. O Vite encaminha as chamadas da interface para a API.",
    results: "Não há métricas de uso publicadas.",
    limitations: "O repositório não documenta regras de negócio além da consulta de traduções.",
    conclusions: "Aplicação completa, com interface, API e publicação em Docker.",
    url: "https://github.com/Jonathan-Venancio/Magic_Deck_Tracker",
  },
  {
    slug: "ascend",
    title: "Ascend",
    category: "development",
    label: "Projeto pessoal",
    summary: "API de um sistema de gamificação, com autenticação, missões, recompensas e perfil.",
    objective: "Estruturar o backend de um sistema de gamificação.",
    context: "Projeto pessoal. A API declara o sistema como gamificação.",
    technologies: ["Python", "FastAPI", "TypeScript"],
    implementation: "Rotas de autenticação, habilidades, missões, recompensas e perfil.",
    results: "Não há resultados de uso publicados.",
    limitations: "O repositório não traz um README com o fluxo completo da aplicação.",
    conclusions: "Backend organizado por domínio: autenticação, progressão e recompensas.",
    url: "https://github.com/Jonathan-Venancio/Ascend",
  },
  {
    slug: "ecommerce",
    title: "Ecommerce",
    category: "development",
    label: "Projeto pessoal",
    summary: "Loja em Django, com modelos próprios e integrações de pagamento e faturação.",
    objective: "Montar o backend de uma loja com catálogo e integrações externas.",
    context: "Projeto pessoal no repositório ecommerce.",
    technologies: ["Python", "Django", "JavaScript"],
    implementation: "App Django com modelos, templates e módulos de API para Mercado Pago e Vendus.",
    results: "Não há volume de vendas ou métricas publicadas.",
    limitations: "O repositório não descreve o catálogo nem o estado de cada integração.",
    conclusions: "Base de uma loja com persistência e pontos de integração já separados no código.",
    url: "https://github.com/Jonathan-Venancio/ecommerce",
  },
  {
    slug: "contratos",
    title: "Gerador de contratos",
    category: "development",
    label: "Projeto pessoal",
    summary: "Aplicação Streamlit que monta um contrato em PDF a partir dos dados preenchidos no formulário.",
    objective: "Gerar um PDF de contrato sem montar o documento à mão.",
    context: "Projeto pessoal. O formulário pede nome, identificação, função, salário e datas.",
    technologies: ["Python", "Streamlit", "ReportLab"],
    implementation: "A interface coleta os campos e o ReportLab desenha o PDF, incluindo o logotipo usado no arquivo.",
    results: "Não há quantidade de contratos gerados publicada.",
    limitations: "O modelo do documento está fixo no código.",
    conclusions: "Automação de um documento repetitivo, da entrada dos dados até o PDF.",
    url: "https://github.com/Jonathan-Venancio/contratostreamlit",
  },
  {
    slug: "clinicas",
    title: "Visualizador de clínicas",
    category: "data",
    label: "Projeto pessoal",
    summary: "Painel Streamlit para abrir planilhas de clínicas e consultar os registros.",
    objective: "Ler arquivos Excel de clínicas sem abrir cada planilha manualmente.",
    context: "Projeto pessoal. O repositório inclui planilhas e uma tela de upload.",
    technologies: ["Python", "Streamlit", "Pandas"],
    implementation: "A aplicação lista arquivos .xlsx do diretório e de uma pasta de uploads, e usa o Pandas para ler as tabelas.",
    results: "Não há análise estatística ou volume de registros publicado.",
    limitations: "O código trata a visualização das planilhas. Não há modelo preditivo.",
    conclusions: "Ferramenta curta para consultar dados tabulares que já existem em Excel.",
    url: "https://github.com/Jonathan-Venancio/contatos",
  },
  {
    slug: "livrosfnac",
    title: "Leitor de livros",
    category: "data",
    label: "Projeto pessoal",
    summary: "Aplicação Python para ler códigos de barras e extrair texto de imagens.",
    objective: "Identificar livros a partir de código de barras e de OCR.",
    context: "Projeto pessoal no repositório livrosfnac.",
    technologies: ["Python", "OCR", "Código de barras"],
    implementation: "O repositório separa a aplicação, um módulo de código de barras e um módulo de OCR.",
    results: "Não há taxa de acerto ou base de livros publicada.",
    limitations: "Não há README descrevendo o fluxo completo nem a origem dos dados.",
    conclusions: "Projeto de captura de dados a partir de imagem e de código de barras.",
    url: "https://github.com/Jonathan-Venancio/livrosfnac",
  },
];

export interface SkillItem {
  name: string;
  context: string;
}

export interface SkillGroup {
  id: string;
  name: string;
  description: string;
  items: SkillItem[];
  projectSlug?: string;
}

export const skillGroups: SkillGroup[] = [
  {
    id: "offensive",
    name: "Offensive Security",
    description: "O que o projeto pessoal publicado mostra hoje. Não é atuação profissional.",
    projectSlug: "surfaceops",
    items: [
      {
        name: "Organização de dados de reconhecimento",
        context: "Projeto pessoal. Alvos, subdomínios, registros de vulnerabilidades, pessoas, e-mails e notas no SurfaceOps.",
      },
    ],
  },
  {
    id: "defensive",
    name: "Defensive Security",
    description: "Categoria reservada. Ainda não há projeto publicado que demonstre esta prática.",
    items: [],
  },
  {
    id: "automation",
    name: "Security Automation",
    description:
      "Python e FastAPI aparecem nos projetos pessoais. A execução automática de scanners, no SurfaceOps, ainda não está implementada.",
    projectSlug: "surfaceops",
    items: [
      { name: "Python", context: "Usado nos backends pessoais, incluindo o SurfaceOps." },
      { name: "FastAPI", context: "Usado para construir as APIs desses projetos." },
    ],
  },
  {
    id: "infrastructure",
    name: "Infrastructure & Networking",
    description: "Tecnologias já cadastradas no portfólio. Não há nível percentual associado.",
    items: [
      { name: "Linux", context: "Competência já cadastrada." },
      { name: "Docker", context: "Usado na publicação de projetos pessoais." },
      { name: "SQL", context: "Competência já cadastrada." },
      { name: "PostgreSQL", context: "Usado quando um projeto pessoal sai do SQLite." },
      { name: "Git", context: "Competência já cadastrada." },
    ],
  },
];
