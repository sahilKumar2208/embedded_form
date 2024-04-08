import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { Delete, ExpandMore } from '@mui/icons-material';
import { useFieldArray } from 'react-hook-form';
import { UserDetailForm } from './UserDetailForm';

export const AddOtherUserForm = ({ levelIndex, methods, handleDeleteLevel, userGroups }) => {
  const { control } = methods;
  const { fields } = useFieldArray({ control, name: `otherUsers.${levelIndex}` });

  return (
    <>
      <Accordion elevation={2} sx={{ borderRadius: '10px' }} defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Grid container>
            <Grid
              xs={12}
              md={12}
              sm={12}
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                allignItems: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}
              >
                <Button onClick={(e) => handleDeleteLevel(e, levelIndex)}>
                  <Delete />
                </Button>
              </Box>
              <Typography variant="h5" sx={{ mt: 0.5 }}>
                User {levelIndex}
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <UserDetailForm levelIndex={levelIndex} userGroups={userGroups} />
        </AccordionDetails>
      </Accordion>
    </>
  );
};
