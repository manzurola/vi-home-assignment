import React, { useEffect, useState } from 'react';
import { fetchActorsWithMultipleCharacters, ActorCharacterRole, PaginatedResult } from '../api';
import { Box, Card, CardContent, Typography, List, ListItem, CircularProgress, Pagination } from '@mui/material';

type ActorsWithMultipleCharactersData = PaginatedResult<Record<string, ActorCharacterRole[]>>;

const pageSize = 10;

const ActorsWithMultipleCharacters: React.FC = () => {
  const [data, setData] = useState<ActorsWithMultipleCharactersData>({ items: {}, page: 1, pageSize, totalCount: 0 });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

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

  const totalPages = Math.ceil(data.totalCount / pageSize);

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}><CircularProgress /></Box>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!data.items) return null;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Actors with Multiple Characters</Typography>
      <List>
        {Object.entries(data.items).map(([actor, roles]) => (
          <ListItem key={actor} disableGutters>
            <Card sx={{ width: '100%', mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{actor}</Typography>
                <List>
                  {roles.map((role, idx) => (
                    <ListItem key={idx}>
                      <Typography>
                        Movie: <b>{role.movieName}</b> | Character: <b>{role.characterName}</b>
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination count={totalPages} page={page} onChange={(_, value) => setPage(value)} color="primary" />
      </Box>
    </Box>
  );
};

export default ActorsWithMultipleCharacters; 