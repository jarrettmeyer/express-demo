FROM node:5.7.0-wheezy

MAINTAINER Jarrett Meyer <jarrettmeyer@gmail.com>

# Create and set the working directory.
RUN mkdir -p /var/express-demo
WORKDIR /var/express-demo

# Copy application files. Remove unnecessary files. Install npm modules.
COPY . /var/express-demo
RUN rm -rf fixtures/ && \
    rm -rf node_modules/ && \
    npm install

# Set environment variables for the application
ENV PORT=3000
ENV DEBUG=api,server,sql

EXPOSE 3000
CMD ["node", "/var/express-demo/scripts/start-server"]
