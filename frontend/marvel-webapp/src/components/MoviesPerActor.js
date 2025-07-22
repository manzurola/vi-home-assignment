import React, { useEffect, useState } from 'react';
import { fetchMoviesPerActor } from '../api';

export default function MoviesPerActor() {
  const [data, setData] = useState(null);
  const [selectedActor, setSelectedActor] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchMoviesPerActor()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleActorSelect = (actor) => {
    setSelectedActor(actor);
    setMovies(data[actor] || []);
  };

  if (loading) return <div>Loading actors...</div>;
  if (error) return <div style={{color:'red'}}>Error: {error}</div>;
  if (!data) return null;

  const actors = Object.keys(data);

  return (
    <div>
      <h2>Movies Per Actor</h2>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div>
          <h3>Actors</h3>
          <ul style={{ maxHeight: 300, overflowY: 'auto', minWidth: 200 }}>
            {actors.map((actor) => (
              <li key={actor}>
                <button onClick={() => handleActorSelect(actor)} style={{ background: actor === selectedActor ? '#eee' : 'white' }}>
                  {actor}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Movies</h3>
          {selectedActor ? (
            <ul>
              {movies.map((movie) => (
                <li key={movie.id}>
                  {movie.title} {/* Placeholder for details link */}
                </li>
              ))}
            </ul>
          ) : (
            <div>Select an actor to see their movies.</div>
          )}
        </div>
      </div>
    </div>
  );
} 