const express = require('express');
const ForgeSDK = require('forge-apis');
const axios = require('axios');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Cache para token
let tokenCache = {
  token: null,
  expiresAt: null
};

console.log('🚀 [Forge Routes] Inicializando...');

// ⭐ FUNÇÃO PARA OBTER TOKEN FORGE VIA SDK (PRINCIPAL)
async function getForgeToken() {
  try {
    // Verificar se token ainda é válido
    if (tokenCache.token && tokenCache.expiresAt && Date.now() < tokenCache.expiresAt) {
      console.log('✅ [getForgeToken] Usando token em cache');
      return {
        access_token: tokenCache.token,
        expires_in: Math.floor((tokenCache.expiresAt - Date.now()) / 1000),
        token_type: 'Bearer'
      };
    }
    
    console.log('🔄 [getForgeToken] Obtendo novo token...');
    
    if (!process.env.FORGE_CLIENT_ID || !process.env.FORGE_CLIENT_SECRET) {
      throw new Error('Credenciais Forge não configuradas no .env');
    }
    
    // ⭐ USAR SDK OFICIAL
    const authClientTwoLegged = new ForgeSDK.AuthClientTwoLegged(
      process.env.FORGE_CLIENT_ID,
      process.env.FORGE_CLIENT_SECRET,
      ['data:read', 'data:write', 'data:create', 'bucket:create', 'bucket:read', 'bucket:update', 'bucket:delete', 'viewables:read'],
      true
    );
    
    const credentials = await authClientTwoLegged.authenticate();
    
    // Atualizar cache
    tokenCache.token = credentials.access_token;
    tokenCache.expiresAt = Date.now() + (credentials.expires_in * 1000) - 60000; // -1 min margem
    
    console.log(`✅ [getForgeToken] Token obtido via SDK, expira em ${credentials.expires_in} segundos`);
    
    return {
      access_token: credentials.access_token,
      expires_in: credentials.expires_in,
      token_type: 'Bearer'
    };
    
  } catch (error) {
    console.error('❌ [getForgeToken] Erro no SDK:', error.response?.data || error.message);
    
    // ⭐ FALLBACK PARA REST API
    console.warn('🔄 [getForgeToken] Tentando via REST API...');
    return await getForgeTokenREST();
  }
}

// ⭐ CORRIGIR FUNÇÃO getForgeTokenREST

const getForgeTokenREST = async () => {
  try {
    console.log(`📡 [getForgeTokenREST] Client ID: ${process.env.FORGE_CLIENT_ID?.substring(0, 10)}...`);
    
    // ⭐ URL CORRETA CONFORME DOCUMENTAÇÃO OFICIAL
    const tokenUrl = 'https://developer.api.autodesk.com/authentication/v2/token';
    
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: new URLSearchParams({
        'grant_type': 'client_credentials',
        'client_id': process.env.FORGE_CLIENT_ID,
        'client_secret': process.env.FORGE_CLIENT_SECRET,
        'scope': 'data:read data:write data:create bucket:create bucket:read'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [getForgeTokenREST] Erro detalhado:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        url: tokenUrl,
        clientIdPrefix: process.env.FORGE_CLIENT_ID?.substring(0, 10)
      });
      throw new Error(`Token request failed: ${response.status} - ${errorText}`);
    }

    const tokenData = await response.json();
    console.log('✅ [getForgeTokenREST] Token obtido, expira em:', tokenData.expires_in, 'segundos');
    
    return tokenData.access_token;
    
  } catch (error) {
    console.error('❌ [getForgeTokenREST] Erro:', error.message);
    throw error;
  }
};

// ⭐ ROTA PARA OBTER TOKEN (frontend) - SEM AUTH para viewer público
router.get('/token', async (req, res) => {
  try {
    console.log('📞 [GET /token] Token solicitado para viewer');
    
    const tokenData = await getForgeToken();
    
    console.log('✅ [GET /token] Token fornecido:', tokenData.access_token.substring(0, 20) + '...');
    
    res.json({
      success: true,
      data: {
        access_token: tokenData.access_token,
        expires_in: tokenData.expires_in,
        token_type: tokenData.token_type
      }
    });
    
  } catch (error) {
    console.error('❌ [GET /token] Erro:', error.message);
    
    // ⭐ RETORNAR TOKEN MOCK PARA DESENVOLVIMENTO
    console.warn('🔄 [GET /token] Retornando token mock para desenvolvimento');
    res.json({
      success: true,
      data: {
        access_token: 'mock_viewer_token_for_development',
        expires_in: 3600,
        token_type: 'Bearer',
        isMock: true
      }
    });
  }
});

