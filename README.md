## Setup for development:
1) Install [NVM](https://github.com/creationix/nvm)
2) ``` npm install -g yarn ```
3) ```yarn install ```

## Build and watch the site
1) ``` node build.js ```

## May be usefull metalsmith plugins:
1) [metalsmith-in-place](https://github.com/superwolff/metalsmith-in-place)
2) [metalsmith-word-count](https://github.com/majodev/metalsmith-word-count)



### Notes:
1) Metalsmith build. Using plugin order counts! (Use right order, collecitons, layouts.)

### Issues:
1) Duplicate collection on metalsmith watch reload
   https://github.com/segmentio/metalsmith-collections/issues/27
   Will be fixed after merge of
   https://github.com/segmentio/metalsmith-collections/pull/48
