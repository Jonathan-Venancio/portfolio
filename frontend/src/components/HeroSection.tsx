import { motion } from "framer-motion";
import { Shield, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import profileImg from "@/assets/profile.png";
import { Button } from "@/components/ui/button";
import { profileCopy } from "@/content/site";
import { getApiUrl, resolveProfileImage } from "@/lib/api";

interface Profile {
  name: string;
  profile_image?: string | null;
}

const HeroSection = () => {
  const [profile, setProfile] = useState<Profile>({ name: profileCopy.name });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${getApiUrl()}/profile`);
        if (response.ok) {
          const data = await response.json();
          setProfile({
            name: data.name || profileCopy.name,
            profile_image: data.profile_image,
          });
        }
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const name = profile.name || profileCopy.name;
  const parts = name.trim().split(/\s+/);
  const firstName = parts[0];
  const lastName = parts.slice(1).join(" ");
  const profileImageUrl = resolveProfileImage(profile.profile_image, profileImg);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 scanline pointer-events-none z-10" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(152 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(152 100% 50%) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-20 flex flex-col items-center gap-8 text-center px-4 pt-24 pb-24">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-primary neon-border">
            <img
              src={profileImageUrl}
              alt={loading ? profileCopy.name : name}
              className="w-full h-full object-cover"
              width={512}
              height={512}
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2">
            <Shield className="w-5 h-5 text-primary-foreground" aria-hidden="true" />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4 max-w-3xl"
        >
          <p className="font-mono text-primary text-sm tracking-widest uppercase">&gt; whoami</p>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground">
            {firstName} {lastName ? <span className="text-primary neon-text">{lastName}</span> : null}
          </h1>
          <p className="text-base md:text-lg text-primary font-mono">{profileCopy.title}</p>
          <p className="text-xl md:text-2xl text-foreground font-heading leading-snug">{profileCopy.headline}</p>
          <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed">{profileCopy.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 w-full sm:w-auto"
        >
          <Button asChild size="lg">
            <a href="#servicos">Explorar serviços</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#projetos">Ver projetos</a>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a href="#contato">Entrar em contato</a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-4 md:bottom-6"
        >
          <a href="#sobre" className="text-primary" aria-label="Ir para a seção sobre">
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
