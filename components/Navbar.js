import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';

const title = 'Todo';

export function Navbar({ onLogout }) {
  return (
    <Box sx={styles.container}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={styles.title}>
            {title}
          </Typography>
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const styles = {
  container: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
};
