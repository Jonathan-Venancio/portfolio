import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { profileCopy } from "@/content/site";

const AboutSection = () => {
  return (
    <section id="sobre" className="py-24 px-4 scroll-mt-20">
      <div className="container max-w-5xl">
        <SectionHeading eyebrow="> cat sobre.txt" title="Sobre mim" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-lg p-6 md:p-8"
        >
          {profileCopy.about.split("\n").map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-muted-foreground font-body leading-relaxed mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
