//@flow

import { ObjectSchema } from 'yup';

export const onNextStep = (currentStep: string): Function => ({
  schema,
  values,
  setErrors,
  setTouched,
  next,
  fields,
  additionalCondition,
  postalCodeChecking,
  callback,
}: {
  schema: ObjectSchema,
  values: {
    firstStep?: {
      name: string,
      lastName: string,
    },
    secondStep?: {
      email: string,
      password: string,
    },
    thirdStep?: {
      postalCode: string,
      streetNumber: string,
      landCode: string,
      phone: string,
    },
    fourthStep?: {
      children: [],
    },
  },
  setErrors: Function,
  setTouched: Function,
  next: Function,
  fields: Array<string>,
  additionalCondition: boolean,
  callback: Function,
}) => (): void => {
  let schemaObj = {};

  fields.forEach(field => {
    schemaObj[field] = values[currentStep][field];
  });
  schema
    .validate(schemaObj, { abortEarly: false })
    .then(valid => {
      if (postalCodeChecking && typeof postalCodeChecking === 'function') {
        callback();
        return postalCodeChecking();
      }
      if (additionalCondition !== undefined) {
        if (valid && additionalCondition && callback) {
          callback();
          return next();
        } else {
          if (valid && additionalCondition) {
            return next();
          }
        }
      } else {
        if (valid) {
          callback();
          return next();
        }
      }
    })
    .catch(({ errors, ...rest }) => {
      let errorsObj = {};
      let touchedObj = {};
      fields.forEach((field, i) => {
        if (!errors[i]) return;
        errorsObj[field] = errors[i];
      });
      fields.forEach(field => {
        touchedObj[field] = true;
      });

      setErrors({
        [currentStep]: errorsObj,
      });
      setTouched({
        [currentStep]: touchedObj,
      });
    });
};
