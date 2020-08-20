import { Icon, Modal, Segment } from 'semantic-ui-react';
import BasicButton from 'Components/Buttons/Basic';
import React from 'react';

import ErrorText from '../components/ErrorText';

const WithConfirm = ({ errors, onErrorConfirm }) => {
  return (
    <Modal open={Boolean(errors)}>
      <Modal.Header>Oops! Something went wrong :(</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Icon
            style={{ color: '#d9d9d9' }}
            size="huge"
            name="warning circle"
          />
          <ErrorText errors={errors} />
          <Segment textAlign="right" vertical basic>
            <BasicButton basicBtn onClick={onErrorConfirm}>
              OK
            </BasicButton>
          </Segment>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default WithConfirm;
