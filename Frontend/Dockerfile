# Use an official Nginx runtime as a parent image
FROM nginx:alpine

# Copy the Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the website files to the Nginx document root
COPY ./dist/ /usr/share/nginx/html
