# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install any dependencies
RUN npm install

# Install sequelize-cli as a global dependency
RUN npm install -g sequelize-cli

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the application listens on
EXPOSE 3000

# Set environment variables for the database connection
ENV PGHOST=localhost
ENV PGUSER=magz
ENV PGDATABASE=todos
ENV PGPASSWORD=password

# Start the application
# CMD sequelize db:migrate && npm start
CMD npm start