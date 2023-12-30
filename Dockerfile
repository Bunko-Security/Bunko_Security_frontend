FROM node:20
WORKDIR /bsf
COPY package.json ./package.json
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]