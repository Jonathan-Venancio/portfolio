import { motion } from "framer-motion";

const skills = [
  { name: "Pentest & Ethical Hacking", level: 90 },
  { name: "Análise de Vulnerabilidades", level: 85 },
  { name: "SIEM & Monitoramento", level: 80 },
  { name: "Firewall & Redes", level: 85 },
  { name: "Python & Automação", level: 75 },
  { name: "Compliance (ISO 27001, LGPD)", level: 80 },
];

const SkillsSection = () => {
  return (
    <section className="py-24 px-4" id="skills">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-mono text-primary text-sm tracking-widest mb-2">&gt; cat skills.conf</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Habilidades
          </h2>
        </motion.div>

        <div className="space-y-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="space-y-2"
            >
              <div className="flex justify-between text-sm">
                <span className="font-mono text-foreground">{skill.name}</span>
                <span className="font-mono text-primary">{skill.level}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.08 + 0.3, ease: "easeOut" }}
                  className="h-full bg-primary rounded-full"
                  style={{ boxShadow: "0 0 10px hsl(152 100% 50% / 0.5)" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
