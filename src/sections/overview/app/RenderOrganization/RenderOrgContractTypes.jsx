import { Box, Card, Grid } from '@mui/material';
import BasicCard from 'src/utils/BasicCard';

export const RenderOrgContractTypes = ({ contractTypes }) => {
  console.log('contractTypes tab', contractTypes);
  return (
    <>
      <Box sx={{ width: '100%' }}>
        {' '}
        <Grid container spacing={2} sx={{ minWidth: '100%' }}>
          {contractTypes &&
            contractTypes.length > 0 &&
            contractTypes.map((res, index) => (
              <Grid item xs={12} sm={6}>
                <Card
                  sx={{
                    minWidth: '200px',
                    marginTop: '10px',
                  }}
                  key={index}
                >
                  <BasicCard data={res} type={res.contractType} />
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};
