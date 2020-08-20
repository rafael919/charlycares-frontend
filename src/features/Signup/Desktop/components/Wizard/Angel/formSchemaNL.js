import * as yup from 'yup';
import moment from 'moment';

export const firstStepAngel = yup.object().shape({
  name: yup.string().required('Dit veld is verplicht'),
  lastName: yup.string().required('Dit veld is verplicht'),
  birthdate: yup
    .string()
    .test('atLeast16', 'Angel moet minimaal 16 jaar zijn', value => {
      const before16 = moment().subtract(16, 'years');
      const date = moment(value, 'ddd MMM DD YYYY HH:mm:ss zZ');
      if (date.isSameOrBefore(before16, 'days')) {
        return true;
      }
      return false;
    })
    .required('Dit veld is verplicht')
});

export const secondStepAngel = yup.object().shape({
  email: yup
    .string()
    .email('E-mail is niet geldig')
    .required('Dit veld is verplicht'),
  password: yup
    .string()
    .min(6, 'Wachtwoord moet minimaal 6 tekens hebben')
    .required('Dit veld is verplicht'),
  terms: yup.boolean().test({
    name: 'termsCheck',
    message: 'Accepteer de Algemene Voorwaarden',
    test: value => value === true,
  }),
  privacy: yup.boolean().test({
    name: 'privacyCheck',
    message: 'Accepteer de Privacy Policy',
    test: value => value === true,
  }),
});

export const thirdStepAngel = yup.object().shape({
  postalCode: yup
    .string()
    .required('Dit veld is verplicht')
    .matches(/^\d{4}[A-Za-z]{2}$/, {
      message: 'Postal code is not valid',
      excludeEmptyString: true,
    }),
  streetNumber: yup.string().required('Dit veld is verplicht'),
  landCode: yup.string().required('Dit veld is verplicht'),
  phone: yup.string().required('Dit veld is verplicht'),
});

export const fourthStepAngel = yup.object().shape({
  education: yup.string().required('Dit veld is verplicht'),
  fieldOfStudy: yup.string().notRequired(),
});

export const fourthBStepAngel = yup.object().shape({
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
  firstStepAngel,
  secondStepAngel,
  thirdStepAngel,
  fourthStepAngel,
  fourthBStepAngel,
});

export default signupSchema;
