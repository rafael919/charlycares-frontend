import { Icon } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import styled from 'styled-components';
import BasicButton from 'Components/Buttons/Basic';

const CustomIcon = styled(Icon)`
  &&& {
    position: absolute;
    right: 0.5rem;
  }
`;

const SelectedButton = ({...props, selected, onClick, maxNumberSelected }) => {
  return (
    <BasicButton disabled={maxNumberSelected && !selected} padding="0.6875rem 4rem" basicBtn={selected} primary={!selected} onClick={onClick}>
      {selected ? (
        <FormattedMessage id="booking.angel.selected" />
      ) : (
        <FormattedMessage id="booking.angel.addAngel" />
      )}
      {!selected ? <CustomIcon name="plus" /> : null}
    </BasicButton>
  );
};

export default SelectedButton;
