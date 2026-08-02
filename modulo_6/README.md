# Module 6 - REST API laboratory

Rick and Morty data browser implemented with the browser `fetch` API. The
project includes all the proposed exercises and the optional GraphQL version.

## Run locally

```bash
npm install
npm start
```

The application is available at <http://localhost:8080> and the editable mock
API runs at <http://localhost:3000>.

## Implemented exercises

- **Local**: reads the five mock characters, opens their detail and persists
  `bestSentence` with a `PUT` request.
- **REST**: reads the public character collection and each character detail
  from `https://rickandmortyapi.com/api`.
- **GraphQL**: reproduces the public collection and detail flows through
  `https://rickandmortyapi.com/graphql` using GraphQL queries sent with
  `fetch`.
- **Challenge**: character search and pagination, plus searchable and
  paginated location and episode collections in both REST and GraphQL modes.

The API source can be changed from the segmented control in the application
header. It is also stored in the URL, for example:

- `http://localhost:8080/#/characters?source=local`
- `http://localhost:8080/#/characters?source=rest`
- `http://localhost:8080/#/characters?source=graphql`
- `http://localhost:8080/#/locations?source=graphql`
- `http://localhost:8080/#/episodes?source=rest`
