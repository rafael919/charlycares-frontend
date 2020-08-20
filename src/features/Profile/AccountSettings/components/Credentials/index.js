import { Form } from 'semantic-ui-react';
import { FormattedMessage, injectIntl } from 'react-intl';
import CustomInput from 'Components/CustomInput';
import ErrorMessage from 'Components/ErrorMessage';
import Label from 'Components/Label';
import React from 'react';

import Container from '../Container';
import EditButton from '../../../components/EditButton';
import Heading from '../Heading';

const Credentials = ({
  email,
  password,
  intl,
  onEdit,
  onChange,
  emailRef,
  passwordRef,
  onCredentialsFocusOut,
  handleFacebookData,
  onFBConnectFailure,
}) => {
  return (
    <Container>
      <Heading>
        <FormattedMessage id="profile.family.credentials" />
      </Heading>
      <Form>
        <Form.Field>
          <Label>
            {intl.formatMessage({ id: 'profile.family.credentials.email' })}
          </Label>
          <CustomInput
            refKey={emailRef}
            readOnly={!email.edited}
            name="email"
            type="email"
            transparent
            action={<EditButton onClick={onEdit('email')} />}
            value={email.value}
            onChange={onChange('email')}
            onBlur={onCredentialsFocusOut('email')}
          />
          {!email.valid && email.error && (
            <ErrorMessage>{email.error}</ErrorMessage>
          )}
        </Form.Field>
        <Form.Field>
          <Label>
            {intl.formatMessage({ id: 'profile.family.credentials.password' })}
          </Label>
          <CustomInput
            refKey={passwordRef}
            readOnly={!password.edited}
            name="password"
            type="password"
            transparent
            action={<EditButton onClick={onEdit('password')} />}
            value={password.value}
            onChange={onChange('password')}
            onBlur={onCredentialsFocusOut('password')}
          />
          {!password.valid && password.error && (
            <ErrorMessage>{password.error}</ErrorMessage>
          )}
        </Form.Field>
      </Form>
    </Container>
  );
};

export default injectIntl(Credentials);
