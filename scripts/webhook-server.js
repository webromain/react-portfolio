const express = require('express');
const axios = require('axios');
const crypto = require('crypto');

const app = express();
app.use(express.json());

// Configuration - À adapter avec vos vraies valeurs
const PORTAINER_URL = 'https://votre-portainer.com';
const PORTAINER_TOKEN = 'votre-token-api-portainer';
const STACK_ID = 'votre-stack-id'; // ID de votre stack webportfolio
const GITHUB_WEBHOOK_SECRET = 'votre-secret-optionnel';

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