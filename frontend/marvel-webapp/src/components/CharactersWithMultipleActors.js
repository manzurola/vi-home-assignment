import React, { useEffect, useState } from 'react';
import { fetchCharactersWithMultipleActors } from '../api';

export default function CharactersWithMultipleActors() {
  const [data, setData] = useState({ items: {}, page: 1, pageSize: 50, totalCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    setLoading(true);
    fetchCharactersWithMultipleActors(page, pageSize)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [page]);

  if (loading) return <div>Loading characters...</div>;
  if (error) return <div style={{color:'red'}}>Error: {error}</div>;
  if (!data.items) return null;

  const totalPages = Math.ceil(data.totalCount / pageSize);

  return (
    <div>
      <h2>Characters with Multiple Actors</h2>
      <ul>
        {Object.entries(data.items).map(([character, roles]) => (
          <li key={character} style={{ marginBottom: '1rem' }}>
            <strong>{character}</strong>
            <ul>
              {roles.map((role, idx) => (
                <li key={idx}>
                  Movie: {role.movieName} | Actor: {role.actorName}
                  {/* Placeholder for movie/actor details link */}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 10 }}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
        <span style={{ margin: '0 8px' }}>Page {page} of {totalPages}</span>
        <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
} 