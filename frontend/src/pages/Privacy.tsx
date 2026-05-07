import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const Privacy = () => {
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
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-bold">{t('footer.privacy')}</h1>
          </div>
          
          <div className="bg-card p-8 md:p-12 rounded-3xl border-2 space-y-8 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t('about.data_protection')}</h2>
              <p>{t('about.privacy_content')}</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t('about.how_we_use')}</h2>
              <p>{t('about.how_we_use_desc')}</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
