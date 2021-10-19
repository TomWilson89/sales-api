#!/bin/bash
# docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres


docker stop $(docker ps -aq)

docker rm $(docker ps -aq)

docker rmi $(docker images -q)

docker volume rm $(docker volume ls -q)




## REDIS

# docker run --name redis -p 6379:6379 -d -t redis:alpine


## REDIS FOR DOCKER CLINET TO CHECK IF EVERYTHING RUNS AS EXPECTED

# docker run --name redis-client -v redisinsight:/db -p 8001:8001 -d -t redislabs/redisinsight:latest
