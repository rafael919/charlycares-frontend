import React, { Fragment } from 'react';
import CardGrid from '../CardGrid';
import CustomRow from 'Components/CustomRow';
import Heading from 'Components/CustomRow';
import { List, Image } from 'semantic-ui-react';
import check from 'Assets/icons/check.svg';
import home from 'Assets/icons/icn-feature-house.svg';

const Addresses = ({ onAddressSelect, addressList, selectedAddress }) => {
  return (
    <CardGrid>
      <CustomRow padding="1.875em 0 0.8em 0">
        <Heading as="h4">Which babysitting address?</Heading>
      </CustomRow>
      <CustomRow padding="0.8em 0">
        <List
          onItemClick={onAddressSelect}
          items={addressList.map(address => {
            return {
              key: address.title,
              content: (
                <Fragment>
                  {selectedAddress === address.title ? (
                    <List.Content floated="right">
                      <Image avatar src={check} />
                    </List.Content>
                  ) : null}

                  <Image avatar src={home} />

                  <List.Content>
                    <List.Header>{address.title}</List.Header>
                    <List.Description>{address.desc}</List.Description>
                  </List.Content>
                </Fragment>
              ),
              'data-value': address.title,
            };
          })}
          style={{ width: '100%' }}
          relaxed="very"
        />
      </CustomRow>
    </CardGrid>
  );
};

export default Addresses;
