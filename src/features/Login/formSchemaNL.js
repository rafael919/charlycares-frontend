import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Dit veld is verplicht')
    .email('E-mail is ongeldig'),
  password: yup
  	.string()
  	.required('Dit veld is verplicht'),
});

export default loginSchema;
