import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Box, Button, Typography } from '@mui/material';

function RenderSeparateField({ otherPartyMode, fieldDetails, control, attributeValueMap }) {
  const { watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldDetails.id,
  });

  const addHandler = () => {
    append();
  };

  const deleteHandler = (index) => {
    remove(index);
  };

  useEffect(() => {
    console.log('attribute value map in render separate field --->', attributeValueMap);
    if (fields.length === 0) {
      append();
    }
  }, [fields]);
  return (
    <>
      {fields.map((field, index) => {
        return (
          <>
            <Typography sx={{ mb: 1, fontSize: '12px' }}>
              Field {index + 1}
              {index === 0 && (
                <Typography sx={{ fontSize: '10px' }}>
                  {'('}This field will be used to form a list{')'}
                </Typography>
              )}
            </Typography>
            <RenderFieldBasedOnType
              index={index}
              otherPartyMode={otherPartyMode}
              fieldDetails={{ ...fieldDetails, id: `${fieldDetails.id}[${index}]` }}
              attributeValueMap={attributeValueMap}
              control={control}
            />
            <Box component={'div'} sx={{ textAlign: 'right', mt: 0.5, mb: 1 }}>
              <Button
                size={'small'}
                onClick={() => deleteHandler(index)}
                variant="outlined"
                color="error"
              >
                Delete{' '}
              </Button>
              {index === fields.length - 1 && (
                <Button
                  size={'small'}
                  sx={{ ml: 1 }}
                  onClick={() => addHandler()}
                  variant="contained"
                >
                  Add{' '}
                </Button>
              )}
            </Box>
          </>
        );
      })}
    </>
  );
}

export default RenderSeparateField;
