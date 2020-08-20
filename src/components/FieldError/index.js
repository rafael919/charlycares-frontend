type Props = {
  render: Function,
  field: string,
  errors: Object,
  touched: Object,
  additionalCondition: boolean,
  additionalConditionErrMsg: string,
};

const FieldError = ({
  render,
  field,
  errors,
  touched,
  additionalCondition,
  additionalConditionErrMsg,
}: Props): ? Function => {
  const stepAndField: string = field.split('.');
  if (stepAndField.length > 1) {
    const step: string = stepAndField[0];
    const fieldName: string = stepAndField[1];
    if (additionalCondition && touched[step] && touched[step][fieldName]) {
      return render(additionalConditionErrMsg);
    }
    if (errors[step] && touched[step]) {
      if (errors[step][fieldName] && touched[step][fieldName]) {
        return render();
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    if (additionalCondition && touched && touched[field]) {
      return render(additionalConditionErrMsg);
    }
    if (errors && touched) {
      if (errors[field] && touched[field]) {
        return render();
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
};

export default FieldError;