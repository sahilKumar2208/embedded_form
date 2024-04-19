import * as yup from 'yup';

const epochDateValidator = (value) => {
  if (isNaN(value)) {
    return false; // Not a number, fail validation
  }
  const date = new Date(value);
  return !isNaN(date.getTime()); // Valid if the date is valid
};

export const getSchema = (data) =>
  {
    if(!data){
       return yup.object()
    }
    return data.reduce((yupSchema, field) => {
    const {
      id,
      isMandatory,
      detailedLabel,
      label,
      type,
      listId,
      counterpartyIndividualMandatoryFields,
      counterpartyOrgMandatoryFields,
      counterpartyOrgPersonMandatoryFields,
    } = field;

    let fieldSchema;
    if (
      type === 'address' ||
      type === 'monetary' ||
      type === 'duration' ||
      type === 'phone' ||
      type === 'counterpartyIndividual' ||
      type === 'counterpartyOrgPerson' ||
      type === 'counterpartyOrg'
    ) {
      fieldSchema = yup.object();
    } else {
      if (type === 'multiSelect') {
        fieldSchema = yup.array();
      } else {
        if (type === 'date') {
          fieldSchema = yup
            .mixed() // Use mixed to accept any type
            .required('Date is required') // Make it required
            .test('is-date', 'Invalid date format', epochDateValidator);
        } else {
          fieldSchema = yup.string();
        }
      }
    }
    if (type === 'email') {
      if (isMandatory) {
        fieldSchema = fieldSchema
          .email('Invalid email format')
          .required(`${detailedLabel} is required`);
      }
    }
    if (type === 'text') {
      if (isMandatory) {
        fieldSchema = fieldSchema.required(`The ${detailedLabel} field is required.`);
      }
    }
    if (type === 'paragraph') {
      if (isMandatory) {
        fieldSchema = fieldSchema.required(`The ${detailedLabel} field is required.`);
      }
    }

    if (type === 'multiSelect') {
      if (isMandatory) {
        fieldSchema = fieldSchema
          .min(1, `${detailedLabel}, Mimum one is required to be selected.`)
          .required('This field is required');
      }
    }
    if (type === 'string') {
      if (isMandatory) {
        fieldSchema = fieldSchema.required(`The ${detailedLabel} field is required.`);
      }
    }
    if (type === 'options') {
      if (isMandatory) {
        fieldSchema = fieldSchema.required(`The ${detailedLabel} field is required.`);
      }
    }
    if (type === 'date') {
      if (isMandatory) {
        fieldSchema = fieldSchema.required(`The ${detailedLabel} field is required.`);
      }
    }
    if (type === 'boolean') {
      if (isMandatory) {
        fieldSchema = fieldSchema.required(`The ${detailedLabel} field is required`);
      }
    }
    if (type === 'number') {
      if (isMandatory) {
        fieldSchema = fieldSchema
          .required(`The ${detailedLabel} field is required.`)
          .matches(/^[+-]?\d*\.?\d+$/, `The ${detailedLabel} should be a number.`);
      }
    }

    if (type === 'monetary') {
      fieldSchema = fieldSchema.shape({
        currencyType: yup.string().required(`Currency Type is required for ${detailedLabel}.`),
        amount: yup
          .string()
          .test('is-valid-value', `Value is required as number for ${detailedLabel}`, (value) => {
            return /^\d{1,3}(,?\d{1,3})*(\.\d+)?$/.test(value.trim());
            //  /^\d{1,3}(,?\d{1,3})*$/.test(value.trim())
          })
          .required(`Amount is required for ${detailedLabel}.`),
      });
    }
    if (type === 'duration') {
      fieldSchema = fieldSchema.shape({
        durationLabel: yup.string().required(`Duration type is required for ${detailedLabel}.`),
        durationValue: yup
          .string()
          .test(`is-valid-value", "Amount is required as number for ${detailedLabel}`, (value) => {
            return /^\d{1,3}(,?\d{1,3})*(\.\d+)?$/.test(value.trim());
            //  /^\d{1,3}(,?\d{1,3})*$/.test(value.trim())
          })
          .required(`Amount is required for ${detailedLabel}.`),
      });
    }
    if (type === 'phone') {
      fieldSchema = fieldSchema.shape({
        // countryCode: yup.string().required(`Currency Type is required for ${label}.`),
        number: yup
          .string()
          .matches(
            /^[0-9()+\- ]+$/, // You can adjust this regex for your specific phone number format
            'Invalid phone number'
          )
          .required(`${detailedLabel} is required.`),
      });
    }
    if (type === 'address') {
      if (isMandatory) {
        fieldSchema = fieldSchema.shape({
          // addressLine1: yup.string().required(`Line 1 is is required for ${detailedLabel}.`),
          city: yup.string().required(`City is required for ${detailedLabel}.`),
          country: yup.string().required(`Country is required for ${detailedLabel}.`),
          postCode: yup
            .mixed()
            .test('is-valid-value', 'Please Enter a zip/post code', (value) => {
              return (
                value === undefined ||
                value === '' ||
                value === null ||
                /^\d{5,10}$/.test(value.trim())
              );
            })
            .nullable(),
        });
      }
    }
    if (type === 'counterpartyIndividual') {
      // fieldSchema = yup.object({
      //   ...fieldSchema.fields,
      //   counterpartyUser: yup.object({required})
      // })
      for (let key in counterpartyIndividualMandatoryFields) {
        if (counterpartyIndividualMandatoryFields[key]) {
          if (key === 'addressMandatory') {
            fieldSchema = yup.object({
              ...fieldSchema.fields,
              address: yup.object().shape({
                city: yup.string().required(`City is required for ${detailedLabel}.`),
                country: yup.string().required(`Country is required for ${detailedLabel}.`),
              }),
            });
          }
          if (key === 'fullNameMandatory') {
            fieldSchema = yup.object({
              ...fieldSchema.fields,
              fullName: yup.string().required('Full name is required.'),
            });
          }
          if (key === 'firstNameMandatory') {
            fieldSchema = yup.object({
              ...fieldSchema.fields,
              firstName: yup.string().required('First name is required.'),
            });
          }
          if (key === 'lastNameMandatory') {
            fieldSchema = yup.object({
              ...fieldSchema.fields,
              lastName: yup.string().required('Last name is required.'),
            });
          }
          if (key === 'emailMandatory') {
            fieldSchema = yup.object({
              ...fieldSchema.fields,
              email: yup.string().email('Invalid email format').required('Email is required'),
            });
          }
          if (key === 'jobTitleMandatory') {
            fieldSchema = yup.object({
              ...fieldSchema.fields,
              jobTitle: yup.string().required('Job title is required.'),
            });
          }
          fieldSchema = fieldSchema
            .required(`${label} is required`)
            .typeError(`${label} is required`);
        }
      }
    }
    if (type === 'counterpartyOrgPerson') {
      for (let key in counterpartyOrgPersonMandatoryFields) {
        if (counterpartyOrgPersonMandatoryFields[key]) {
          if (key === 'addressMandatory') {
            fieldSchema = yup.object({
              ...fieldSchema.fields,
              address: yup.object().shape({
                city: yup.string().required(`City is required for ${detailedLabel}.`),
                country: yup.string().required(`Country is required for ${detailedLabel}.`),
              }),
            });
          }
          if (key === 'fullNameMandatory') {
            fieldSchema = yup.object({
              ...fieldSchema.fields,
              fullName: yup.string().required('Full name is required.'),
            });
          }
          if (key === 'firstNameMandatory') {
            fieldSchema = yup.object({
              ...fieldSchema.fields,
              firstName: yup.string().required('First name is required.'),
            });
          }
          if (key === 'lastNameMandatory') {
            fieldSchema = yup.object({
              ...fieldSchema.fields,
              lastName: yup.string().required('Last name is required.'),
            });
          }
          if (key === 'emailMandatory') {
            fieldSchema = yup.object({
              ...fieldSchema.fields,
              email: yup.string().email('Invalid email format').required('Email is required'),
            });
          }
          if (key === 'jobTitleMandatory') {
            fieldSchema = yup.object({
              ...fieldSchema.fields,
              jobTitle: yup.string().required('Job title is required.'),
            });
          }
          fieldSchema = fieldSchema
            .required(`${label}' Person is required`)
            .typeError(`${label} is required`);
        }
      }
    }
    if (type === 'counterpartyOrg') {
      for (let key in counterpartyOrgMandatoryFields) {
        if (counterpartyOrgMandatoryFields[key]) {
          if (key === 'addressMandatory') {
            fieldSchema = yup.object({
              ...fieldSchema.fields,
              companyAddress: yup.object().shape({
                city: yup.string().required(`City is required for ${detailedLabel}.`),
                country: yup.string().required(`Country is required for ${detailedLabel}.`),
              }),
            });
          }
          if (key === 'registeredNameMandatory') {
            fieldSchema = yup.object({
              ...fieldSchema.fields,
              registeredName: yup.string().required('Full name is required.'),
            });
          }
          if (key === 'jurisdictionMandatory') {
            fieldSchema = yup.object({
              ...fieldSchema.fields,
              jurisdiction: yup.string().required('First name is required.'),
            });
          }
          fieldSchema = fieldSchema
            .required(`${label} is required`)
            .typeError(`${label} is required`);
        }
      }
    }
    if (
      type === 'counterpartyOrg' ||
      type === 'counterpartyOrgPerson' ||
      type === 'counterpartyIndividual' ||
      !listId
    ) {
      return yupSchema.concat(yup.object({ [id]: fieldSchema }));
    }

    return yupSchema.concat(
      // yup
      // .array()
      yup.object({ [id]: yup.array().of(fieldSchema).min(1, 'Minimum one field is required.') })
      // .min(1, "Minimum one field is required")
    );
  }, yup.object())};
