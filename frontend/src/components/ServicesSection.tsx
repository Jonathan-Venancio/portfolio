import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { serviceStatusLabel, services } from "@/content/site";

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-24 px-4 scroll-mt-20">
      <div className="container max-w-5xl">
        <SectionHeading
          eyebrow="> ls servicos/"
          title="Como posso ajudar seu negócio?"
          description="Estas frentes descrevem o tipo de apoio que pretendo oferecer a pequenos negócios. Nenhuma delas é um serviço profissional já prestado. O status de cada card pode ser ajustado quando houver prática suficiente para publicá-lo. Qualquer teste depende de autorização e de um escopo definido. Nenhum trabalho promete deixar um sistema completamente seguro."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border rounded-lg p-6 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-heading text-lg text-foreground">{service.title}</h3>
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-wide text-primary border border-primary/30 rounded-full px-2 py-1">
                  {serviceStatusLabel[service.status]}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              {service.note ? <p className="text-sm text-foreground/80 leading-relaxed">{service.note}</p> : null}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
