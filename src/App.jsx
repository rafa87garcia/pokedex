import Axios from "axios";
import { useState } from 'react';
import './App.scss';

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemon, setPokemon] = useState("");
  const [pokemonChosen, setpokemonChosen] = useState(false);
  const [error, setError] = useState(false);

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(({ data }) => {
        console.log(data);
        setPokemon({
          name: pokemonName,
          number: data.id,
          species: data.species.name,
          image: data.sprites.front_default,
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          speed: data.stats[5].base_stat,
          type: data.types[0].type.name,
        });
        setpokemonChosen(true);
        setError(false);
      }
    ).catch(error => {
      setError(true);
    });
  };

  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Pokédex</h1>
        <input type="text" className="field_input" onChange={(event) => setPokemonName(event.target.value.toLowerCase())} />
        <div>
          {pokemonName && <button className="button" onClick={searchPokemon}>Search Pokémon</button>}
          {error && (
            <p className="menssage menssage--error">Pockemon no existe</p>
            )}
        </div>
      </div>

      <div className="DisplaySection">
        {
          !pokemonChosen ? (
            <h1> Please choose a Pokémon </h1>
          ) : (
            <>
              <h1>{pokemon.name}</h1>
              <img src={pokemon.image} alt={pokemon.name} />
              <h3>Number: #{pokemon.number}</h3>
              <h3>Species: {pokemon.species}</h3>
              <h3>Type: {pokemon.type}</h3>
              <h4>Hp: {pokemon.hp}</h4>
              <h4>Attack: {pokemon.attack}</h4>
              <h4>Defense: {pokemon.defense}</h4>
              <h4>Speed: {pokemon.speed}</h4>
            </>
          )
         
        }
      </div>
    </div>
  );
}

export default App;
