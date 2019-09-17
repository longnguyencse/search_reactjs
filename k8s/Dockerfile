FROM node:10.16-alpine

#Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app/

#Copy all source into image
COPY search_reactjs .
WORKDIR /usr/src/app/search_reactjs

#Run install dependency
RUN npm install

#Bind port 3000
EXPOSE 3000

#run command
ENTRYPOINT ["npm"]

#Param
CMD ["start"]
 
