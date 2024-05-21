# lovesongs

<img width="1508" alt="index" src="https://github.com/valerietanhx/lovesongs/assets/110474344/9915cff9-e7cb-44cf-aaf9-7a7a1a30b1b7">

A website for people to share their memories associated with songs.

My first attempt at full-stack web development. Inspired by [Chia Amisola](https://chia.design/)'s [The Sound of Love](https://thesoundof.love/) and [Rora Blue](https://www.rorablue.com/)'s [Unsent Project](https://theunsentproject.com/), as well as the songs that I can't listen to without remembering a specific moment in time.

_While this repository was created in May 2024, most of the code here was first written in August 2023, when I was still very, very new to web development. Happy with it regardless... with everything I build I aim to learn + be creative (in concept, design, etc.) + have fun, all of which I feel were accomplished here :)_



## Setup

For those who wish to build on the app or run it locally as a personal archive.

### Installing the app

1. Clone this repository.

   ```shell
   git clone https://github.com/valerietanhx/lovesongs.git
   ```

2. Initialise a `.env` file:

   ```shell
   cp sample.env .env
   ```

3. Fill in the `.env` file with the necessary environment variables.

### Running locally

Ensure you have the following set up:

1. [Node.js](https://nodejs.org/)

To run the app, use the following command:

```shell
npm run serve
```

### Running with Docker

Ensure you have the following set up:

1. [Docker](https://www.docker.com/get-started)
2. [Docker Compose](https://docs.docker.com/compose/install/)

To run the app, use the following command:

```shell
docker compose up --build
```

To run the app on a clean slate, use the following commands:

```shell
docker compose down --volumes
docker compose up --build --force-recreate --renew-anon-volumes
```

To stop the app, use the following command:

```shell
docker compose down
```

To stop the app and remove all images and volumes, use the following command:

```shell
docker compose down --rmi all --volumes
```

### Managing dependencies

To install dependencies, use the following command:

```shell
npm install
```

To add a dependency, use the following command:

```shell
npm install <package-name>
```
