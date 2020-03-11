install: 
	npm i

start:
	npm start

build:
	npm run build

test:
	npm test

lint:
	npx eslint . --ext js,jsx

publish:
	npm publish

.PHONY: test
