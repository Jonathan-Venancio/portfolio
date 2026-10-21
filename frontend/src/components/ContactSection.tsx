import { motion } from "framer-motion";
import { Mail, Code, ExternalLink, Terminal } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { profileCopy } from "@/content/site";
import { getApiUrl } from "@/lib/api";

interface Contact {
  id: string;
  label: string;
  url: string;
}

const fallbackContacts: Contact[] = [
  { id: "email", label: "Email", url: `mailto:${profileCopy.email}` },
  { id: "linkedin", label: "LinkedIn", url: profileCopy.linkedin },
  { id: "github", label: "GitHub", url: profileCopy.github },
];

const isUsableUrl = (url: string) => {
  if (!url || url === "#" || url.startsWith("#")) return false;
  if (url === "mailto:jonathan@email.com") return false;
  return true;
};

const iconFor = (label: string) => {
  const name = label.toLowerCase();
  if (name.includes("mail") || name.includes("email")) return Mail;
  if (name.includes("git")) return Code;
  if (name.includes("link")) return ExternalLink;
  return ExternalLink;
};

const ContactSection = () => {
  const [contacts, setContacts] = useState<Contact[]>(fallbackContacts);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(`${getApiUrl()}/contacts`);
        if (!response.ok) return;
        const data: { id: number; label: string; url: string; is_active?: boolean }[] = await response.json();
        const fromApi = data
          .filter((contact) => contact.is_active !== false)
          .map((contact) => {
            const fallback = fallbackContacts.find((item) => item.label.toLowerCase() === contact.label.toLowerCase());
            const url = isUsableUrl(contact.url) ? contact.url : fallback?.url || "";
            return { id: String(contact.id), label: contact.label, url };
          })
          .filter((contact) => isUsableUrl(contact.url));

        if (fromApi.length > 0) setContacts(fromApi);
      } catch (error) {
        console.error("Erro ao buscar contatos:", error);
      }
    };

    fetchContacts();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch(`${getApiUrl()}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim(), website }),
      });

      if (!response.ok) {
        setStatus("error");
        setFeedback("Não consegui enviar a mensagem. Confira os campos e tente de novo.");
        return;
      }

      setStatus("sent");
      setFeedback("Mensagem enviada. Respondo pelo email que você informou.");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setFeedback("Não consegui enviar a mensagem agora. Você pode escrever direto pelo email.");
    }
  };

  return (
    <section id="contato" className="py-24 px-4 scroll-mt-20">
      <div className="container max-w-3xl text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeading
            align="center"
            eyebrow="> contact --info"
            title="Vamos conversar sobre segurança?"
            description="Tem um projeto ou precisa compreender melhor a segurança de seus sistemas? Entre em contato para conversarmos sobre suas necessidades e avaliarmos um possível escopo de trabalho."
          />

          <form
            onSubmit={handleSubmit}
            className="text-left bg-card border border-border rounded-lg p-6 md:p-8 space-y-4"
          >
            <p className="font-mono text-primary text-sm">&gt; send --message</p>
            <div className="space-y-2">
              <Label htmlFor="contact-name">Nome</Label>
              <Input
                id="contact-name"
                name="name"
                autoComplete="name"
                required
                minLength={2}
                maxLength={120}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={200}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-message">Mensagem</Label>
              <Textarea
                id="contact-message"
                name="message"
                required
                minLength={10}
                maxLength={4000}
                rows={5}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Conte o que você precisa e, se já souber, o escopo do que quer conversar."
              />
            </div>
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="contact-website">Site</label>
              <input
                id="contact-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
              />
            </div>
            <div className="flex flex-col items-center gap-3">
              <Button type="submit" disabled={status === "sending"} className="font-mono">
                {status === "sending" ? "Enviando..." : "Enviar mensagem"}
              </Button>
              {feedback ? (
                <p className={`text-center text-sm ${status === "error" ? "text-destructive" : "text-primary"}`} role="status">
                  {feedback}{" "}
                  {status === "error" && feedback.includes("direto") ? (
                    <a className="underline" href={`mailto:${profileCopy.email}`}>
                      {profileCopy.email}
                    </a>
                  ) : null}
                </p>
              ) : null}
            </div>
          </form>

          <div className="mt-12 flex justify-center gap-6">
            {contacts.map((contact) => {
              const Icon = iconFor(contact.label);
              return (
                <a
                  key={contact.id}
                  href={contact.url}
                  target={contact.url.startsWith("http") ? "_blank" : undefined}
                  rel={contact.url.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <div className="p-4 rounded-lg bg-card border border-border group-hover:border-primary/50 transition-colors">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-mono">{contact.label}</span>
                </a>
              );
            })}
          </div>
        </motion.div>

        <div className="mt-24 pt-8 border-t border-border">
          <p className="text-muted-foreground text-xs font-mono flex items-center justify-center gap-2">
            <Terminal className="w-3 h-3" aria-hidden="true" />
            © 2026 Jonathan Venancio
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
