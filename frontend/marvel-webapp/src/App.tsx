import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import MoviesPerActor from "./pages/MoviesPerActor";
import ActorsWithMultipleCharacters from "./pages/ActorsWithMultipleCharacters";
import CharactersWithMultipleActors from "./pages/CharactersWithMultipleActors";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const App: React.FC = () => {
  return (
    <Router>
      <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Marvel Explorer
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button color="inherit" component={Link} to="/movies-per-actor">
                Movies Per Actor
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/actors-with-multiple-characters"
              >
                Actors with Multiple Characters
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/characters-with-multiple-actors"
              >
                Characters with Multiple Actors
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
        <Container
          maxWidth="md"
          sx={{
            mt: 4,
            mb: 4,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 2,
            p: 3,
          }}
        >
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/movies-per-actor" replace />}
            />
            <Route path="/movies-per-actor" element={<MoviesPerActor />} />
            <Route
              path="/actors-with-multiple-characters"
              element={<ActorsWithMultipleCharacters />}
            />
            <Route
              path="/characters-with-multiple-actors"
              element={<CharactersWithMultipleActors />}
            />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
};

export default App;
