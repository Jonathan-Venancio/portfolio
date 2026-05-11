import { motion } from "framer-motion";
import { Shield, Bug, Lock, Wifi, Database, BarChart3, Brain, Code2, Server, Layers, GitBranch } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  category_id: number;
  is_active: boolean;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  command: string;
  description: string;
  is_active: boolean;
  projects?: Project[];
}


const ProjectsSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch categories
      const categoriesResponse = await fetch('http://localhost:8000/categories');
      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json();
        const activeCategories = categoriesData.filter((cat: Category) => cat.is_active);
        
        // Fetch projects for each category
        const categoriesWithProjects = await Promise.all(
          activeCategories.map(async (category: Category) => {
            const projectsResponse = await fetch(`http://localhost:8000/projects/by-category/${category.id}`);
            if (projectsResponse.ok) {
              const projectsData = await projectsResponse.json();
              return {
                ...category,
                projects: projectsData.projects.filter((project: Project) => project.is_active)
              };
            }
            return { ...category, projects: [] };
          })
        );
        
        setCategories(categoriesWithProjects);
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      // Fallback hardcoded
      setCategories([
        {
          id: 1,
          name: "Segurança",
          slug: "seguranca",
          command: "ls projetos/seguranca/",
          description: "Foco atual — projetos de cibersegurança, threat hunting e compliance",
          is_active: true,
          projects: [
            {
              id: 1,
              title: "SecAudit Framework",
              description: "Framework automatizado de auditoria de segurança para ambientes corporativos.",
              icon: "Shield",
              tags: ["Python", "OWASP", "Nmap"],
              category_id: 1,
              is_active: true
            }
          ]
        },
        {
          id: 2,
          name: "Programação",
          slug: "programacao",
          command: "ls projetos/programacao/",
          description: "Backend Python e Full Stack TypeScript",
          is_active: true,
          projects: []
        },
        {
          id: 3,
          name: "Ciência de Dados",
          slug: "dados",
          command: "ls projetos/data-science/",
          description: "Modelagem preditiva, ML e engenharia de dados",
          is_active: true,
          projects: []
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'shield':
        return Shield;
      case 'bug':
        return Bug;
      case 'lock':
        return Lock;
      case 'wifi':
        return Wifi;
      case 'database':
        return Database;
      case 'barchart3':
        return BarChart3;
      case 'brain':
        return Brain;
      case 'code2':
        return Code2;
      case 'server':
        return Server;
      case 'layers':
        return Layers;
      case 'gitbranch':
        return GitBranch;
      default:
        return Code2;
    }
  };
  if (loading) {
    return (
      <section className="py-24 px-4" id="projetos">
        <div className="container max-w-5xl text-center">
          <div className="text-muted-foreground">Carregando projetos...</div>
        </div>
      </section>
    );
  }

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

        {categories.length > 0 ? (
          <Tabs defaultValue={categories[0]?.slug || ""} className="w-full">
            <TabsList className="flex w-full flex-col sm:grid sm:grid-cols-3 bg-card border border-border h-auto p-1 mb-8 gap-1">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.slug}
                  className="w-full justify-center font-mono text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border data-[state=active]:border-primary/30 py-2.5 px-3 whitespace-normal text-center leading-tight"
                >
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((cat) => (
              <TabsContent key={cat.id} value={cat.slug} className="mt-0">
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
                  {cat.projects && cat.projects.length > 0 ? (
                    cat.projects.map((project, i) => {
                      const Icon = getIcon(project.icon);
                      return (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="group relative bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:neon-border"
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-secondary">
                              <Icon className="w-6 h-6 text-primary" />
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
                      );
                    })
                  ) : (
                    <div className="col-span-2 text-center text-muted-foreground">
                      Nenhum projeto encontrado nesta categoria.
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="text-center text-muted-foreground">
            Nenhuma categoria de projetos encontrada.
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
