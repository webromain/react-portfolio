const express = require('express');
const axios = require('axios');
const crypto = require('crypto');

const app = express();

// Capturer le body brut pour la vérification de signature
app.use(express.json({
    verify: (req, _res, buf) => {
        req.rawBody = buf;
    }
}));

// Configuration - Utiliser des variables d'environnement (JAMAIS en dur)
const PORTAINER_URL = process.env.PORTAINER_URL;
const PORTAINER_TOKEN = process.env.PORTAINER_TOKEN;
const STACK_ID = process.env.STACK_ID;
const GITHUB_WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET;

// Vérifier que les variables d'environnement sont définies
if (!PORTAINER_URL || !PORTAINER_TOKEN || !STACK_ID || !GITHUB_WEBHOOK_SECRET) {
    console.error('❌ Variables d\'environnement manquantes: PORTAINER_URL, PORTAINER_TOKEN, STACK_ID, GITHUB_WEBHOOK_SECRET');
    process.exit(1);
}

// Vérifier la signature du webhook GitHub
function verifyGitHubSignature(req) {
    const signature = req.headers['x-hub-signature-256'];
    if (!signature) return false;

    const hmac = crypto.createHmac('sha256', GITHUB_WEBHOOK_SECRET);
    const digest = 'sha256=' + hmac.update(req.rawBody).digest('hex');

    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

// Fonction pour redéployer la stack
async function redeployStack() {
    try {
        console.log('🔄 Début du redéploiement...');
        
        // Récupérer les détails de la stack
        const stackResponse = await axios.get(
            `${PORTAINER_URL}/api/stacks/${STACK_ID}`,
            {
                headers: {
                    'X-API-Key': PORTAINER_TOKEN
                }
            }
        );

        // Redéployer la stack en utilisant Git
        await axios.put(
            `${PORTAINER_URL}/api/stacks/${STACK_ID}/git/redeploy`,
            {},
            {
                headers: {
                    'X-API-Key': PORTAINER_TOKEN
                }
            }
        );

        console.log('✅ Redéploiement réussi!');
        return true;
    } catch (error) {
        console.error('❌ Erreur lors du redéploiement:', error.message);
        return false;
    }
}

// Endpoint webhook pour GitHub
app.post('/webhook/github', async (req, res) => {
    // Vérifier la signature GitHub (OBLIGATOIRE)
    if (!verifyGitHubSignature(req)) {
        console.warn('⚠️ Signature webhook invalide — requête rejetée');
        return res.status(401).json({ message: 'Invalid signature' });
    }

    const payload = req.body;
    
    // Vérifier que c'est un push sur main
    if (payload.ref === 'refs/heads/main') {
        console.log('📨 Push détecté sur main, redéploiement...');
        
        const success = await redeployStack();
        
        if (success) {
            res.status(200).json({ message: 'Deployment started' });
        } else {
            res.status(500).json({ message: 'Deployment failed' });
        }
    } else {
        console.log(`📨 Push ignoré sur ${payload.ref}`);
        res.status(200).json({ message: 'Push ignored - not main branch' });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'Portfolio Webhook' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Webhook server running on port ${PORT}`);
});