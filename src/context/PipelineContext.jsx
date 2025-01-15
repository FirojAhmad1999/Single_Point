// context/PipelineContext.jsx
import { createContext, useState, useEffect } from 'react';

// Create and export the context
export const PipelineContext = createContext();

export const PipelineProvider = ({ children }) => {
  const [pipelines, setPipelines] = useState({
    quote: [],
    book: [],
    execute: [],
    postFlight: []
  });

  const fetchPipelines = async () => {
    // Simulate API call
    // Replace with actual API call
    const response = await fetch('/api/pipelines');
    const data = await response.json();
    setPipelines(data);
  };

  const addPipeline = async (pipelineData) => {
    // Implement add pipeline logic
  };

  const updatePipeline = async (id, status, data) => {
    // Implement update pipeline logic
  };

  useEffect(() => {
    fetchPipelines();
  }, []);

  return (
    <PipelineContext.Provider value={{ pipelines, addPipeline, updatePipeline }}>
      {children}
    </PipelineContext.Provider>
  );
};