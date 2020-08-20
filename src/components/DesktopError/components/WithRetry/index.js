import { Modal, Segment } from 'semantic-ui-react';
import React from 'react';
import BasicButton from 'Components/Buttons/Basic';
import ErrorText from '../components/ErrorText';

const WithRetry = ({ onRetry, errors }) => {
  return (
    <Modal open={Boolean(errors)}>
      <Modal.Header>Oops! Something went wrong :(</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <ErrorText errors={errors} />
        </Modal.Description>
        <Segment textAlign="right" vertical basic>
          <BasicButton basicBtn onClick={onRetry}>
            Try again
          </BasicButton>
        </Segment>
      </Modal.Content>
    </Modal>
  );
};

export default WithRetry;
