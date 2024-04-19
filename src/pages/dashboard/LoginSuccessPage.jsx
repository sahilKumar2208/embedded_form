import { Box, Card, CardContent, Grid, Paper, Typography } from '@mui/material';
import Logo from 'src/components/logo';
export default function LoginSuccessPage() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          padding: 4,
          margin: 5,
        }}
      >
        <Logo mb={3} />
        <Typography variant="h6" color={'primary'}>
          You have successfully logged in, please close this tab!
        </Typography>
      </Paper>
    </Box>
  );
}
