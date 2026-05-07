import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Book, ShieldCheck, FileText, Info } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

const About = () => {
  const { t } = useTranslation();

  const sections = [
    {
      id: 'docs',
      title: t('footer.documentation'),
      icon: Book,
      content: t('about.docs_content')
    },
    {
      id: 'privacy',
      title: t('footer.privacy'),
      icon: ShieldCheck,
      content: t('about.privacy_content')
    },
    {
      id: 'terms',
      title: t('footer.terms'),
      icon: FileText,
      content: t('about.terms_content')
    }
  ];

  return (
    <div className="py-20 bg-muted/20 min-h-[calc(100vh-64px)]">
      <div className="container px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
            <Info className="w-4 h-4" />
            {t('nav.about')}
          </div>
          <h1 className="text-4xl font-bold mb-6">{t('app.name')}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t('app.tagline')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
          {sections.map((section, idx) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <section.icon className="w-8 h-8" />
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold">{section.title}</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
