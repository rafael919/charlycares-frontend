import { FormattedMessage } from 'react-intl';
import React from 'react';
import styled from 'styled-components';
import values from 'lodash.values';

const ErrorTextContainer = styled.div`
  color: #ccc;
  padding-top: 1em;
  padding-bottom: 3em;
  font-weight: 600;
  font-size: 1.2em;
  text-align: center;
  line-height: 1.5;
`;

const handleErrorObjAndString = errMsg => {
  if (typeof errMsg === 'object') {
    return values(errMsg).map((err, i) => {
      return <div key={i}>{err}</div>;
    });
  } else {
    return errMsg;
  }
};

const errorHandlerByStatusCode = errors => {
  const { response, code } = errors;

  if (code && code === 'ECONNABORTED') {
    return <FormattedMessage id="errors.timeout" />;
  }

  if (response && response.status >= 500) {
    return <FormattedMessage id="errors.generic" />;
  }
  if (response.data.message) {
    return handleErrorObjAndString(response.data.message);
  }
  if (response.data.error) {
    return handleErrorObjAndString(response.data.error);
  }

  if (errors.message) {
    return <FormattedMessage id="errors.generic" />;
  }

  if (typeof errors === 'string' && errors === 'Timeout') {
    return <FormattedMessage id="errors.timeout" />;
  }

  if (typeof errors === 'string' && errors === 'coupon not found') {
    return <FormattedMessage id="errors.couponNotValid" />;
  }
};

const ErrorText = ({ errors }) => (
  <ErrorTextContainer>{errorHandlerByStatusCode(errors)}</ErrorTextContainer>
);

export default ErrorText;
