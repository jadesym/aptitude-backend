# To run this image execute the following commands:
# docker build --tag aptitude-backend:latest .
# docker run --detach --publish 3000:3000 aptitude-backend:latest

# Set the base image to jadesym/node-ubuntu-docker-base
# https://hub.docker.com/repository/docker/jadesym/node-ubuntu-docker-base
FROM jadesym/node-ubuntu-docker-base:latest as base

#----------------------------------------------------------------------
# Dependencies Installation
#----------------------------------------------------------------------
# Confirm Node Installation
RUN node -v
RUN npm -v

# Adding non-interactive for debian front-end to hide dialog questions during build.
# Args only live during the build so they do not persist to the final image.
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get install -qq -y \
        less \
    && apt-get -qq -y autoclean

#----------------------------------------------------------------------
# User & Directory Setup
#----------------------------------------------------------------------
ARG USER_NAME=node
ARG DATA_DIR=/data/
ENV APP_DIR=$DATA_DIR/app/

RUN mkdir -p $APP_DIR

RUN useradd -ms /bin/bash $USER_NAME
RUN chown -R $USER_NAME:$USER_NAME $DATA_DIR

USER $USER_NAME

WORKDIR $APP_DIR

#----------------------------------------------------------------------
# Loading & Running the Repository Code
#----------------------------------------------------------------------
# Copy configuration and dependency files
COPY \
  # Copy NPM RC file for npm configurations
  .npmrc \
  # Copy dependencies definition files [package(-lock).json] as source of truth for dependencies
  package-lock.json \
  package.json \
  # Typescript configuration
  tsconfig.json \
  # To destination directory
  $APP_DIR

# Install dependencies from package lock (clean install)
RUN npm ci

# Copy source code contents. Directories are treated differently.
# Copying with multiple source files will copy the contents of the file
# instead of the directory, which is why this COPY command is separate.
COPY src $APP_DIR/src

#----------------------------------------------------------------------
# Use multi-stage builds to build the environment
#----------------------------------------------------------------------
FROM base as builder

RUN npm run build

#----------------------------------------------------------------------
# Use multi-stage builds to run the linter
#----------------------------------------------------------------------
FROM base as linter

COPY \
  .eslintrc.js \
  .prettierrc \
  $APP_DIR

CMD ["npm", "run", "lint"]

#----------------------------------------------------------------------
# Use multi-stage builds to have the e2e test image
#----------------------------------------------------------------------
FROM base as test-e2e

# Copying necessary e2e test files
COPY \
  jestconfig.json \
  # To destination directory
  $APP_DIR
COPY test/e2e $APP_DIR/test/e2e

CMD ["npm", "run", "test:e2e"]

#----------------------------------------------------------------------
# Use multi-stage builds to have the unit test image
#----------------------------------------------------------------------
FROM base as test-unit

# Copying necessary unit test files
COPY \
  jestconfig.json \
  # To destination directory
  $APP_DIR
COPY test/unit $APP_DIR/test/unit

CMD ["npm", "run", "test:unit"]

#----------------------------------------------------------------------
# Use multi-stage builds to have the test image
#----------------------------------------------------------------------
FROM base as app

COPY --from=builder $APP_DIR/dist $APP_DIR/dist

# Start the server
CMD ["npm", "run", "start"]
