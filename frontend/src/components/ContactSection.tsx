import { motion } from "framer-motion";
import { Mail, ExternalLink, Code, Terminal } from "lucide-react";

const ContactSection = () => {
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
            {[
              { icon: Mail, label: "Email", href: "mailto:jonathan@email.com" },
              { icon: ExternalLink, label: "LinkedIn", href: "#" },
              { icon: Code, label: "GitHub", href: "#" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <div className="p-4 rounded-lg bg-card border border-border group-hover:border-primary/50 group-hover:neon-border transition-all duration-300">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono">{item.label}</span>
              </a>
            ))}
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
