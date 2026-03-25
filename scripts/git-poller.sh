#!/bin/sh
# =============================================================
# git-poller.sh
# Surveille le repo GitHub et rebuild le container si nouveau commit
# S'exécute dans un container Alpine avec accès au Docker socket
# =============================================================

REPO="${REPO:-webromain/react-portfolio}"
BRANCH="${BRANCH:-main}"
CONTAINER_NAME="${CONTAINER_NAME:-portfolio-app}"
INTERVAL="${INTERVAL:-300}"
SHA_FILE="/data/last_sha"
GITHUB_API="https://api.github.com/repos/${REPO}/commits/${BRANCH}"

# Installer curl si pas présent
if ! command -v curl > /dev/null 2>&1; then
    apk add --no-cache curl > /dev/null 2>&1
fi

echo "================================================="
echo " Git Poller démarré"
echo " Repo    : ${REPO}#${BRANCH}"
echo " Container : ${CONTAINER_NAME}"
echo " Intervalle: ${INTERVAL}s"
echo "================================================="

while true; do
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

    # Récupérer le SHA du dernier commit via l'API GitHub
    LATEST_SHA=$(curl -sf "https://api.github.com/repos/${REPO}/commits/${BRANCH}" \
        | grep '"sha"' | head -1 | sed 's/.*"sha": "\([^"]*\)".*/\1/')

    if [ -z "$LATEST_SHA" ]; then
        echo "[$TIMESTAMP] ⚠️  Impossible de contacter GitHub, nouvelle tentative dans ${INTERVAL}s"
        sleep "$INTERVAL"
        continue
    fi

    # Lire le dernier SHA déployé
    LAST_SHA=""
    if [ -f "$SHA_FILE" ]; then
        LAST_SHA=$(cat "$SHA_FILE")
    fi

    if [ "$LATEST_SHA" = "$LAST_SHA" ]; then
        echo "[$TIMESTAMP] ✅ Aucun changement (${LATEST_SHA:0:8})"
    else
        echo "[$TIMESTAMP] 🔄 Nouveau commit détecté !"
        echo "   Ancien  : ${LAST_SHA:0:8}"
        echo "   Nouveau : ${LATEST_SHA:0:8}"
        echo "[$TIMESTAMP] 🚀 Rebuild et redémarrage de ${CONTAINER_NAME}..."

        # Rebuild + restart du container via Docker
        docker stop "$CONTAINER_NAME" 2>/dev/null
        docker rm "$CONTAINER_NAME" 2>/dev/null
        docker build \
            "https://github.com/${REPO}.git#${BRANCH}" \
            -t "${CONTAINER_NAME}-image" && \
        docker run -d \
            --name "$CONTAINER_NAME" \
            --restart always \
            --network nginx-proxy \
            -e NODE_ENV=production \
            -e VIRTUAL_HOST=portfolio.romainpoisson.com \
            -e LETSENCRYPT_HOST=portfolio.romainpoisson.com \
            -e LETSENCRYPT_EMAIL=admin@romainpoisson.com \
            "${CONTAINER_NAME}-image"

        if [ $? -eq 0 ]; then
            echo "$LATEST_SHA" > "$SHA_FILE"
            echo "[$TIMESTAMP] ✅ Redéploiement réussi !"
        else
            echo "[$TIMESTAMP] ❌ Erreur lors du redéploiement"
        fi
    fi

    sleep "$INTERVAL"
done