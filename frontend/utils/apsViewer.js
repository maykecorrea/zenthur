// Utilitário para gerenciar o APS Viewer

export const openApsViewer = (equipmentId = null) => {
  console.log('🎯 Abrindo APS Viewer para equipamento:', equipmentId);
  
  // URL base do APS Viewer
  const config = useRuntimeConfig();
  let apsUrl = '/aps-viewer';
  
  // Se em desenvolvimento local, usar porta direta
  if (process.client && window.location.hostname === 'localhost') {
    apsUrl = 'http://localhost:8080';
  }
  
  // Se equipamento específico, passar como parâmetro
  if (equipmentId) {
    apsUrl += `?equipment=${equipmentId}`;
  }
  
  console.log('🌐 URL do APS Viewer:', apsUrl);
  
  // Abrir em nova janela
  window.open(apsUrl, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
};

export const getApsViewerUrl = (equipmentId = null) => {
  const config = useRuntimeConfig();
  let apsUrl = config.public.apsViewerUrl || '/aps-viewer';
  
  if (process.client && window.location.hostname === 'localhost') {
    apsUrl = 'http://localhost:8080';
  }
  
  if (equipmentId) {
    apsUrl += `?equipment=${equipmentId}`;
  }
  
  return apsUrl;
};
