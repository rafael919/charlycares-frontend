import { Icon } from 'semantic-ui-react';
import React from 'react';
import BasicButton from 'Components/Buttons/Basic';
import ErrorContainer from '../components/ErrorContainer';
import ErrorText from '../components/ErrorText';

const WithConfirm = ({ errors, onErrorConfirm }) => {
  return (
    <ErrorContainer>
      <Icon style={{ color: '#d9d9d9' }} size="huge" name="warning circle" />
      <ErrorText errors={errors} />
      <BasicButton fluid onClick={onErrorConfirm}>
        OK
      </BasicButton>
    </ErrorContainer>
  );
};

export default WithConfirm;
