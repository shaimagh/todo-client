import {
  Avatar,
  Grid,
  Box,
  Container,
  Typography,
  colors
} from '@mui/material';
import Link from 'next/link';

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
              <Link href="/register" variant="body2">
                <Typography color={colors.blue.A700} sx={styles.registerLink}>
                  {"Don't have an account? Sign Up"}
                </Typography>
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
  },
  registerLink: {
    cursor: 'pointer'
  }
};
