const { AuthenticationClient, Scopes } = require('@aps_sdk/authentication');
const { OssClient, Region, PolicyKey } = require('@aps_sdk/oss');
const { ModelDerivativeClient, View, OutputType } = require('@aps_sdk/model-derivative');
const { APS_CLIENT_ID, APS_CLIENT_SECRET, APS_BUCKET } = require('../config.js');

const authenticationClient = new AuthenticationClient();
const ossClient = new OssClient();
const modelDerivativeClient = new ModelDerivativeClient();

const service = module.exports = {};

service.getInternalToken = async function() {
    // Corrigido: retorna o objeto inteiro, não só .access_token!
    return await authenticationClient.getTwoLeggedToken(APS_CLIENT_ID, APS_CLIENT_SECRET, [
        Scopes.DataRead,
        Scopes.DataCreate,
        Scopes.DataWrite,
        Scopes.BucketCreate,
        Scopes.BucketRead
    ]);
};

service.getViewerToken = async () => {
    return await authenticationClient.getTwoLeggedToken(APS_CLIENT_ID, APS_CLIENT_SECRET, [Scopes.ViewablesRead]);
};

service.ensureBucketExists = async (bucketKey) => {
    const { access_token } = await service.getInternalToken();
    try {
        await ossClient.getBucketDetails(bucketKey, { accessToken: access_token });
    } catch (err) {
        if (err.axiosError.response.status === 404) {
            await ossClient.createBucket(Region.Us, { bucketKey: bucketKey, policyKey: PolicyKey.Persistent }, { accessToken: access_token });
        } else {
            throw err;  
        }
    }
};

service.listObjects = async () => {
    await service.ensureBucketExists(APS_BUCKET);
    const { access_token } = await service.getInternalToken();
    let resp = await ossClient.getObjects(APS_BUCKET, { limit: 64, accessToken: access_token });
    let objects = resp.items;
    while (resp.next) {
        const startAt = new URL(resp.next).searchParams.get('startAt');
        resp = await ossClient.getObjects(APS_BUCKET, { limit: 64, startAt, accessToken: access_token });
        objects = objects.concat(resp.items);
    }
    return objects;
};

service.uploadObject = async (objectName, filePath) => {
    await service.ensureBucketExists(APS_BUCKET);
    const { access_token } = await service.getInternalToken();
    const obj = await ossClient.uploadObject(APS_BUCKET, objectName, filePath, { accessToken: access_token });
    return obj;
};

service.translateObject = async (urn, rootFilename) => {
    const { access_token } = await service.getInternalToken();
    const job = await modelDerivativeClient.startJob({
        input: {
            urn,
            compressedUrn: !!rootFilename,
            rootFilename
        },
        output: {
            formats: [{
                views: [View._2d, View._3d],
                type: OutputType.Svf2
            }]
        }
    }, { accessToken: access_token });
    return job.result;
};

service.getManifest = async (urn) => {
    const { access_token } = await service.getInternalToken();
    try {
        const manifest = await modelDerivativeClient.getManifest(urn, { accessToken: access_token });
        return manifest;
    } catch (err) {
        if (err.axiosError.response.status === 404) {
            return null;
        } else {
            throw err;
        }
    }
};

service.urnify = (id) => Buffer.from(id).toString('base64').replace(/=/g, '');
