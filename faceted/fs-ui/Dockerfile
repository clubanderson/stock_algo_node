# pull official base image
FROM node:14.15.0-alpine3.12

# set working directory
WORKDIR /usr/src

# add `/usr/src/node_modules/.bin` to $PATH
ENV PATH /usr/src/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN npm install react-scripts@4.0.0 -g --silent
RUN npm install
RUN npm install --save node-sass@5.0.0

# add app
COPY . /usr/src

# start app
CMD ["npm", "start"]
