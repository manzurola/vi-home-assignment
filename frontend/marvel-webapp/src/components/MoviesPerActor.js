import React, { useEffect, useState } from 'react';
import { fetchMoviesPerActor } from '../api';

export default function MoviesPerActor() {
  const [data, setData] = useState({ items: {}, page: 1, pageSize: 50, totalCount: 0 });
  const [selectedActor, setSelectedActor] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    setLoading(true);
    fetchMoviesPerActor(page, pageSize)
      .then((res) => {
        setData(res);
        setLoading(false);
        setSelectedActor('');
        setMovies([]);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [page]);

  const handleActorSelect = (actor) => {
    setSelectedActor(actor);
    setMovies(data.items[actor] || []);
  };

  if (loading) return <div>Loading actors...</div>;
  if (error) return <div style={{color:'red'}}>Error: {error}</div>;
  if (!data.items) return null;

  const actors = Object.keys(data.items);
  const totalPages = Math.ceil(data.totalCount / pageSize);

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
          <div style={{ marginTop: 10 }}>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
            <span style={{ margin: '0 8px' }}>Page {page} of {totalPages}</span>
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
          </div>
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