import { motion } from "framer-motion";
import { Shield, ChevronDown } from "lucide-react";
import profileImg from "@/assets/profile.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline pointer-events-none z-10" />
      
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(152 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(152 100% 50%) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="container relative z-20 flex flex-col items-center gap-8 text-center px-4 pb-24">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-primary neon-border">
            <img src={profileImg} alt="Jonathan Venancio" className="w-full h-full object-cover" width={512} height={512} />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <p className="font-mono text-primary text-sm tracking-widest uppercase">
            &gt; whoami
          </p>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground">
            Jonathan <span className="text-primary neon-text">Venancio</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto font-body">
            Analista de Segurança da Informação
          </p>
          <div className="flex items-center justify-center gap-2 font-mono text-sm text-muted-foreground">
            <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse-neon" />
            Protegendo sistemas, analisando vulnerabilidades
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-4 md:bottom-6"
        >
          <ChevronDown className="w-6 h-6 text-primary animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
