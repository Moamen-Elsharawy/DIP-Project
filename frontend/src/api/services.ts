import api from './axios';

export interface PredictionResponse {
  gender: string;
  confidence: number;
  class_index: number;
}

export const processService = {
  // AI Prediction
  predict: async (file: File): Promise<PredictionResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post<PredictionResponse>('/predict', formData);
    return response.data;
  },

  // Multi-Image Operations
  average: async (files: File[]): Promise<Blob> => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    const response = await api.post('/process/average', formData, { responseType: 'blob' });
    return response.data;
  },

  subtract: async (img1: File, img2: File): Promise<Blob> => {
    const formData = new FormData();
    formData.append('img1', img1);
    formData.append('img2', img2);
    const response = await api.post('/process/subtract', formData, { responseType: 'blob' });
    return response.data;
  },

  shadingCorrection: async (original: File, shading: File): Promise<Blob> => {
    const formData = new FormData();
    formData.append('original', original);
    formData.append('shading', shading);
    const response = await api.post('/process/shading-correction', formData, { responseType: 'blob' });
    return response.data;
  },

  mask: async (original: File, mask: File): Promise<Blob> => {
    const formData = new FormData();
    formData.append('original', original);
    formData.append('mask', mask);
    const response = await api.post('/process/mask', formData, { responseType: 'blob' });
    return response.data;
  },

  // Single Image Processing
  normalize: async (file: File): Promise<Blob> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/process/normalize', formData, { responseType: 'blob' });
    return response.data;
  },

  addNoise: async (file: File, type: string, amount: number, sigma: number): Promise<Blob> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`/process/add-noise?noise_type=${type}&amount=${amount}&sigma=${sigma}`, formData, { responseType: 'blob' });
    return response.data;
  },

  smooth: async (file: File, method: string, kernelSize: number): Promise<Blob> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`/process/smooth?method=${method}&kernel_size=${kernelSize}`, formData, { responseType: 'blob' });
    return response.data;
  },

  sharpen: async (file: File): Promise<Blob> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/process/sharpen', formData, { responseType: 'blob' });
    return response.data;
  },

  enhanceContrast: async (file: File, method: string): Promise<Blob> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`/process/enhance-contrast?method=${method}`, formData, { responseType: 'blob' });
    return response.data;
  },

  detectEdges: async (file: File, low: number, high: number): Promise<Blob> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`/process/detect-edges?low=${low}&high=${high}`, formData, { responseType: 'blob' });
    return response.data;
  },

  morphology: async (file: File, op: string, kernelSize: number): Promise<Blob> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`/process/morphology?op=${op}&kernel_size=${kernelSize}`, formData, { responseType: 'blob' });
    return response.data;
  },
};
