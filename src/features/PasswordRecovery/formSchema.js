import { object, string } from 'yup';

export default object().shape({
  email: string()
    .email('Email is not valid')
    .required('Field is required'),
  //   password: string()
  //     .min(6, 'Password must have at least 6 characters')
  //     .required('Field is required'),
});
