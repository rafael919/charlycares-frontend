import * as yup from 'yup';

export const firstStepFamily = yup.object().shape({
  name: yup.string().required('Field is required'),
  lastName: yup.string().required('Field is required'),
});

export const secondStepFamily = yup.object().shape({
  email: yup
    .string()
    .email('Email is not valid')
    .required('Field is required'),
  password: yup
    .string()
    .min(6, 'Password must have at least 6 characters')
    .required('Field is required'),
  terms: yup.boolean().test({
    name: 'termsCheck',
    exclusive: true,
    message: 'Must Accept Terms and Conditions',
    test: value => value === true,
  }),
  privacy: yup.boolean().test({
    name: 'privacyCheck',
    exclusive: true,
    message: 'Must Accept Privacy Policy',
    test: value => value === true,
  }),
});

export const thirdStepFamily = yup.object().shape({
  postalCode: yup
    .string()
    .required('Field is required')
    .matches(/^\d{4}[A-Za-z]{2}$/, {
      message: 'Postal code is not valid',
      excludeEmptyString: true,
    }),
  streetNumber: yup.string().required('Field is required'),
  landCode: yup.string().required('Field is required'),
  phone: yup.string().required('Field is required'),
});

export const fourthStepFamily = yup.object().shape({
  children: yup.array().notRequired(),
});

export const fourthBStepFamily = yup.object().shape({
  languages: yup
    .object()
    .shape({
      dutch: yup.boolean(),
      english: yup.boolean(),
      french: yup.boolean(),
      german: yup.boolean(),
      spanish: yup.boolean(),
      italian: yup.boolean(),
    })
    .test('langs', '*You must select at least one language!', value => {
      return Object.entries(value).some(item => item[1] === true);
    }),
});

const signupSchema = yup.object().shape({
  firstStepFamily,
  secondStepFamily,
  thirdStepFamily,
  fourthStepFamily,
  fourthBStepFamily,
});

export default signupSchema;
