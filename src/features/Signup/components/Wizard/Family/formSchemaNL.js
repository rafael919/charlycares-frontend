import * as yup from 'yup';

export const firstStepFamily = yup.object().shape({
  name: yup.string().required('Dit veld is verplicht'),
  lastName: yup.string().required('Dit veld is verplicht'),
});

export const secondStepFamily = yup.object().shape({
  email: yup
    .string()
    .email('E-mail is niet geldig')
    .required('Dit veld is verplicht'),
  password: yup
    .string()
    .min(6, 'Wachtwoord dient minsten 6 tekens te hebben')
    .required('Dit veld is verplicht'),
  terms: yup.boolean().test({
    name: 'termsCheck',
    exclusive: true,
    message: 'Accepteer de Algemene Voorwaarden',
    test: value => value === true,
  }),
  privacy: yup.boolean().test({
    name: 'privacyCheck',
    exclusive: true,
    message: 'Accepteer de Privacy Policy',
    test: value => value === true,
  }),
});

export const thirdStepFamily = yup.object().shape({
  postalCode: yup
    .string()
    .required('Dit veld is verplicht')
    .matches(/^\d{4}[A-Za-z]{2}$/, {
      message: 'Postcode is niet geldig',
      excludeEmptyString: true,
    }),
  streetNumber: yup.string().required('Dit veld is verplicht'),
  landCode: yup.string().required('Dit veld is verplicht'),
  phone: yup.string().required('Dit veld is verplicht'),
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
    .test('langs', 'Selecteer tenminste 1 taal', value => {
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
