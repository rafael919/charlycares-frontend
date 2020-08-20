import { object, string } from 'yup';

export default object().shape({
  password: string()
    .min(6, 'Password must have at least 6 characters')
    .required('Field is required'),
});
