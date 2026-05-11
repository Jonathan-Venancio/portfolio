import { motion } from "framer-motion";
import { Mail, ExternalLink, Code, Terminal } from "lucide-react";
import { useState, useEffect } from "react";

interface Contact {
  id: number;
  label: string;
  icon: string;
  url: string;
  is_active: boolean;
}

const ContactSection = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:8000/contacts');
      if (response.ok) {
        const data = await response.json();
        setContacts(data.filter((contact: Contact) => contact.is_active));
      }
    } catch (error) {
      console.error('Erro ao buscar contatos:', error);
      // Fallback para contatos hardcoded se a API falhar
      setContacts([
        { id: 1, label: "Email", icon: "mail", url: "mailto:jonathan@email.com", is_active: true },
        { id: 2, label: "LinkedIn", icon: "linkedin", url: "#", is_active: true },
        { id: 3, label: "GitHub", icon: "github", url: "#", is_active: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'mail':
        return Mail;
      case 'externallink':
        return ExternalLink;
      case 'code':
        return Code;
      case 'github':
        return Code;
      case 'linkedin':
        return ExternalLink;
      default:
        return ExternalLink;
    }
  };

  return (
    <section className="py-24 px-4" id="contato">
      <div className="container max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="font-mono text-primary text-sm tracking-widest">&gt; contact --info</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Vamos conversar?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Estou aberto a novas oportunidades e colaborações na área de segurança da informação.
          </p>

          <div className="flex justify-center gap-6 pt-6">
            {loading ? (
              <div className="text-muted-foreground">Carregando...</div>
            ) : contacts.length > 0 ? (
              contacts.map((contact) => {
                const Icon = getIcon(contact.icon);
                return (
                  <a
                    key={contact.id}
                    href={contact.url}
                    className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <div className="p-4 rounded-lg bg-card border border-border group-hover:border-primary/50 group-hover:neon-border transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono">{contact.label}</span>
                  </a>
                );
              })
            ) : (
              <div className="text-muted-foreground">Nenhum contato disponível</div>
            )}
          </div>
        </motion.div>

        <div className="mt-24 pt-8 border-t border-border">
          <p className="text-muted-foreground text-xs font-mono flex items-center justify-center gap-2">
            <Terminal className="w-3 h-3" />
            © 2026 Jonathan Venancio — Segurança da Informação
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
