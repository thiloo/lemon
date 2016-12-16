FROM node:4.4.7
COPY . /bundle
RUN (cd /bundle/programs/server && npm install)
ENV PORT=80
EXPOSE 80
CMD node /bundle/main.js
