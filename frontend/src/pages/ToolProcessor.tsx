import { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { TOOL_CONFIGS } from '../utils/toolConfig';
import { processService } from '../api/services';
import { toast } from 'sonner';

// Separated Components
import ToolWorkspace from '../components/tools/ToolWorkspace';
import ToolSettings from '../components/tools/ToolSettings';

const ToolProcessor = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const { t } = useTranslation();
  const config = TOOL_CONFIGS[toolId || ''];

  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<any>(null);
  const [params, setParams] = useState<Record<string, any>>(
    config?.params?.reduce((acc, p) => ({ ...acc, [p.name]: p.default }), {}) || {}
  );

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (config?.type === 'process_multi' || config?.type === 'process_pair') {
      setFiles(prev => {
        const newFiles = [...prev, ...acceptedFiles];
        return config.type === 'process_pair' ? newFiles.slice(0, 2) : newFiles;
      });
    } else {
      setFiles(acceptedFiles);
    }
    setResult(null);
    setPrediction(null);
  }, [config]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    multiple: config?.type === 'process_multi' || config?.type === 'process_pair',
    accept: { 'image/*': [] },
    noClick: files.length > 0, // Disable click to upload on the whole container once we have files
    noKeyboard: true
  });

  const handleProcess = async () => {
    if (files.length === 0) return;

    setProcessing(true);
    try {
      if (config.type === 'prediction') {
        const data = await processService.predict(files[0]);
        setPrediction(data);
        toast.success("Analysis Complete");
      } else {
        let blob: Blob;
        switch (config.id) {
          case 'average': blob = await processService.average(files); break;
          case 'subtract': blob = await processService.subtract(files[0], files[1]); break;
          case 'shading': blob = await processService.shadingCorrection(files[0], files[1]); break;
          case 'mask': blob = await processService.mask(files[0], files[1]); break;
          case 'normalize': blob = await processService.normalize(files[0]); break;
          case 'sharpen': blob = await processService.sharpen(files[0]); break;
          case 'noise': blob = await processService.addNoise(files[0], params.noise_type, params.amount, params.sigma); break;
          case 'smooth': blob = await processService.smooth(files[0], params.method, params.kernel_size); break;
          case 'contrast': blob = await processService.enhanceContrast(files[0], params.method); break;
          case 'edges': blob = await processService.detectEdges(files[0], params.low, params.high); break;
          case 'morphology': blob = await processService.morphology(files[0], params.op, params.kernel_size); break;
          default: throw new Error("Unknown tool");
        }
        setResult(URL.createObjectURL(blob));
        toast.success("Image Processed Successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Processing Failed. Check server connection.");
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.href = result;
    link.download = `processed_${toolId}.png`;
    link.click();
  };

  const handleReset = () => {
    setFiles([]);
    setResult(null);
    setPrediction(null);
    setParams(config?.params?.reduce((acc, p) => ({ ...acc, [p.name]: p.default }), {}) || {});
  };

  if (!config) return <div className="container py-20 text-center">Tool not found</div>;

  const hasParams = config.params && config.params.length > 0;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-muted/20 py-12">
      <div className="container px-4">
        <Button variant="ghost" asChild className="mb-8">
          <Link to="/tools">
            <ChevronLeft className="mr-2 w-4 h-4 rtl:rotate-180" />
            {t('nav.tools')}
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className={hasParams ? "lg:col-span-8 space-y-6" : "lg:col-span-8 lg:col-start-3 space-y-6"}>
            <ToolWorkspace 
              files={files}
              onDrop={onDrop}
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              isDragActive={isDragActive}
              onAddClick={open}
              processing={processing}
              result={result}
              prediction={prediction}
              config={config}
              onReset={handleReset}
              onProcess={handleProcess}
              onDownload={handleDownload}
            />
          </div>

          {hasParams && (
            <div className="lg:col-span-4 space-y-6">
              <ToolSettings 
                toolId={toolId!}
                config={config}
                params={params}
                setParams={setParams}
                onProcess={handleProcess}
                processing={processing}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolProcessor;
