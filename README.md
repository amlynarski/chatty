# Chatty
React native chat aplication 

# Setup

0. setup server https://github.com/amlynarski/chatty-server
1. `yarn install` 
2. open `const.ts` and setup your server address (`httpUri` and `wsUri`)
3. `yarn start`

# Predefined users

To use the app you can use one of existing logins: 
- `testuser`
- `adam`
- `robot`
- `aleksandra`
Password is not checked on backend side, so it is needed to provide just username (case sensitive)

# Using schemas + types

`yarn generate`

Types are generated based on server and client graphql `schemas`. 
To develop project please update `codegen.yml` with correct server address -> `schema: "http://localhost:4000"` . Server must be available to generate schemas.

# Testing

`yarn test`

Developer note:
According to time preasure I have included few tests, but they presents almost all usecases:
- simple unit testing
- snapshot testing
- testing with spy 
- testing with rendering component, which use `useContext`; finding elements; interaction like `onPress()`


# Final developer note:
- tested on real Android device and iOS simulator 
- **have a nice time!** :) 
