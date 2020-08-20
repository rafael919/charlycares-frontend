import { List, Image } from 'semantic-ui-react';
import CustomRow from 'Components/CustomRow';
import Heading from 'Components/CustomRow';
import React, { Fragment } from 'react';

import btnCheck from 'Assets/icons/btn-check.svg';
import child from 'Assets/icons/child.svg';

import CardGrid from '../CardGrid';

const Children = ({ onChildSelect, childrenList, selectedChildren }) => {
  return (
    <CardGrid>
      <CustomRow padding="1.875em 0 0.8em 0">
        <Heading as="h4">Which children?</Heading>
      </CustomRow>
      <CustomRow padding="0.8em 0 3rem 0">
        <List
          onItemClick={onChildSelect}
          style={{ width: '100%' }}
          verticalAlign="middle"
          relaxed="very"
          items={childrenList.map(c => {
            return {
              key: c.id,
              content: (
                <Fragment>
                  {selectedChildren && selectedChildren.includes(c.id) ? (
                    <List.Content floated="right">
                      <Image avatar src={btnCheck} />
                    </List.Content>
                  ) : null}

                  <Image avatar src={child} />
                  <List.Content>
                    <List.Description>
                      {c.monthsOld >= 12
                        ? `${Math.floor(
                            c.monthsOld / 12
                          )} years, ${c.monthsOld % 12} months`
                        : `${c.monthsOld} months`}
                    </List.Description>
                  </List.Content>
                </Fragment>
              ),
              'data-value': c.id,
            };
          })}
        />
      </CustomRow>
    </CardGrid>
  );
};

export default Children;
