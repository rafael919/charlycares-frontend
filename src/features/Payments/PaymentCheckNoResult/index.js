import { FormattedMessage } from 'react-intl';
import { Grid, Form, Header } from 'semantic-ui-react';
import BasicButton from 'Components/Buttons/Basic';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Label from 'Components/Label';
import Layout from 'Components/Layout';
import React from 'react';


const PaymentCheckNoResult = ({
  values,
  next,
  previous,
  handleChange,
  errors,
  setErrors,
  touched,
  handleBlur,
  setTouched,
  user,
}) => {
  return (
    <Layout onNavBack={previous}>
      <CustomRow>
        <CustomColumn width={16}>
          <Header as="h3">
            <FormattedMessage id="signup.family.firstStep.header" />
          </Header>
          <Form>
            <Form.Field>
              <Label>
                <FormattedMessage id="signup.family.firstStep.firstName" />
              </Label>
              
            </Form.Field>
            <Form.Field>
              <Label>
                <FormattedMessage id="signup.family.firstStep.lastName" />
              </Label>
              
            </Form.Field>
          </Form>
        </CustomColumn>
      </CustomRow>
      <Grid.Row verticalAlign="middle">
        <CustomColumn width={16}>
          <BasicButton
            // primary={
            //   touched.firstStepFamily &&
            //   !errors.firstStepFamily &&
            //   Object.keys(touched.firstStepFamily).length > 0
            // }
            // onClick={onNextStep('firstStepFamily')({
            //   schema: firstStepFamily,
            //   values,
            //   setErrors,
            //   setTouched,
            //   next,
            //   fields: ['name', 'lastName'],
            // })}
            fluid
          >
            <FormattedMessage id="signup.family.firstStep.btn" />
          </BasicButton>
        </CustomColumn>
      </Grid.Row>
    </Layout>
  );
};

export default PaymentCheckNoResult;
