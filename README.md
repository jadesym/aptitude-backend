# Docker Commands

# Development Workflow

## Build the service in watch mode

npm run build:watch

## Startup a local instance of the development environment DB

make dev-db

## Start the service in the development environment

npm run start:dev

# Production Workflow

## 1A) Build the docker image

make build

## 1B) Build the docker image from scratch (no caching)

make rebuild

## 2) Run the docker image service

make deploy

## 3) Shutdown services when finished

make clean
