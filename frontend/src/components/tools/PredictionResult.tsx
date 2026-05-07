import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Settings2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';

interface PredictionResultProps {
  prediction: any;
  processing: boolean;
  file: File | null;
  onProcess: () => void;
}

const PredictionResult = ({ prediction, processing, file, onProcess }: PredictionResultProps) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t('tools.prediction.subject')}</p>
        <div className="aspect-square rounded-2xl overflow-hidden bg-black/5 flex items-center justify-center border-2 border-dashed">
          {file && <img src={URL.createObjectURL(file)} alt="Original" className="max-w-full max-h-full object-contain" />}
        </div>
      </div>
      <div className="space-y-6">
        <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10 min-h-[300px] flex flex-col items-center justify-center text-center">
          {processing ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-lg font-medium animate-pulse">{t('common.processing')}</p>
            </div>
          ) : prediction ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{t('tools.prediction.result_title')}</h4>
                <p className="text-5xl font-black text-primary">{prediction.gender}</p>
              </div>
              <div className="pt-4 border-t w-full">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{t('tools.prediction.confidence')}</span>
                  <span className="font-mono font-bold text-primary">{(prediction.confidence * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full h-2 bg-primary/10 rounded-full mt-2 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${prediction.confidence * 100}%` }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center gap-4 text-muted-foreground">
              <Settings2 className="w-12 h-12 opacity-20" />
              <p className="text-lg">{t('tools.prediction.ready')}</p>
              <Button onClick={onProcess}>{t('tools.prediction.start')}</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;
