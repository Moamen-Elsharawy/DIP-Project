import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className="py-20 bg-muted/20 min-h-[calc(100vh-64px)]">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-4xl font-bold mb-6">{t('nav.contact')}</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t('contact.subtitle')}
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Mail, label: t('contact.email'), value: "support@xrayvision.ai" },
                  { icon: Phone, label: t('contact.phone'), value: "+20 123 456 7890" },
                  { icon: MapPin, label: t('contact.location'), value: t('contact.address') }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                      <p className="font-semibold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="border-2 shadow-xl">
                <CardContent className="p-8 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t('contact.first_name')}</label>
                      <Input placeholder={t('contact.placeholder_name')} className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t('contact.last_name')}</label>
                      <Input placeholder={t('contact.placeholder_last')} className="h-12" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('contact.email_addr')}</label>
                    <Input type="email" placeholder={t('contact.placeholder_email')} className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('contact.message')}</label>
                    <Textarea 
                      placeholder={t('contact.placeholder_msg')} 
                      className="min-h-[150px] resize-none" 
                    />
                  </div>
                  <Button className="w-full h-12 text-lg shadow-lg shadow-primary/20">
                    <Send className="mr-2 w-5 h-5" />
                    {t('contact.send')}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