// ⭐ ROTA DE CONFIGURAÇÃO (COM AUTH)
router.get('/config', authMiddleware, async (req, res) => {
  try {
    console.log('📞 [GET /config] Configuração Forge solicitada');
    
    res.json({
      success: true,
      forge: {
        clientIdConfigured: !!process.env.FORGE_CLIENT_ID,
        clientSecretConfigured: !!process.env.FORGE_CLIENT_SECRET,
        clientIdPreview: process.env.FORGE_CLIENT_ID ? 
          process.env.FORGE_CLIENT_ID.substring(0, 10) + '...' : 'NÃO CONFIGURADO',
        environment: process.env.NODE_ENV || 'development',
        scopes: [
          'viewables:read',
          'data:read', 
          'data:write', 
          'data:create', 
          'bucket:create', 
          'bucket:read',
          'bucket:update',
          'bucket:delete'
        ]
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ [GET /config] Erro:', error.message);
    res.status(500).json({
      success: false,
      error: 'Erro ao obter configuração',
      details: error.message
    });
  }
});

// ⭐ EXPORTAR FUNÇÃO getForgeToken PARA USO EM OUTROS MÓDULOS
router.getForgeTokenREST = getForgeTokenREST;

// ⭐ CORRIGIR FUNÇÃO ensureBucketREST

const ensureBucketREST = async (bucketKey, accessToken) => {
  try {
    console.log(`🪣 [ensureBucketREST] Verificando bucket: ${bucketKey}`);
    
    // ⭐ VERIFICAR SE BUCKET EXISTE
    const checkUrl = `https://developer.api.autodesk.com/oss/v2/buckets/${bucketKey}/details`;
    const checkResponse = await fetch(checkUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (checkResponse.ok) {
      console.log(`✅ [ensureBucketREST] Bucket ${bucketKey} já existe`);
      return { bucketKey };
    }

    // ⭐ CRIAR BUCKET COM CONFIGURAÇÕES CORRETAS
    console.log(`🆕 [ensureBucketREST] Criando bucket: ${bucketKey}`);
    
    const createUrl = 'https://developer.api.autodesk.com/oss/v2/buckets';
    const bucketData = {
      bucketKey: bucketKey,
      // ⭐ USAR POLICY CORRETA
      policyKey: 'temporary', // ou 'transient' ou 'persistent'
      allow: [
        {
          authId: process.env.FORGE_CLIENT_ID,
          access: 'full'
        }
      ]
    };

    const createResponse = await fetch(createUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bucketData)
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      console.error(`❌ [ensureBucketREST] Erro ao criar bucket:`, errorText);
      throw new Error(`Bucket creation failed: ${createResponse.status} - ${errorText}`);
    }

    const bucketInfo = await createResponse.json();
    console.log(`✅ [ensureBucketREST] Bucket ${bucketKey} criado com sucesso`);
    
    return bucketInfo;
    
  } catch (error) {
    console.error(`❌ [ensureBucketREST] Erro:`, error.message);
    throw error;
  }
};

// ⭐ FUNÇÃO DE UPLOAD PARA OSS
const uploadToOSS = async (bucketKey, objectKey, fileBuffer, accessToken) => {
  try {
    console.log(`📤 [uploadToOSS] Fazendo upload: ${objectKey}`);
    
    // ⭐ GARANTIR QUE BUCKET EXISTE
    await ensureBucketREST(bucketKey, accessToken);
    
    // ⭐ UPLOAD COM HEADERS CORRETOS (CONFORME DOCUMENTAÇÃO)
    const uploadUrl = `https://developer.api.autodesk.com/oss/v2/buckets/${bucketKey}/objects/${objectKey}`;
    
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/octet-stream',
        'Content-Length': fileBuffer.length.toString() // ⭐ HEADER OBRIGATÓRIO
      },
      body: fileBuffer
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed: ${response.status} - ${errorText}`);
    }

    const uploadResult = await response.json();
    console.log(`✅ [uploadToOSS] Upload bem-sucedido: ${uploadResult.objectId}`);
    
    return uploadResult;
    
  } catch (error) {
    console.error(`❌ [uploadToOSS] Erro:`, error.message);
    throw error;
  }
};

// ⭐ FUNÇÃO PARA INICIAR TRADUÇÃO SVF2
const startTranslationJob = async (objectId, accessToken) => {
  try {
    console.log(`🔄 [startTranslationJob] Iniciando tradução: ${objectId}`);
    
    // ⭐ ENCODE URN CORRETO
    const urn = Buffer.from(objectId).toString('base64').replace(/=/g, '');
    
    // ⭐ JOB CONFORME DOCUMENTAÇÃO
    const translationJob = {
      input: {
        urn: urn,
        compressedUrn: false,
        rootFilename: ""
      },
      output: {
        destination: { region: "us" },
        formats: [{ type: "svf2", views: ["2d", "3d"] }]
      }
    };
    
    const response = await fetch('https://developer.api.autodesk.com/modelderivative/v2/designdata/job', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(translationJob)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Translation failed: ${response.status} - ${errorText}`);
    }
    
    const result = await response.json();
    console.log(`✅ [startTranslationJob] Job criado: ${result.result}`);
    
    return { urn: urn, status: result.result };
    
  } catch (error) {
    console.error(`❌ [startTranslationJob] Erro:`, error.message);
    throw error;
  }
};

