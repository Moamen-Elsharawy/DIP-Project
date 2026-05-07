import { useTranslation } from 'react-i18next';
import { 
  Zap, 
  Layers, 
  MinusSquare, 
  SunMedium, 
  Maximize, 
  Contrast, 
  Activity, 
  Scissors,
  CircleDot,
  BoxSelect,
  Waves,
  Eye
} from 'lucide-react';
import ToolCard from '@/components/tools/ToolCard';

const Tools = () => {
  const { t } = useTranslation();

  const allTools = [
    { 
      id: 'prediction', 
      title: t('tools.prediction.title'), 
      description: t('tools.prediction.desc'), 
      icon: Zap, 
      color: 'bg-blue-500' 
    },
    { 
      id: 'average', 
      title: t('tools.average.title'), 
      description: t('tools.average.desc'), 
      icon: Layers, 
      color: 'bg-indigo-500' 
    },
    { 
      id: 'subtract', 
      title: t('tools.subtract.title'), 
      description: t('tools.subtract.desc'), 
      icon: MinusSquare, 
      color: 'bg-purple-500' 
    },
    { 
      id: 'shading', 
      title: t('tools.shading.title'), 
      description: t('tools.shading.desc'), 
      icon: SunMedium, 
      color: 'bg-amber-500' 
    },
    { 
      id: 'mask', 
      title: t('tools.mask.title'), 
      description: t('tools.mask.desc'), 
      icon: BoxSelect, 
      color: 'bg-rose-500' 
    },
    { 
      id: 'normalize', 
      title: t('tools.normalize.title'), 
      description: t('tools.normalize.desc'), 
      icon: Maximize, 
      color: 'bg-emerald-500' 
    },
    { 
      id: 'noise', 
      title: t('tools.noise.title'), 
      description: t('tools.noise.desc'), 
      icon: Waves, 
      color: 'bg-slate-500' 
    },
    { 
      id: 'smooth', 
      title: t('tools.smooth.title'), 
      description: t('tools.smooth.desc'), 
      icon: Activity, 
      color: 'bg-teal-500' 
    },
    { 
      id: 'sharpen', 
      title: t('tools.sharpen.title'), 
      description: t('tools.sharpen.desc'), 
      icon: Scissors, 
      color: 'bg-orange-500' 
    },
    { 
      id: 'contrast', 
      title: t('tools.contrast.title'), 
      description: t('tools.contrast.desc'), 
      icon: Contrast, 
      color: 'bg-cyan-500' 
    },
    { 
      id: 'edges', 
      title: t('tools.edges.title'), 
      description: t('tools.edges.desc'), 
      icon: CircleDot, 
      color: 'bg-zinc-500' 
    },
    { 
      id: 'morphology', 
      title: t('tools.morphology.title'), 
      description: t('tools.morphology.desc'), 
      icon: Eye, 
      color: 'bg-fuchsia-500' 
    },
  ];

  return (
    <div className="py-20 bg-muted/20 min-h-[calc(100vh-64px)]">
      <div className="container px-4">
        <div className="max-w-2xl mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('nav.tools')}</h1>
          <p className="text-muted-foreground text-lg">
            {t('tools.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allTools.map((tool) => (
            <ToolCard key={tool.id} {...tool} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;
