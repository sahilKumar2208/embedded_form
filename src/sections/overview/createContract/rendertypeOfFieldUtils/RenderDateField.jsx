import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import moment from 'moment/moment';
import { format } from 'date-fns';
import { useEffect } from 'react';

export default function RenderDateField({ otherPartyMode, control, fieldDetails }) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  useEffect(() => {
    if (watch(fieldDetails.id)) {
      console.log(
        typeof watch(fieldDetails.id),
        watch(fieldDetails.id),
        'messi and ronaldo are overhdjfk'
      );
      const date = new Date(watch(fieldDetails.id)); //gives invalid date

      if (isNaN(date.getTime())) {
        return;
      }
      console.log(typeof date, date, 'date printed overhrejdk');
      const transformedNewValue = format(date, 'dd-MM-yyyy');

      if (!transformedNewValue) {
        return;
      }
      setValue(fieldDetails.id, moment.utc(transformedNewValue, 'DD-MM-YYYY').valueOf());
    }
    const hello = 'hello';
    console.log(typeof hello, typeof watch(fieldDetails.id), 'fielddetails.id');
    // setValue(fieldDetails.id,1710547200000)
  }, []);

  // console.log(fieldDetails, "feildDetailsDate")

  console.log(watch(), 'feildDetailsDate0');

  return (
    <Controller
      name={fieldDetails.id}
      control={control}
      render={({ field, fieldState: { error } }) => {
        console.log(field, 'date field');
        return (
          <DatePicker
            label={`${fieldDetails.label} ${fieldDetails.isMandatory ? '*' : ''}`}
            inputFormat="MM/dd/yyyy"
            value={!field.value ? '' : field.value}
            disabled={otherPartyMode}
            onChange={(newValue) => {
              console.log(newValue, 'feildDetailsDate1');
              try {
                const date = new Date(newValue);
                console.log(date, 'feildDetailsDate2');
                if (!date) {
                  return;
                }
                console.log('hjdkjdksjlkd');
                const transformedNewValue = format(date, 'dd-MM-yyyy');
                console.log(transformedNewValue, 'feildDetailsDate3');

                const arrayOfDate = transformedNewValue.split('-');

                if (arrayOfDate.length !== 3) {
                  return;
                }

                if (parseInt(arrayOfDate[2]) < 1900) {
                  return;
                }

                if (parseInt(arrayOfDate[1]) > 12 || parseInt(arrayOfDate[1]) < 0) {
                  return;
                }

                if (parseInt(arrayOfDate[0]) > 31 || parseInt(arrayOfDate[0]) < 0) {
                  return;
                }

                if (!transformedNewValue) {
                  return;
                }
                setValue(fieldDetails.id, moment.utc(transformedNewValue, 'DD-MM-YYYY').valueOf());
              } catch (e) {}
            }}
            renderInput={(params) => (
              <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
            )}
          />
        );
      }}
    />
  );
}
