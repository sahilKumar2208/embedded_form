import * as React from 'react';
import Iconify from 'src/components/iconify/iconify';
import { useTheme } from '@mui/material/styles';
import { CardContent, Stack, Typography, CircularProgress, alpha } from '@mui/material';

export default function BasicCard(props) {
  const theme = useTheme();
  return (
    <>
      <CardContent>
        <Stack direction="row" spacing={2}>
          <Stack
            sx={{
              width: '18%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Stack alignItems="center" justifyContent="center" sx={{ position: 'relative' }}>
              <Iconify
                icon={'ic:round-receipt'}
                width={24}
                sx={{
                  color: theme.palette.info.main,
                  position: 'absolute',
                }}
              />

              <CircularProgress
                variant="determinate"
                value={100}
                size={56}
                thickness={4}
                sx={{
                  color: (theme) => alpha(theme.palette.info.main, 0.16),
                  opacity: 0.48,
                }}
              />

              <CircularProgress
                variant="determinate"
                value={100}
                size={56}
                thickness={4}
                sx={{
                  top: 0,
                  left: 0,
                  opacity: 0.48,
                  position: 'absolute',
                  color: (theme) => theme.palette.info.main,
                }}
              />
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="h6" component="div">
              {props.type}
            </Typography>
            <Typography variant="p" color="text.secondary">
              {props.data.description}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </>
  );
}
