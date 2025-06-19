import axios from 'axios';

// Cliente para gerenciar modelos 3D sem dependência do Supabase
export const modelos3dClient = {
  async getModelos() {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await axios.get('http://localhost:3001/api/modelos3d', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },
  
  async uploadModel(file, metadata) {
    try {
      const token = localStorage.getItem('auth_token');
      const formData = new FormData();
      formData.append('file', file);
      formData.append('metadata', JSON.stringify(metadata));
      
      const response = await axios.post('http://localhost:3001/api/modelos3d/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },
  
  async deleteModel(modelId) {
    try {
      const token = localStorage.getItem('auth_token');
      await axios.delete(`http://localhost:3001/api/modelos3d/${modelId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  }
};