import React, { useEffect, useState } from 'react';
import { fetchActorsWithMultipleCharacters } from '../api';

export default function ActorsWithMultipleCharacters() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchActorsWithMultipleCharacters()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading actors...</div>;
  if (error) return <div style={{color:'red'}}>Error: {error}</div>;
  if (!data) return null;

  return (
    <div>
      <h2>Actors with Multiple Characters</h2>
      <ul>
        {Object.entries(data).map(([actor, roles]) => (
          <li key={actor} style={{ marginBottom: '1rem' }}>
            <strong>{actor}</strong>
            <ul>
              {roles.map((role, idx) => (
                <li key={idx}>
                  Movie: {role.movieTitle} | Character: {role.characterName}
                  {/* Placeholder for movie/character details link */}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
} 