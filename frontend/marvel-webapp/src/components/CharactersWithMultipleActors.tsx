import React, { useEffect, useState } from 'react';
import { fetchCharactersWithMultipleActors, CharacterActorRole, PaginatedResult } from '../api';
import { Box, Card, CardContent, Typography, List, ListItem, CircularProgress, Pagination } from '@mui/material';

type CharactersWithMultipleActorsData = PaginatedResult<Record<string, CharacterActorRole[]>>;

const pageSize = 10;

const CharactersWithMultipleActors: React.FC = () => {
  const [data, setData] = useState<CharactersWithMultipleActorsData>({ items: {}, page: 1, pageSize, totalCount: 0 });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

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

  const totalPages = Math.ceil(data.totalCount / pageSize);

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}><CircularProgress /></Box>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!data.items) return null;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Characters with Multiple Actors</Typography>
      <List>
        {Object.entries(data.items).map(([character, roles]) => (
          <ListItem key={character} disableGutters>
            <Card sx={{ width: '100%', mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{character}</Typography>
                <List>
                  {roles.map((role, idx) => (
                    <ListItem key={idx}>
                      <Typography>
                        Movie: <b>{role.movieName}</b> | Actor: <b>{role.actorName}</b>
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

export default CharactersWithMultipleActors; 