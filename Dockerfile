# Choose base Image as node latest
FROM node:latest

# Switch working directory to /app
WORKDIR /app

# Copy code from current directory to app directory
COPY . /app/

# Install npm packages
RUN npm install

#Expose port and start application on 8080
EXPOSE 8080

# Execute command for runnning app
CMD [ "npm", "start" ]