import React, { useEffect, useState } from 'react';
import { fetchMoviesPerActor, MovieSummary, PaginatedResult } from '../api';
import { Box, Card, CardContent, Typography, List, ListItem, CircularProgress, Pagination } from '@mui/material';

const pageSize = 10;

type MoviesPerActorData = PaginatedResult<Record<string, MovieSummary[]>>;

const MoviesPerActor: React.FC = () => {
  const [data, setData] = useState<MoviesPerActorData>({ items: {}, page: 1, pageSize, totalCount: 0 });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setLoading(true);
    fetchMoviesPerActor(page, pageSize)
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
      <Typography variant="h4" gutterBottom>Movies Per Actor</Typography>
      <Typography variant="body1" gutterBottom>
        Explore all movies each actor has appeared in.
      </Typography>
      <List>
        {Object.entries(data.items).map(([actor, movies]) => (
          <ListItem key={actor} disableGutters>
            <Card sx={{ width: '100%', mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{actor}</Typography>
                <List>
                  {movies.map((movie) => (
                    <ListItem key={movie.id}>
                      <Typography>
                        Movie: <b>{movie.title}</b>
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

export default MoviesPerActor; 