// hooks/usePipeline.js
import { useContext } from 'react';
import { PipelineContext } from '../context/PipelineContext';

export const usePipeline = () => {
  const context = useContext(PipelineContext);
  if (!context) {
    throw new Error('usePipeline must be used within a PipelineProvider');
  }
  return context;
};