# Wordle Helper

Enter guesses and tile colors to figure out which remaining words can be the Wordle solution! This application is designed to be used along [Wordle] (https://www.nytimes.com/games/wordle/index.html) to help with deciding which words to guess.

Features include:

- Inituitive grid and keyboard interface based off Wordle (unlike many Wordle solvers that currently exist)
- Ability to change tile colors by clicking on letter tiles in grid
- Scrollable table containing all remaining words based off past guess information

Based off code from: https://github.com/cwackerfuss/react-wordle

[**Try out the demo!**](https://reactle.vercel.app/)

## Build and run

### To Run Locally:

Clone the repository and perform the following command line actions:

```bash
$> cd react-wordle
$> npm install
$> npm run start
```

### To build/run docker container:

#### Development

```bash
$> docker build -t reactle:dev -f docker/Dockerfile .
$> docker run -d -p 3000:3000 --name reactle-dev reactle:dev
```

Open [http://localhost:3000](http://localhost:3000) in browser.

#### Production

```bash
$> docker build --target=prod -t reactle:prod -f docker/Dockerfile .
$> docker run -d -p 80:8080  --name reactle-prod reactle:prod
```

Open [http://localhost](http://localhost) in browser. See the [entry in the FAQ](#why-does-sharing-of-results-not-work) below about requirements for sharing of results.
