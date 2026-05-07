import { useTranslation } from 'react-i18next';
import { Globe, Mail, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
              <img src="/logo.png" alt="X-Ray Vision AI" className="w-10 h-10 object-contain" />
              <span>{t('app.name')}</span>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              {t('app.tagline')}
            </p>
            <div className="flex gap-4 pt-4">
              <Globe className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Mail className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Info className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{t('nav.tools')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/tools/prediction" className="hover:text-primary transition-colors">{t('tools.prediction.title')}</Link></li>
              <li><Link to="/tools/average" className="hover:text-primary transition-colors">{t('tools.average.title')}</Link></li>
              <li><Link to="/tools/subtract" className="hover:text-primary transition-colors">{t('tools.subtract.title')}</Link></li>
              <li><Link to="/tools/edges" className="hover:text-primary transition-colors">{t('tools.edges.title')}</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{t('footer.support')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/documentation" className="hover:text-primary transition-colors">{t('footer.documentation')}</Link></li>
              <li><Link to="/api-docs" className="hover:text-primary transition-colors">{t('footer.api_ref')}</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">{t('footer.privacy')}</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">{t('footer.terms')}</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">{t('footer.about')}</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">{t('footer.contact')}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {year} {t('app.name')}. {t('footer.rights')}</p>
          <p>{t('footer.made_with')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
