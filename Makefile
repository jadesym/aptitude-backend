# PROJECT_NAME defaults to name of the current directory.
# should not to be changed if you follow GitOps operating procedures.
PROJECT_NAME = $(notdir $(PWD))

##
## This makefile is allows for the following commands:
##
## COMMAND         | Description
##--------------------------------------------------------------------
DOCKER_COMPOSE_MAIN_FILE_NAME = docker-compose.yml
DOCKER_COMPOSE_LINT_FILE_NAME = docker-compose.lint.yml
DOCKER_COMPOSE_TEST_FILE_NAME = docker-compose.test.yml

.PHONY: build build-test clean deploy e2e-test rebuild rebuild-test

## build           | Builds the main service
build:
	docker-compose --file $(DOCKER_COMPOSE_MAIN_FILE_NAME) build

## build-all       | Builds all docker-compose files for build, lint, and tests
build-all:
	docker-compose \
		--file $(DOCKER_COMPOSE_MAIN_FILE_NAME) \
		--file $(DOCKER_COMPOSE_LINT_FILE_NAME) \
		--file $(DOCKER_COMPOSE_TEST_FILE_NAME) \
		build

## build-test      | Builds the test docker image
build-test:
	docker-compose --file $(DOCKER_COMPOSE_MAIN_FILE_NAME) --file $(DOCKER_COMPOSE_TEST_FILE_NAME) build

## clean           | Stops all docker containers running
clean:
	docker-compose --file $(DOCKER_COMPOSE_MAIN_FILE_NAME) --file $(DOCKER_COMPOSE_LINT_FILE_NAME) --file $(DOCKER_COMPOSE_TEST_FILE_NAME) \
	down --remove-orphans --rmi all

## deploy          | Deploys the main service
deploy: build
	docker-compose --file $(DOCKER_COMPOSE_MAIN_FILE_NAME) up --detach

## test-e2e        | Runs the end to end tests
test-e2e: build-test
	# Remove the curl against the localhost PORT after we migrate this to e2e-tests
	if docker-compose --file $(DOCKER_COMPOSE_MAIN_FILE_NAME) --file $(DOCKER_COMPOSE_TEST_FILE_NAME) up --detach app test-e2e ; then \
		curl localhost:3000/status; \
		echo "End-to-end (E2E) tests successfully passed!"; \
	else \
		echo "End-to-end (E2E) tests failed!"; \
	fi
	docker-compose --file $(DOCKER_COMPOSE_MAIN_FILE_NAME) --file $(DOCKER_COMPOSE_TEST_FILE_NAME) down

## test-unit       | Runs the unit tests
test-unit: build-test
	docker-compose --file $(DOCKER_COMPOSE_TEST_FILE_NAME) run test-unit

## help            | Outputs the possible make commands
help: Makefile
	@sed -n 's/^##//p' $<

## lint            | Runs the linter
lint:
	docker-compose --file $(DOCKER_COMPOSE_LINT_FILE_NAME) up
	docker-compose --file $(DOCKER_COMPOSE_LINT_FILE_NAME) down

## precommit       | Runs necessary build/tests before committing
precommit: build-all lint test-unit test-e2e

## rebuild         | Builds the main service with no caching and pulling in the latest images
rebuild:
	docker-compose --file $(DOCKER_COMPOSE_MAIN_FILE_NAME) build --no-cache --pull

## rebuild-all     | Builds all docker-compose files for build, lint, and tests with no caching
##                 | and pulling in the latest images
rebuild-all:
	docker-compose \
		--file $(DOCKER_COMPOSE_MAIN_FILE_NAME) \
		--file $(DOCKER_COMPOSE_LINT_FILE_NAME) \
		--file $(DOCKER_COMPOSE_TEST_FILE_NAME) \
		build --no-cache --pull

## rebuild-test    | Builds the test image with no caching and pulling in the latest image
rebuild-test:
	docker-compose --file $(DOCKER_COMPOSE_MAIN_FILE_NAME) --file $(DOCKER_COMPOSE_TEST_FILE_NAME) build --no-cache --pull
