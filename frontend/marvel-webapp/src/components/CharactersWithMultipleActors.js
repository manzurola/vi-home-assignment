import React, { useEffect, useState } from 'react';
import { fetchCharactersWithMultipleActors } from '../api';
import { Box, Card, CardContent, Typography, List, ListItem, CircularProgress, Pagination } from '@mui/material';

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
} 