import React from 'react';
import { Image, List } from 'semantic-ui-react';
import RemoveBtn from 'Components/RemoveBtn';
import styled from 'styled-components';
import deleteIcon from 'Assets/icons/delete.svg';
import childIcon from 'Assets/icons/child.svg';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import { isMobile } from 'react-device-detect';
import AddBtn from 'Components/Buttons/AddBtn';
import DateTime from 'react-datetime';

const DeleteIcon = styled(Image)`
  &&& {
    width: 20px;
    display: inline-block;
  }
`;

const ChildIcon = styled(Image)`
  &&& {
    width: 26px;
    margin-right: 0.6875rem !important;
    display: inline-block;
  }
`;

type Props = {
  date: string,
  removeChild: Function,
};

const renderKids = (children, removeChild) => {
  let childrenArr = Object.keys(children).map(function(key) {
    return {date: children[key], key: key};
  });
  return childrenArr.map((child, i) => {
    return (
      <List.Item key={i}>
        <List.Content floated="right">
          <RemoveBtn onClick={() => removeChild(child.key)} circular>
            <DeleteIcon avatar src={deleteIcon} />
          </RemoveBtn>
        </List.Content>
        <ChildIcon avatar src={childIcon} />
        <List.Content>{moment(child.date, 'YYYY-MM-DD').format('MMMM DD, YYYY')}</List.Content>
      </List.Item>

    );
  });
}

const Children = ({ children, removeChild, addChild, currentView, showDateTimeModal}: Props) => {
  return (<Container>
      <Heading>
        <FormattedMessage id="profile.family.edit.kidsTitle" />
      </Heading>
      <Desc>
        <FormattedMessage id="profile.family.edit.kidsDesc" />
      </Desc>
      <List> 
        {renderKids(children, removeChild)}
      </List>
      <AddBtn
        as="label"
        htmlFor="birthdate"
        padding="0 .78571429em"
        text={
          <FormattedMessage id="signup.family.fourthStep.addBtn" />
        }
      />
      {isMobile 
        ? (<HiddenDateInput 
            name="birthdate"
            id="birthdate"
            onBlur={addChild}
            type="date"
        />)
        : (showDateTimeModal && <DateTime
                      dateFormat="dd. DD MMMM"
                      viewMode={currentView}
                      timeFormat={false}
                      closeOnSelect
                      onChange={addChild}
                      renderInput={props => <DateInput {...props} />}
                      value={moment()}
                      inputProps={{
                        id: 'birthdate'
                      }}
                    />)}

    </Container>)
};

const HiddenDateInput = styled.input`
  width: 0rem;
  height: 0rem;
  opacity: 0;
  z-index: 999;
`
const Container = styled.div`
  padding: ${isMobile ? '1.25rem 1rem 1rem' : '1.25rem 0rem 1rem'};
  width: 100%;
`;

const DateInput = styled.input`
  opacity: 0; 
`;

const Heading = styled.h2`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Desc = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.grey};
`;



export default Children;
