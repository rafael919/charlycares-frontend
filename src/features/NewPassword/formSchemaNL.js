import { object, string } from 'yup';

export default object().shape({
  password: string()
    .min(6, 'Wachtwoord dient minimaal 6 tekens te hebben')
    .required('Veld is verplicht'),
});
