#!/bin/sh

pwd

echo 'stop container...'
docker stop tp-web

echo 'delete container...'
docker rm tp-web

echo 'delete image...'
docker rmi tp-web

echo 'build image...'
docker build -t tp-web .

echo 'run tp-web container...'
docker run --name="tp-web" -d -p 80:80 -p 443:443 tp-web

echo 'finish'