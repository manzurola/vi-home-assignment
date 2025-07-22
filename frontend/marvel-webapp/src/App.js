import React, { useState } from 'react';
import MoviesPerActor from './components/MoviesPerActor';
import ActorsWithMultipleCharacters from './components/ActorsWithMultipleCharacters';
import CharactersWithMultipleActors from './components/CharactersWithMultipleActors';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {
  const [tab, setTab] = useState(0);
  const handleTabChange = (event, newValue) => setTab(newValue);

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Marvel Explorer
          </Typography>
        </Toolbar>
        <Tabs value={tab} onChange={handleTabChange} centered textColor="inherit" indicatorColor="secondary">
          <Tab label="Movies Per Actor" />
          <Tab label="Actors with Multiple Characters" />
          <Tab label="Characters with Multiple Actors" />
        </Tabs>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4, bgcolor: 'white', borderRadius: 2, boxShadow: 2, p: 3 }}>
        {tab === 0 && <MoviesPerActor />}
        {tab === 1 && <ActorsWithMultipleCharacters />}
        {tab === 2 && <CharactersWithMultipleActors />}
      </Container>
    </Box>
  );
}

export default App;
