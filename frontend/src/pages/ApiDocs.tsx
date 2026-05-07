import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Code2, Terminal, Info, Cpu, Layers, Image as ImageIcon } from 'lucide-react';
import { Card } from '../components/ui/card';

const ApiDocs = () => {
  const { t } = useTranslation();

  const apiBase = "http://localhost:8000";

  const categories = [
    {
      title: t('api.cat_ai'),
      icon: Cpu,
      endpoints: [
        { 
          path: "/predict", 
          method: "POST", 
          desc: t('api.predict_desc'), 
          input: "file (Single Image)", 
          output: "JSON { gender, confidence, class_index }" 
        }
      ]
    },
    {
      title: t('api.cat_arithmetic'),
      icon: Layers,
      endpoints: [
        { path: "/process/average", method: "POST", desc: t('api.average_desc'), input: "files[] (Multiple Images)", output: "Image (PNG)" },
        { path: "/process/subtract", method: "POST", desc: t('api.subtract_desc'), input: "img1, img2 (Files)", output: "Image (PNG)" },
        { path: "/process/shading-correction", method: "POST", desc: t('api.shading_desc'), input: "original, shading (Files)", output: "Image (PNG)" },
        { path: "/process/mask", method: "POST", desc: t('api.mask_desc'), input: "original, mask (Files)", output: "Image (PNG)" }
      ]
    },
    {
      title: t('api.cat_enhancement'),
      icon: ImageIcon,
      endpoints: [
        { path: "/process/normalize", method: "POST", desc: t('api.normalize_desc'), input: "file (File)", output: "Image (PNG)" },
        { path: "/process/add-noise", method: "POST", desc: t('api.noise_desc'), input: "file (File), noise_type, amount, sigma (Query)", output: "Image (PNG)" },
        { path: "/process/smooth", method: "POST", desc: t('api.smooth_desc'), input: "file (File), method, kernel_size (Query)", output: "Image (PNG)" },
        { path: "/process/sharpen", method: "POST", desc: t('api.sharpen_desc'), input: "file (File)", output: "Image (PNG)" },
        { path: "/process/enhance-contrast", method: "POST", desc: t('api.contrast_desc'), input: "file (File), method (Query)", output: "Image (PNG)" },
        { path: "/process/detect-edges", method: "POST", desc: t('api.edges_desc'), input: "file (File), low, high (Query)", output: "Image (PNG)" },
        { path: "/process/morphology", method: "POST", desc: t('api.morphology_desc'), input: "file (File), op, kernel_size (Query)", output: "Image (PNG)" }
      ]
    }
  ];

  return (
    <div className="py-20 bg-muted/20 min-h-[calc(100vh-64px)]">
      <div className="container px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Code2 className="w-6 h-6" />
                </div>
                <h1 className="text-4xl font-bold">{t('footer.api_ref')}</h1>
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl">
                {t('api.subtitle')}
              </p>
            </div>
            <div className="bg-card border-2 p-4 rounded-2xl flex items-center gap-3 shadow-sm">
              <Terminal className="w-5 h-5 text-primary" />
              <code className="text-sm font-bold text-primary">{apiBase}</code>
            </div>
          </div>

          <div className="space-y-12">
            {categories.map((cat, i) => (
              <motion.section 
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold">{cat.title}</h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {cat.endpoints.map((ep) => (
                    <Card key={ep.path} className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
                      <div className="flex flex-col md:flex-row">
                        <div className="p-6 md:w-1/3 bg-muted/30 border-r border-b md:border-b-0 space-y-2">
                           <div className="flex items-center gap-2">
                             <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-600 text-[10px] font-black tracking-widest">{ep.method}</span>
                             <code className="text-xs font-bold text-foreground">{ep.path}</code>
                           </div>
                           <p className="text-sm font-medium">{ep.desc}</p>
                        </div>
                        <div className="p-6 flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
                           <div className="space-y-1">
                             <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{t('api.input_params')}</span>
                             <p className="text-xs font-mono bg-black/5 p-2 rounded">{ep.input}</p>
                           </div>
                           <div className="space-y-1">
                             <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{t('api.response_body')}</span>
                             <p className="text-xs font-mono bg-black/5 p-2 rounded">{ep.output}</p>
                           </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.section>
            ))}

            <section className="bg-primary/5 border-2 border-primary/20 rounded-3xl p-8 flex gap-6 items-start">
              <Info className="w-8 h-8 text-primary shrink-0" />
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{t('api.notes_title')}</h3>
                <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                  <li>{t('api.note_1')}</li>
                  <li>{t('api.note_2')}</li>
                  <li>{t('api.note_3')}</li>
                </ul>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ApiDocs;
