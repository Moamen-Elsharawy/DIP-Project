import { useTranslation } from 'react-i18next';
import { Settings2, CheckCircle2, Loader2 } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import type { ToolConfig } from '../../utils/toolConfig';

interface ToolSettingsProps {
  toolId: string;
  config: ToolConfig;
  params: Record<string, any>;
  setParams: (params: Record<string, any>) => void;
  onProcess: () => void;
  processing: boolean;
}

const ToolSettings = ({ toolId, config, params, setParams, onProcess, processing }: ToolSettingsProps) => {
  const { t } = useTranslation();

  return (
    <Card className="border-2 shadow-xl sticky top-24">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-8 text-xl font-bold border-b pb-4 text-primary">
          <Settings2 className="w-6 h-6" />
          {t('common.settings')}
        </div>
        
        <div className="space-y-10">
          <div className="space-y-3 p-4 rounded-2xl bg-muted/50">
             <h3 className="font-black text-2xl tracking-tight leading-none">{t(`tools.${toolId}.title`)}</h3>
             <p className="text-sm text-muted-foreground leading-relaxed">{t(`tools.${toolId}.desc`)}</p>
          </div>

          <div className="space-y-8">
            {config.params?.map((p) => {
              // Special condition for Noise tool: Sigma only for Gaussian
              if (toolId === 'noise' && p.name === 'sigma' && params.noise_type !== 'gaussian') {
                return null;
              }

              return (
                <div key={p.name} className="space-y-5">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{t(`params.${p.name}`)}</label>
                    <span className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded-full font-mono font-bold shadow-sm">{p.type === 'slider' ? params[p.name] : t(`options.${params[p.name]}`)}</span>
                  </div>
                  
                  {p.type === 'slider' ? (
                    <Slider
                      value={[params[p.name]]}
                      min={p.min}
                      max={p.max}
                      step={p.max! > 1 ? 1 : 0.01}
                      onValueChange={([val]) => setParams({...params, [p.name]: val})}
                      className="py-4"
                    />
                  ) : (
                    <div className="grid grid-cols-1 gap-2">
                      {p.options?.map((opt) => (
                        <Button
                          key={opt}
                          variant={params[p.name] === opt ? "default" : "outline"}
                          className={`justify-start text-sm h-11 capitalize transition-all ${params[p.name] === opt ? 'shadow-md shadow-primary/20 scale-[1.02]' : ''}`}
                          onClick={() => setParams({...params, [p.name]: opt})}
                        >
                          <CheckCircle2 className={`mr-2 w-4 h-4 transition-opacity ${params[p.name] === opt ? 'opacity-100' : 'opacity-0'}`} />
                          {t(`options.${opt}`)}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <Button onClick={onProcess} disabled={processing} className="w-full h-12 text-lg shadow-xl shadow-primary/20">
            {processing && <Loader2 className="mr-2 w-5 h-5 animate-spin" />}
            {t('common.update')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolSettings;
