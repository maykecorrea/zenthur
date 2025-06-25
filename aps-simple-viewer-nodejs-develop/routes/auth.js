const express = require('express');
const router = express.Router();
const { getInternalToken } = require('../services/aps.js');

router.get('/token', async function (req, res) {
    try {
        const internalToken = await getInternalToken();
        res.json({
            access_token: internalToken.access_token,
            expires_in: internalToken.expires_in
        });
    } catch (err) {
        console.error('Failed to get APS internal token:', err);
        res.status(500).json({ error: 'Failed to get internal token' });
    }
});

module.exports = router;
