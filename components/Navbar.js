import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';

const title = 'Todo';

export function Navbar() {
  return (
    <Box sx={styles.container}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={styles.title}>
            {title}
          </Typography>
          <Button color="inherit">Login</Button>
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
