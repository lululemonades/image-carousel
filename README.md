# Photo gallery from Lululemon website.

> In conjunction with four other components, this repository can be added to a proxy to create a full product page experience. In addition to creating the front end, part of my task was to seed a database with mock data. The database to connect this photo gallery experience is a Mongo database, the component loads the image URLs from my mock data set and displays the images.

## Related Projects

  - https://github.com/lululemonades/reviews-component
  - https://github.com/lululemonades/image-carousel
  - https://github.com/lululemonades/productDetails
  - https://github.com/lululemonades/you-may-also-like
  - https://github.com/lululemonades/lulu-nav-bar

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Before opening the server on port 3004, the database must be seeded because the component relies on URLs to be injected. After starting the server and running "npm run seed-db", after a MongoDB instance has already been started, the component renders images from the Mongo database.

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- Mongo 3.6.4

## Development

- From the repository, go to a terminal window and enter the commands "npm run seed-db"
- To start the server, enter the command "npm run start", you should see a nodemon start the server
- Need to install Mongo? https://docs.mongodb.com/manual/administration/install-community/

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
npm run seed-db
npm run start
```
