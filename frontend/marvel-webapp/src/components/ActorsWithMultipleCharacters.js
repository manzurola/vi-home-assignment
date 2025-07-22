import React, { useEffect, useState } from 'react';
import { fetchActorsWithMultipleCharacters } from '../api';

export default function ActorsWithMultipleCharacters() {
  const [data, setData] = useState({ items: {}, page: 1, pageSize: 50, totalCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    setLoading(true);
    fetchActorsWithMultipleCharacters(page, pageSize)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [page]);

  if (loading) return <div>Loading actors...</div>;
  if (error) return <div style={{color:'red'}}>Error: {error}</div>;
  if (!data.items) return null;

  const totalPages = Math.ceil(data.totalCount / pageSize);

  return (
    <div>
      <h2>Actors with Multiple Characters</h2>
      <ul>
        {Object.entries(data.items).map(([actor, roles]) => (
          <li key={actor} style={{ marginBottom: '1rem' }}>
            <strong>{actor}</strong>
            <ul>
              {roles.map((role, idx) => (
                <li key={idx}>
                  Movie: {role.movieName} | Character: {role.characterName}
                  {/* Placeholder for movie/character details link */}
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