import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import { 
  Zap, 
  Layers, 
  MinusSquare, 
  SunMedium, 
  Maximize, 
  Contrast, 
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ToolCard from '../components/tools/ToolCard';
import { motion } from 'framer-motion';

const Home = () => {
  const { t } = useTranslation();

  const mainTools = [
    { id: 'prediction', title: t('tools.prediction.title'), description: t('tools.prediction.desc'), icon: Zap, color: 'bg-blue-500' },
    { id: 'average', title: t('tools.average.title'), description: t('tools.average.desc'), icon: Layers, color: 'bg-indigo-500' },
    { id: 'subtract', title: t('tools.subtract.title'), description: t('tools.subtract.desc'), icon: MinusSquare, color: 'bg-purple-500' },
    { id: 'shading', title: t('tools.shading.title'), description: t('tools.shading.desc'), icon: SunMedium, color: 'bg-amber-500' },
    { id: 'normalize', title: t('tools.normalize.title'), description: t('tools.normalize.desc'), icon: Maximize, color: 'bg-emerald-500' },
    { id: 'contrast', title: t('tools.contrast.title'), description: t('tools.contrast.desc'), icon: Contrast, color: 'bg-cyan-500' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(59,130,246,0.1)_0%,transparent_100%)]"></div>
        <div className="container px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full px-8 text-lg" asChild>
                <a href="#tools-grid">
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 w-5 h-5 rtl:rotate-180" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 text-lg" asChild>
                <Link to="/tools">
                  {t('hero.cta2')}
                  <Layers className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Abstract Device Preview */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-16 relative max-w-4xl mx-auto"
          >
            <div className="aspect-[16/9] rounded-2xl border-8 border-muted shadow-2xl bg-card overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-muted/20">
                 <img src="/logo.png" alt="X-Ray Vision AI" className="w-32 h-32 text-primary/20 animate-pulse object-contain" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section id="tools-grid" className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('nav.tools')}</h2>
            <p className="text-muted-foreground">{t('app.tagline')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainTools.map((tool) => (
              <ToolCard key={tool.id} {...tool} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="ghost" className="text-primary font-semibold" asChild>
              <Link to="/tools">
                {t('home.view_all')}
                <ArrowRight className="ml-2 w-4 h-4 rtl:rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Highlight */}
      <section className="py-20">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t('home.why_title')}</h2>
              <div className="space-y-6">
                {[
                  { title: t('home.features.precision.title'), desc: t('home.features.precision.desc') },
                  { title: t('home.features.privacy.title'), desc: t('home.features.privacy.desc') },
                  { title: t('home.features.standard.title'), desc: t('home.features.standard.desc') }
                ].map((f, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{f.title}</h3>
                      <p className="text-sm text-muted-foreground">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-muted rounded-3xl p-8 aspect-square flex items-center justify-center">
                <img src="/logo.png" alt="X-Ray Vision AI" className="w-48 h-48 object-contain opacity-20" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
