FROM node:10

# Create app directory to hold the application code inside the image
WORKDIR /kitesjs/kites-docsify

# Create directory to hold the site documents
RUN mkdir -p docs

# Note: We are only copying the package.json file to take advantage of cached Docker layers
# A wildcard is used to ensure both package.json AND package-lock.json are copied where available (npm@5+)
COPY package*.json ./

# Building your code for production
RUN npm ci --only=production

# Bundle app source inside the Docker image
COPY . .

# Build source for production (No build currently)
# RUN npm run build:prod

EXPOSE 3000
CMD [ "node", "app.js" ]
