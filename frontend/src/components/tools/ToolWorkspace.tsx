import { motion, AnimatePresence } from 'framer-motion';
import { Upload, RotateCcw, Download, Loader2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import PredictionResult from './PredictionResult';
import type { ToolConfig } from '../../utils/toolConfig';

interface ToolWorkspaceProps {
  files: File[];
  onDrop: (files: File[]) => void;
  getRootProps: any;
  getInputProps: any;
  isDragActive: boolean;
  processing: boolean;
  result: string | null;
  prediction: any;
  config: ToolConfig;
  onReset: () => void;
  onProcess: () => void;
  onDownload: () => void;
}

const ToolWorkspace = ({ 
  files, 
  getRootProps, 
  getInputProps, 
  isDragActive, 
  processing, 
  result, 
  prediction, 
  config, 
  onReset, 
  onProcess, 
  onDownload 
}: ToolWorkspaceProps) => {
  const { t } = useTranslation();

  return (
    <Card className="overflow-hidden border-2 shadow-lg">
      <CardContent className="p-0">
        <AnimatePresence mode="wait">
          {files.length === 0 ? (
            <div
              key="dropzone-container"
              {...getRootProps()}
              className={`aspect-video flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                isDragActive ? 'bg-primary/10 border-primary' : 'hover:bg-muted/50'
              }`}
            >
              <motion.div
                key="dropzone-content"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center p-12 text-center"
              >
                <input {...getInputProps()} />
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 shadow-inner">
                  <Upload className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{t('hero.upload')}</h3>
                <p className="text-muted-foreground max-w-xs">
                  {config.type === 'process_multi' ? t('tools.average.multi_desc') : t('common.supported_formats')}
                </p>
              </motion.div>
            </div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 md:p-8 space-y-8"
            >
              {config.type === 'prediction' ? (
                <PredictionResult 
                  prediction={prediction} 
                  processing={processing} 
                  file={files[0]} 
                  onProcess={onProcess} 
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase text-muted-foreground">{t('common.before')}</p>
                    <div className="aspect-square rounded-xl overflow-hidden bg-muted/30 flex items-center justify-center border shadow-inner">
                       <img src={URL.createObjectURL(files[0])} alt="Original" className="max-w-full max-h-full object-contain" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase text-muted-foreground">{t('common.after')}</p>
                    <div className="aspect-square rounded-xl overflow-hidden bg-black flex items-center justify-center border relative shadow-2xl">
                      {processing ? (
                        <div className="flex flex-col items-center gap-3">
                          <Loader2 className="w-12 h-12 text-primary animate-spin" />
                          <p className="text-sm font-medium animate-pulse">{t('common.processing')}</p>
                        </div>
                      ) : result ? (
                        <motion.img 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          src={result} 
                          alt="Processed" 
                          className="max-w-full max-h-full object-contain" 
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-muted-foreground/40">
                          <AlertCircle className="w-12 h-12" />
                          <p className="text-sm">{t('common.ready_transform')}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t">
                 <Button variant="ghost" onClick={onReset} disabled={processing} className="w-full sm:w-auto">
                    <RotateCcw className="mr-2 w-4 h-4" />
                    {t('common.reset')}
                 </Button>
                 <div className="flex gap-3 w-full sm:w-auto">
                    {result && (
                      <Button variant="secondary" onClick={onDownload} className="flex-1 sm:flex-none">
                        <Download className="mr-2 w-4 h-4" />
                        {t('common.download')}
                      </Button>
                    )}
                    {config.type !== 'prediction' && (
                      <Button onClick={onProcess} disabled={processing} className="flex-1 sm:flex-none shadow-lg shadow-primary/20">
                        {processing && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
                        {result ? t('common.apply_again') : t('common.process')}
                      </Button>
                    )}
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default ToolWorkspace;
