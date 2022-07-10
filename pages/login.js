import { Avatar, Link, Grid, Box, Container, Typography } from '@mui/material';

import { LoginFormContainer } from '../containers';

export default function SignIn() {
  return (
    <Container component="main" maxWidth="xs">
      <Box sx={styles.container}>
        <Avatar
          sx={styles.avatar}
          src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
        />

        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <LoginFormContainer />
          <Grid container>
            <Grid item xs>
              <Link href="/signUp" variant="body2" color="#561571">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

const styles = {
  container: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    m: 1
  }
};
