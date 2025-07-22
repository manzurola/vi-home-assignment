import React, { useEffect, useState } from 'react';
import { fetchMoviesPerActor, MovieSummary, PaginatedResult } from '../api';
import { Box, Card, CardContent, Typography, List, ListItem, Button, CircularProgress, Pagination, Stack } from '@mui/material';

const pageSize = 10;

type MoviesPerActorData = PaginatedResult<Record<string, MovieSummary[]>>;

const MoviesPerActor: React.FC = () => {
  const [data, setData] = useState<MoviesPerActorData>({ items: {}, page: 1, pageSize, totalCount: 0 });
  const [selectedActor, setSelectedActor] = useState<string>('');
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

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

  const handleActorSelect = (actor: string) => {
    setSelectedActor(actor);
    setMovies(data.items[actor] || []);
  };

  const actors = Object.keys(data.items);
  const totalPages = Math.ceil(data.totalCount / pageSize);

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}><CircularProgress /></Box>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!data.items) return null;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Movies Per Actor</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
        <Box minWidth={220}>
          <Typography variant="subtitle1">Actors</Typography>
          <List sx={{ maxHeight: 300, overflowY: 'auto', bgcolor: '#f0f0f0', borderRadius: 1 }}>
            {actors.map((actor) => (
              <ListItem key={actor} disablePadding>
                <Button fullWidth variant={actor === selectedActor ? 'contained' : 'text'} onClick={() => handleActorSelect(actor)} sx={{ justifyContent: 'flex-start' }}>
                  {actor}
                </Button>
              </ListItem>
            ))}
          </List>
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination count={totalPages} page={page} onChange={(_, value) => setPage(value)} color="primary" />
          </Box>
        </Box>
        <Box flex={1}>
          <Typography variant="subtitle1">Movies</Typography>
          {selectedActor ? (
            <List>
              {movies.map((movie) => (
                <ListItem key={movie.id}>
                  <Card sx={{ width: '100%' }}>
                    <CardContent>
                      <Typography>{movie.title}</Typography>
                    </CardContent>
                  </Card>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography color="text.secondary">Select an actor to see their movies.</Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default MoviesPerActor; 