// ⭐ FUNÇÃO PARA VERIFICAR STATUS DA TRADUÇÃO
const getTranslationStatus = async (urn, accessToken) => {
  try {
    const response = await fetch(`https://developer.api.autodesk.com/modelderivative/v2/designdata/${urn}/manifest`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Status check failed: ${response.status}`);
    }
    
    const manifest = await response.json();
    
    return {
      status: manifest.status,
      progress: manifest.progress || '0%'
    };
    
  } catch (error) {
    console.error(`❌ [getTranslationStatus] Erro:`, error.message);
    throw error;
  }
};

// ⭐ FUNÇÃO PARA CRIAR BUCKET SE NÃO EXISTIR CONFORME DOCUMENTAÇÃO OSS
async function createBucketIfNotExists(bucketData, accessToken) {
  try {
    console.log(`🪣 [createBucketIfNotExists] Verificando: ${bucketData.bucketKey}`);
    
    // ✅ VERIFICAR SE BUCKET EXISTE
    const checkUrl = `https://developer.api.autodesk.com/oss/v2/buckets/${bucketData.bucketKey}/details`;
    const checkResponse = await fetch(checkUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (checkResponse.ok) {
      const bucketInfo = await checkResponse.json();
      console.log(`✅ [createBucketIfNotExists] Bucket existe: ${bucketData.bucketKey}`);
      return bucketInfo;
    }

    // ✅ CRIAR BUCKET CONFORME DOCUMENTAÇÃO OSS
    console.log(`🆕 [createBucketIfNotExists] Criando: ${bucketData.bucketKey}`);
    
    const createUrl = 'https://developer.api.autodesk.com/oss/v2/buckets';
    
    const bucketPayload = {
      bucketKey: bucketData.bucketKey,
      policyKey: bucketData.policyKey || 'temporary' // ⭐ DEFAULT POLICY
    };

    console.log(`🪣 [createBucketIfNotExists] Payload:`, bucketPayload);

    const createResponse = await fetch(createUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bucketPayload)
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      console.error(`❌ [createBucketIfNotExists] Erro ao criar:`, {
        status: createResponse.status,
        error: errorText,
        bucketKey: bucketData.bucketKey
      });
      
      // ⭐ VERIFICAR SE ERRO É POR BUCKET JÁ EXISTIR
      if (createResponse.status === 409) {
        console.warn(`⚠️ [createBucketIfNotExists] Bucket já existe: ${bucketData.bucketKey}`);
        // Tentar buscar novamente
        const retryResponse = await fetch(checkUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (retryResponse.ok) {
          return await retryResponse.json();
        }
      }
      
      throw new Error(`Bucket creation failed: ${createResponse.status} - ${errorText}`);
    }

    const bucketInfo = await createResponse.json();
    console.log(`✅ [createBucketIfNotExists] Bucket criado: ${bucketData.bucketKey}`);
    
    return bucketInfo;
    
  } catch (error) {
    console.error(`❌ [createBucketIfNotExists] Erro:`, error.message);
    throw error;
  }
}

// ⭐ EXPORTAR A FUNÇÃO
router.createBucketIfNotExists = createBucketIfNotExists;

// ⭐ VALIDAR CREDENCIAIS NO STARTUP
const validateForgeCredentials = () => {
  const clientId = process.env.FORGE_CLIENT_ID;
  const clientSecret = process.env.FORGE_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    console.error('❌ [Forge] Credenciais não configuradas!');
    console.error('   CLIENT_ID:', clientId ? 'Configurado' : 'FALTANDO');
    console.error('   CLIENT_SECRET:', clientSecret ? 'Configurado' : 'FALTANDO');
    return false;
  }
  
  if (clientId.length < 10 || clientSecret.length < 10) {
    console.error('❌ [Forge] Credenciais muito curtas - podem estar incorretas');
    console.error('   CLIENT_ID length:', clientId.length);
    console.error('   CLIENT_SECRET length:', clientSecret.length);
    return false;
  }
  
  console.log('✅ [Forge] Credenciais validadas');
  console.log('   CLIENT_ID:', clientId.substring(0, 10) + '...');
  console.log('   CLIENT_SECRET:', clientSecret.substring(0, 10) + '...');
  return true;
};

// ⭐ CHAMAR VALIDAÇÃO AO CARREGAR
validateForgeCredentials();

// ⭐ EXPORTAR FUNÇÕES PARA MODELS3D
router.uploadToOSS = uploadToOSS;
router.startTranslationJob = startTranslationJob;
router.getTranslationStatus = getTranslationStatus;
router.ensureBucketREST = ensureBucketREST;
router.createBucketIfNotExists = createBucketIfNotExists;

console.log('✅ [Forge Routes] Configurado com SDK + REST fallback');
module.exports = router;