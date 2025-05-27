# Dockerfile para Cart Service
FROM node:23-alpine

# Definir ARGs para variables de entorno
ARG JWT_SECRET="super-secret-key"

ARG DATABASE_HOST="localhost"
ARG DATABASE_USER="root"
ARG DATABASE_PASSWORD="devroot264"
ARG DATABASE_NAME="micro_service"

ARG MAIL_HOST="localhost"
ARG MAIL_PORT="1025"
ARG MAIL_USER="user@example.com"
ARG MAIL_PASSWORD="password"

ARG USER_SERVICE="localhost"
ARG PRODUCT_SERVICE="localhost"
ARG CART_SERVICE="localhost"
ARG ORDER_SERVICE="localhost"

# Establecer ENV a partir del ARG
ENV JWT_SECRET=${JWT_SECRET}

ENV DATABASE_NAME=${DATABASE_NAME}
ENV DATABASE_USER=${DATABASE_USER}
ENV DATABASE_PASSWORD=${DATABASE_PASSWORD}
ENV DATABASE_HOST=${DATABASE_HOST}

ENV MAIL_HOST=${MAIL_HOST}
ENV MAIL_PORT=${MAIL_PORT}
ENV MAIL_USER=${MAIL_USER}
ENV MAIL_PASSWORD=${MAIL_PASSWORD}

ENV USER_SERVICE=${USER_SERVICE}
ENV PRODUCT_SERVICE=${PRODUCT_SERVICE}
ENV CART_SERVICE=${CART_SERVICE}
ENV ORDER_SERVICE=${ORDER_SERVICE}

# Crear directorio de la aplicación
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Exponer el puerto (asumiendo que la aplicación usa el puerto 3000)
EXPOSE 3032

# Comando para iniciar la aplicación
CMD ["npm", "start"]