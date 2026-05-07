import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Book } from 'lucide-react';

const Documentation = () => {
  const { t } = useTranslation();

  return (
    <div className="py-20 bg-muted/20 min-h-[calc(100vh-64px)]">
      <div className="container px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Book className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-bold">{t('footer.documentation')}</h1>
          </div>
          
          <div className="prose prose-blue dark:prose-invert max-w-none space-y-12 text-muted-foreground leading-relaxed">
            <section className="bg-card p-8 rounded-3xl border-2">
              <h2 className="text-3xl font-bold text-foreground mb-6">{t('about.getting_started')}</h2>
              <p className="text-lg">{t('about.docs_content')}</p>
            </section>
            
            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground px-4 border-l-4 border-primary">{t('docs.arithmetic')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: t('tools.average.title'), desc: t('tools.average.desc'), detail: t('docs.average_detail') },
                  { title: t('tools.subtract.title'), desc: t('tools.subtract.desc'), detail: t('docs.subtract_detail') },
                  { title: t('tools.shading.title'), desc: t('tools.shading.desc'), detail: t('docs.shading_detail') },
                  { title: t('tools.mask.title'), desc: t('tools.mask.desc'), detail: t('docs.mask_detail') }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-card border-2 hover:bg-muted/30 transition-colors">
                    <h3 className="font-bold text-lg text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm mb-3 text-primary/80 font-medium">{item.desc}</p>
                    <p className="text-sm leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground px-4 border-l-4 border-primary">{t('docs.enhancement')}</h2>
              <div className="grid grid-cols-1 gap-6">
                {[
                  { title: t('tools.normalize.title'), detail: t('docs.normalize_detail') },
                  { title: t('tools.smooth.title'), detail: t('docs.smooth_detail') },
                  { title: t('tools.sharpen.title'), detail: t('docs.sharpen_detail') },
                  { title: t('tools.contrast.title'), detail: t('docs.contrast_detail') },
                  { title: t('tools.edges.title'), detail: t('docs.edges_detail') },
                  { title: t('tools.morphology.title'), detail: t('docs.morphology_detail') }
                ].map((item, i) => (
                  <div key={i} className="p-8 rounded-3xl bg-card border-2 flex flex-col md:flex-row gap-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Documentation;
