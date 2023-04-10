install:
	npm ci

gendiff: 
	node bin/gendiff.js

publish:
	npm publish

lint:
	npx eslint .

rec:
	asciinema rec

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test
