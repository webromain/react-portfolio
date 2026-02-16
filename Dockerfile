# Stage 1: Build
FROM node:20-alpine as builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm ci

# Copier le code source
COPY . .

# Builder l'application
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Installer un serveur HTTP léger pour servir l'app React
RUN npm install -g serve

# Copier le build depuis le stage builder
COPY --from=builder /app/dist ./dist

# Exposer le port
EXPOSE 3000

# Démarrer le serveur
CMD ["serve", "-s", "dist", "-l", "3000"]
