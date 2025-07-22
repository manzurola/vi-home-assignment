import React, { useEffect, useState } from 'react';
import { fetchCharactersWithMultipleActors } from '../api';

export default function CharactersWithMultipleActors() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchCharactersWithMultipleActors()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading characters...</div>;
  if (error) return <div style={{color:'red'}}>Error: {error}</div>;
  if (!data) return null;

  return (
    <div>
      <h2>Characters with Multiple Actors</h2>
      <ul>
        {Object.entries(data).map(([character, roles]) => (
          <li key={character} style={{ marginBottom: '1rem' }}>
            <strong>{character}</strong>
            <ul>
              {roles.map((role, idx) => (
                <li key={idx}>
                  Movie: {role.movieTitle} | Actor: {role.actorName}
                  {/* Placeholder for movie/actor details link */}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
} 