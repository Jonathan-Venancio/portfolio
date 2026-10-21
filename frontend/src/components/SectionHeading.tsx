interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

const SectionHeading = ({ eyebrow, title, description, align = "left" }: SectionHeadingProps) => {
  const alignment = align === "center" ? "text-center mx-auto" : "";

  return (
    <div className={`mb-12 max-w-3xl ${alignment}`}>
      <p className="font-mono text-primary text-sm tracking-widest mb-2">{eyebrow}</p>
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">{title}</h2>
      {description ? <p className="text-muted-foreground font-body mt-3 leading-relaxed">{description}</p> : null}
    </div>
  );
};

export default SectionHeading;
