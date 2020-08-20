import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import FeatureDesc from './components/FeatureDesc';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 !important;
  text-align: left;
`;

const renderResponseTimeDesc = value => {
  return (
    <span>
      <FormattedMessage id="booking.angel.responseTimeDesc" /> {`${value}min`}
    </span>
  );
};

const listOfLanguages = languages => {
  let list = [];
  for (let prop in languages) {
    switch (prop) {
      case 'dutch':
        if (languages[prop] === true) {
          list.push(prop);
        }
        break;
      case 'italian':
        if (languages[prop] === true) {
          list.push(prop);
        }
        break;
      case 'english':
        if (languages[prop] === true) {
          list.push(prop);
        }
        break;
      case 'french':
        if (languages[prop] === true) {
          list.push(prop);
        }
        break;
      case 'german':
        if (languages[prop] === true) {
          list.push(prop);
        }
        break;
      case 'spanish':
        if (languages[prop] === true) {
          list.push(prop);
        }
        break;

      default:
        break;
    }
  }
  return list;
};

const renderLanguages = languages => {
  if (languages) {
    return (
      <div>
        {languages.map((lang, i) => {
          if (!languages[i + 1]) {
            return (
              <span key={lang}>
                <FormattedMessage id={`languages.${lang}`} />
              </span>
            );
          }
          return (
            <span key={lang}>
              <FormattedMessage id={`languages.${lang}`} />,{' '}
            </span>
          );
        })}
      </div>
    );
  }
  return null;
};

const FeaturesSection = ({
  responseTime,
  languages,
  education,
  areaOfInterest,
  openInfoScreeningModal, 
}) => (
  <Container>
    <FeatureDesc
      info={openInfoScreeningModal}
      feature={<FormattedMessage id="booking.angel.screening" />}
      desc={<FormattedMessage id="booking.angel.personallyScreened" />}
    />
    <FeatureDesc
      feature={<FormattedMessage id="booking.angel.responseTime" />}
      desc={renderResponseTimeDesc(responseTime ? responseTime : 60)}
    />
    <FeatureDesc
      feature={<FormattedMessage id="booking.angel.languages" />}
      desc={renderLanguages(listOfLanguages(languages))}
    />
    <FeatureDesc
      feature={<FormattedMessage id="booking.angel.education" />}
      desc={education}
    />
    <FeatureDesc
      feature={<FormattedMessage id="booking.angel.areaOfInterest" />}
      desc={areaOfInterest}
    />
  </Container>
);

export default FeaturesSection;
