import React, { useState } from 'react';
import MoviesPerActor from './components/MoviesPerActor';
import ActorsWithMultipleCharacters from './components/ActorsWithMultipleCharacters';
import CharactersWithMultipleActors from './components/CharactersWithMultipleActors';
import './App.css';

function App() {
  const [tab, setTab] = useState('moviesPerActor');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Marvel Explorer</h1>
        <nav style={{ marginBottom: 20 }}>
          <button onClick={() => setTab('moviesPerActor')} style={{ fontWeight: tab === 'moviesPerActor' ? 'bold' : 'normal' }}>Movies Per Actor</button>
          <button onClick={() => setTab('actorsWithMultipleCharacters')} style={{ fontWeight: tab === 'actorsWithMultipleCharacters' ? 'bold' : 'normal', marginLeft: 10 }}>Actors with Multiple Characters</button>
          <button onClick={() => setTab('charactersWithMultipleActors')} style={{ fontWeight: tab === 'charactersWithMultipleActors' ? 'bold' : 'normal', marginLeft: 10 }}>Characters with Multiple Actors</button>
        </nav>
        <main style={{ width: '100%', maxWidth: 900, margin: '0 auto', background: 'white', color: 'black', borderRadius: 8, padding: 24 }}>
          {tab === 'moviesPerActor' && <MoviesPerActor />}
          {tab === 'actorsWithMultipleCharacters' && <ActorsWithMultipleCharacters />}
          {tab === 'charactersWithMultipleActors' && <CharactersWithMultipleActors />}
        </main>
      </header>
    </div>
  );
}

export default App;
