import { useEffect, useState } from 'react';
import './App.css';
import type { Pokemon } from './types/pokemon';
import { StyledBox } from './components/styledbox';
import { Route, Routes } from 'react-router-dom';
import PokemonDetailsPage from './pages/pokemon-details';
import { applyFilter, parseCondition } from './utils/filterUtils';

function App() {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [searched, setSearched] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);

useEffect(() => {
  const cachedData = localStorage.getItem("allPokemons");

  if (cachedData) {
    setAllPokemons(JSON.parse(cachedData));
    return; 
  }

  fetch('https://pokebuildapi.fr/api/v1/pokemon')
    .then(response => response.json())
    .then(data => {
      setAllPokemons(data);
      localStorage.setItem("allPokemons", JSON.stringify(data)); 
    })
    .catch(error => console.error('Erreur lors du chargement des pokémons', error));
}, []);


  useEffect(() => {
    var trimmedSearched = searched.replace(/"/g, '');
    trimmedSearched=trimmedSearched.replace(/types|type/g, 'apiTypes');

    const condition = parseCondition(trimmedSearched);
    if (condition) {
      const filtered = applyFilter(allPokemons, condition);
      setFilteredPokemons(filtered);
    } else {
      setFilteredPokemons(allPokemons);
    }
  }, [searched, allPokemons]);

  function lengthByTypes(searchedType: string): number {
    return filteredPokemons.filter(pokemon =>
      pokemon.apiTypes.some(type => type.name.toLowerCase() === searchedType.toLowerCase())
    ).length;
  }

  return (
    <>
  

      <div style={{ fontFamily: 'Segoe UI, sans-serif', background: '#f5f6fa', minHeight: '100vh', padding: '2rem' }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const input = form.elements.namedItem('searched') as HTMLInputElement;
            setSearched(input.value);
          }}
          style={{ marginBottom: '20px' }}
        >
          <input
            type="text"
            name="searched"
            placeholder="Search Pokémon..."
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
              border: '1px solid #dcdde1'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              borderRadius: '5px',
              border: 'none',
              background: '#2980b9',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Rechercher
          </button>
        </form>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '20px',
          }}
        >
          <StyledBox> Nombre Pokémon : {filteredPokemons.length} </StyledBox>
          <StyledBox> Nombre Pokémon <img src="https://static.wikia.nocookie.net/pokemongo/images/3/30/Fire.png" alt="" width="25" />  {lengthByTypes("feu")}</StyledBox>
          <StyledBox> Nombre Pokémon <img src="https://static.wikia.nocookie.net/pokemongo/images/2/2f/Electric.png" alt="" width="25" />  {lengthByTypes("Électrik")} </StyledBox>
          <StyledBox> Nombre Pokémon <img src="https://static.wikia.nocookie.net/pokemongo/images/9/9d/Water.png" alt="" width="25" />  {lengthByTypes("Eau")} </StyledBox>
          <StyledBox> Nombre Pokémon <img src="https://static.wikia.nocookie.net/pokemongo/images/0/0b/Rock.png" alt="" width="25" />  {lengthByTypes("Roche")} </StyledBox>
          <StyledBox> Nombre Pokémon <img src="https://static.wikia.nocookie.net/pokemongo/images/c/c5/Grass.png" alt="" width="25" />  {lengthByTypes("Plante")} </StyledBox>
        </div>
    <Routes>
        <Route path="/pokemon/:id" element={<PokemonDetailsPage allPokemons={allPokemons} />} />
      </Routes>
        <h1 style={{ textAlign: 'center', color: 'blue', letterSpacing: '2px', marginBottom: '2rem' }}>Pokédex</h1>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
            <thead>
              <tr style={{ background: '#f1f2f6' }}>
                {['Id', 'Name', 'Attack', 'HP', 'Generation', 'Evolution', 'Prevolution', 'Vulnerable', 'Types', 'Image', 'Détails'].map((label, i) => (
                  <th key={i} style={{ padding: '10px', border: '1px solid #dcdde1', color: '#222' }}>{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPokemons.map((pokemon, index) => (
                <tr
                  key={index}
                  style={{
                    textAlign: 'center',
                    borderBottom: '1px solid #f1f2f6',
                    background: index % 2 === 0 ? '#fff' : '#f1f2f6',
                    color: '#222'
                  }}
                >
                  <td style={{ padding: '8px', border: '1px solid #dcdde1' }}>{pokemon.id}</td>
                  <td style={{ padding: '8px', border: '1px solid #dcdde1', fontWeight: 500 }}>{pokemon.name}</td>
                  <td style={{ padding: '8px', border: '1px solid #dcdde1' }}>{pokemon.stats.attack}</td>
                  <td style={{ padding: '8px', border: '1px solid #dcdde1' }}>{pokemon.stats.HP}</td>
                  <td style={{ padding: '8px', border: '1px solid #dcdde1' }}>{pokemon.apiGeneration}</td>
                  <td style={{ padding: '8px', border: '1px solid #dcdde1' }}>
                    {pokemon.apiEvolutions?.map(evo => evo.name).join(', ') || ''}
                  </td>
                  <td style={{ padding: '8px', border: '1px solid #dcdde1' }}>
                    {pokemon.apiPreEvolution?.name || ''}
                  </td>
                  <td style={{ padding: '8px', border: '1px solid #dcdde1' }}>
                    {pokemon.apiResistances
                      .filter(res => res.damage_relation === 'vulnerable')
                      .map(res => res.name)
                      .join(', ')}
                  </td>
                  <td style={{ padding: '8px', border: '1px solid #dcdde1' }}>
                    {pokemon.apiTypes.map(type => (
                     

                      <span
                        
                        key={type.name}
                        style={{
                          display: 'inline-block',
                          background: '#dff9fb',
                          color: '#30336b',
                          borderRadius: '12px',
                          padding: '2px 8px',
                          margin: '0 2px',
                          fontSize: '0.9em',
                          fontWeight: 500,
                        }}
                      >
                        <img src={type.image} alt={type.name} style={{ width: '22px', height: '22px', marginRight: '4px' }} />
                        {type.name}
                      </span>
                    ))}
                  </td>
                  <td style={{ padding: '8px', border: '1px solid #dcdde1' }}>
                    <img
                      src={pokemon.image}
                      alt={pokemon.name}
                      height="50"
                      style={{ borderRadius: '8px', background: '#f1f2f6', padding: '2px' }}
                    />
                  </td>
                  <td style={{ padding: '8px', border: '1px solid #dcdde1' }}>
                    <a href={`/pokemon/${pokemon.id}`} style={{ color: '#2980b9', textDecoration: 'underline' }}>
                      <button
                        style={{
                          borderRadius: '50%',
                          background: 'green',
                          color: 'white',
                          border: 'none',
                          width: '32px',
                          height: '32px',
                          fontSize: '1.2em',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                        +
                      </button>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
