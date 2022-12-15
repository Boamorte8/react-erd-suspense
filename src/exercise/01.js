// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {createResource} from 'utils'
import {
  fetchPokemon,
  PokemonDataView,
  PokemonErrorBoundary,
  PokemonInfoFallback,
} from '../pokemon'

// function createResource(promise) {
//   let status = 'pending'
//   let result = promise.then(
//     resolved => {
//       status = 'resolved'
//       result = resolved
//     },
//     rejected => {
//       status = 'rejected'
//       result = rejected
//     },
//   )
//   return {
//     read() {
//       if (status === 'pending' || status === 'rejected') throw result
//       if (status === 'resolved') return result
//     },
//   }
// }

// let pokemon
// let pokemonError

// class PokemonErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {hasError: false}
//   }

//   static getDerivedStateFromError(error) {
//     // Update state so the next render will show the fallback UI.
//     return {hasError: true}
//   }
//   render() {
//     if (this.state.hasError) {
//       // You can render any custom fallback UI
//       return <h1>Error loading pokemon. Try again</h1>
//     }
//     return this.props.children
//   }
// }

// We don't need the app to be mounted to know that we want to fetch the pokemon
// named "pikachu" so we can go ahead and do that right here.
// const pokemonPromise = fetchPokemon('pichurria')

//   pokemonPromise.then(
//     pokemonData => (pokemon = pokemonData),
//     error => (pokemonError = error),
//   )

const pokemonResource = createResource(fetchPokemon('pikacha'))

function PokemonInfo() {
  // if the code gets it this far, then the pokemon variable is defined and
  // rendering can continue!
  // if (pokemonError) {
  //   throw pokemonError
  // }
  // if (!pokemon) {
  //   throw pokemonPromise
  // }
  const pokemon = pokemonResource.read()
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        <PokemonErrorBoundary>
          {/* <React.Suspense fallback={<div>Loading pokemon...</div>}> */}
          <React.Suspense fallback={<PokemonInfoFallback />}>
            <PokemonInfo />
          </React.Suspense>
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

export default App
