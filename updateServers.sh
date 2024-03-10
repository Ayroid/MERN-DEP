#!/bin/bash

# UPDATE FRONTEND

cd ./Frontend
npm run build
docker build -t ayroid/mern-frontend .
docker push ayroid/mern-frontend

# UPDATE BACKEND

cd ../Backend
docker build -t ayroid/mern-backend .
docker push ayroid/mern-backend

# UPDATE SERVERS

cd ..
ssh -i ./ayroids.pem ubuntu@ec2-12-400-251-36.ap-south-1.compute.amazonaws.com ./updateServer.sh