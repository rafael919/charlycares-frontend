import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required()
    .email('Please provide a valid email'),
  password: yup
  	.string()
  	.required('This field is required'),
});

export default loginSchema;
