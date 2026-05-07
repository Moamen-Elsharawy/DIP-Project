export type ToolType = 'prediction' | 'process_single' | 'process_multi' | 'process_pair';

export interface ToolConfig {
  id: string;
  type: ToolType;
  inputs: string[];
  params?: {
    name: string;
    type: 'select' | 'slider';
    options?: string[];
    min?: number;
    max?: number;
    default: any;
  }[];
}

export const TOOL_CONFIGS: Record<string, ToolConfig> = {
  prediction: {
    id: 'prediction',
    type: 'prediction',
    inputs: ['file'],
  },
  average: {
    id: 'average',
    type: 'process_multi',
    inputs: ['files'],
  },
  subtract: {
    id: 'subtract',
    type: 'process_pair',
    inputs: ['img1', 'img2'],
  },
  shading: {
    id: 'shading',
    type: 'process_pair',
    inputs: ['original', 'shading'],
  },
  mask: {
    id: 'mask',
    type: 'process_pair',
    inputs: ['original', 'mask'],
  },
  normalize: {
    id: 'normalize',
    type: 'process_single',
    inputs: ['file'],
  },
  noise: {
    id: 'noise',
    type: 'process_single',
    inputs: ['file'],
    params: [
      { name: 'noise_type', type: 'select', options: ['gaussian', 'salt_and_pepper', 'speckle'], default: 'gaussian' },
      { name: 'amount', type: 'slider', min: 0, max: 1, default: 0.05 },
      { name: 'sigma', type: 'slider', min: 0, max: 100, default: 25 },
    ],
  },
  smooth: {
    id: 'smooth',
    type: 'process_single',
    inputs: ['file'],
    params: [
      { name: 'method', type: 'select', options: ['gaussian', 'median', 'bilateral'], default: 'gaussian' },
      { name: 'kernel_size', type: 'slider', min: 3, max: 25, default: 5 },
    ],
  },
  sharpen: {
    id: 'sharpen',
    type: 'process_single',
    inputs: ['file'],
  },
  contrast: {
    id: 'contrast',
    type: 'process_single',
    inputs: ['file'],
    params: [
      { name: 'method', type: 'select', options: ['clahe', 'equalize'], default: 'clahe' },
    ],
  },
  edges: {
    id: 'edges',
    type: 'process_single',
    inputs: ['file'],
    params: [
      { name: 'low', type: 'slider', min: 0, max: 255, default: 50 },
      { name: 'high', type: 'slider', min: 0, max: 255, default: 150 },
    ],
  },
  morphology: {
    id: 'morphology',
    type: 'process_single',
    inputs: ['file'],
    params: [
      { name: 'op', type: 'select', options: ['dilation', 'erosion', 'opening', 'closing'], default: 'dilation' },
      { name: 'kernel_size', type: 'slider', min: 3, max: 25, default: 3 },
    ],
  },
};
