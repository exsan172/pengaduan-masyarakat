FROM --platform=amd64 node:16
WORKDIR /pengaduan-masyarakat

COPY package*.json ./pengaduan-masyarakat/
COPY . /pengaduan-masyarakat/
EXPOSE 3000

ENV PORT=3000
ENV DB_HOST=mongodb://exsan:M1r34cl3@ac-z8x4vwn-shard-00-00.mqmom6s.mongodb.net:27017,ac-z8x4vwn-shard-00-01.mqmom6s.mongodb.net:27017,ac-z8x4vwn-shard-00-02.mqmom6s.mongodb.net:27017/?ssl=true&replicaSet=atlas-foiu24-shard-0&authSource=admin&retryWrites=true&w=majority
ENV DB_NAME=pengaduan-masyarakat
ENV CLOUD_NAME=exsan-dev
ENV API_KEY=748976324489119
ENV API_SECRET=uBAic3y44QImWkbUTJwExujFhmU

RUN npm install
CMD ["npm", "start"]