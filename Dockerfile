FROM node:6.9.4

WORKDIR /tmp
COPY package.json /tmp/
# RUN npm config set registry http://registry.npmjs.org/ && npm install
RUN npm install -q

WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000

CMD [ "/usr/local/bin/node", "./lib/index.js", "|", "./node_modules/.bin/bunyan", "-o", "short" ]
EXPOSE 3000
