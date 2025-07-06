import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Pokemon } from '../types/pokemon';

type Props = {
    allPokemons: Pokemon[];
};

function PokemonDetailsPage({ allPokemons }: Props) {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const found = allPokemons.find(p => String(p.id) === id);
        setPokemon(found ?? null);

        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 2000); 

        return () => clearTimeout(timeout);
    }, [id, allPokemons]);

    if (isLoading) {
        return (
            <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', textAlign: 'center' }}>
                <p>Chargement...</p>
            </div>
        );
    }

    if (!pokemon) {
        return (
            <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        border: 'none',
                        background: 'none',
                        fontSize: 24,
                        cursor: 'pointer',
                        position: 'absolute',
                        right: 32,
                        top: 32
                    }}
                >
                    ✕
                </button>
                <h2>Pokémon introuvable</h2>
            </div>
        );
    }
   


    return (
        <div style={{
            fontFamily: 'Segoe UI, sans-serif',
            background: '#f5f6fa',
            minHeight: '100vh',
            padding: '2rem',
            position: 'relative',
            maxWidth: 700,
            margin: '2rem auto',
            borderRadius: 16,
            boxShadow: '0 4px 24px #0002'
        }}>
            <button
                onClick={() => navigate("/")}
                style={{
                    border: 'none',
                    background: 'none',
                    fontSize: 32,
                    cursor: 'pointer',
                    position: 'absolute',
                    right: 32,
                    top: 32,
                    color: '#888'
                }}
                aria-label="Fermer"
            >✕</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                <img src={pokemon.image} alt={pokemon.name} style={{ width: 180, height: 180, background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #0001' }} />
                <div>
                    <h1 style={{ margin: 0, fontSize: 36 }}>{pokemon.name} <span style={{ fontSize: 18, color: '#888' }}>#{pokemon.pokedexId}</span></h1>
                    <div style={{ display: 'flex', gap: 8, margin: '8px 0' }}>
                        {pokemon.apiTypes.map(type => (
                            <span key={type.name} style={{
                                display: 'flex',
                                alignItems: 'center',
                                background: '#e0e7ef',
                                borderRadius: 8,
                                padding: '2px 8px',
                                fontSize: 16,
                                fontWeight: 500
                            }}>
                                <img src={type.image} alt={type.name} style={{ width: 22, height: 22, marginRight: 4 }} />
                                {type.name}
                            </span>
                        ))}
                    </div>
                    <div style={{ marginTop: 8, color: '#666' }}>Génération : {pokemon.apiGeneration}</div>
                </div>
            </div>
            <h2 style={{ marginTop: 32 }}>Statistiques</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                {Object.entries(pokemon.stats).map(([stat, value]) => (
                    <div key={stat} style={{
                        background: '#fff',
                        borderRadius: 8,
                        padding: '8px 12px',
                        boxShadow: '0 1px 4px #0001',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontWeight: 600 }}>{stat.replace('_', ' ').toUpperCase()}</div>
                        <div style={{ fontSize: 20, color: '#2d8f6f' }}>{value}</div>
                    </div>
                ))}
            </div>
            <h2 style={{ marginTop: 32 }}>Résistances</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {pokemon.apiResistances.map(res => (
                    <span key={res.name} style={{
                        background: res.damage_relation.includes('vulnerable') ? '#ffb3b3' :
                            res.damage_relation.includes('resistant') ? '#b3ffd9' : '#e0e7ef',
                        borderRadius: 8,
                        padding: '4px 10px',
                        fontSize: 15,
                        fontWeight: 500
                    }}>
                        {res.name} <span style={{ fontSize: 13, color: '#888' }}>x{res.damage_multiplier}</span>
                    </span>
                ))}
            </div>
            <h2 style={{ marginTop: 32 }}>Évolutions</h2>
            <div>
                {pokemon.apiEvolutions.length === 0 ? (
                    <span>Aucune évolution</span>
                ) : (
                    pokemon.apiEvolutions.map(evo => (
                        <a
                            key={evo.pokedexId}
                            href={`/pokemon/${evo.pokedexId}`}
                            style={{
                                background: '#e0e7ef',
                                borderRadius: 8,
                                padding: '4px 10px',
                                marginRight: 8,
                                fontWeight: 500,
                                color: 'inherit',
                                textDecoration: 'none',
                                transition: 'background 0.2s'
                            }}
                            onClick={e => {
                                e.preventDefault();
                                navigate(`/pokemon/${evo.pokedexId}`);
                            }}
                        >
                            {evo.name} (#{evo.pokedexId})
                        </a>
                    ))
                )}
            </div>
            {pokemon.apiPreEvolution && (
                <div style={{ marginTop: 16 }}>
                    <strong>Pré-évolution :</strong> 
                    <a
                        href={`/pokemon/${pokemon.apiPreEvolution.pokedexId}`}
                        style={{
                            background: '#e0e7ef',
                            borderRadius: 8,
                            padding: '4px 10px',
                            marginLeft: 8,
                            fontWeight: 500,
                            color: 'inherit',
                            textDecoration: 'none',
                            transition: 'background 0.2s'
                        }}
                        onClick={e => {
                            e.preventDefault();
                            if (pokemon.apiPreEvolution) {
                                navigate(`/pokemon/${pokemon.apiPreEvolution.pokedexIdd}`);}
                                        }}
                    >
                    {pokemon.apiPreEvolution.name} (#{pokemon.apiPreEvolution.pokedexIdd})
                    </a>
                </div>
            )}
        </div>
    );
}

export default PokemonDetailsPage;