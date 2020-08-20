import ContentLoader, { List, Facebook } from 'react-content-loader';
import React from 'react';
import styled from 'styled-components';
import checkIcon from "Assets/icons/check.svg";

const Container = styled.div`
  width: 100%;
  padding: 1rem 0 !important;
`;

const BookingsContainer = styled.div`
  padding: 3.5rem 1.12rem 1rem 1.25rem;
  width: 100%;
`;
const NoPaddingContainer = styled.div`
  width: 100%;
`;
const ContainerWithHorizontalPadding = styled.div`
  padding: 0 1rem;
  width: 100%;
`;

export const ProgressiveList = ({ isLoading, repeat, ...props }) => {
  return (
    isLoading && (
      <Container>
        <List {...props} />
        <List {...props} />
        <List {...props} />
        <List {...props} />
      </Container>
    )
  );
};

export const ProgressivePayments = ({ isLoading, repeat, ...props }) => {
  return (
    isLoading && (
      <ContainerWithHorizontalPadding>
        {[...Array(4)].map((_, i) => {
          return (
            <ContentLoader
              height={160}
              width={400}
              speed={2}
              primaryColor="#f3f3f3"
              secondaryColor="#ecebeb"
              key={i}
              {...props}
            >
              <rect x="37" y="44.05" rx="0" ry="0" width="0" height="0" />
              <rect x="303" y="45.05" rx="0" ry="0" width="14" height="1" />
              <rect
                x="0"
                y="137.01"
                rx="0"
                ry="0"
                width="401.88"
                height="2.04"
              />
              <rect
                x="7"
                y="21.05"
                rx="0"
                ry="0"
                width="105.04"
                height="77.77"
              />
              <rect
                x="119"
                y="29.05"
                rx="0"
                ry="0"
                width="95.2"
                height="18.96"
              />
              <rect
                x="121"
                y="76.22"
                rx="0"
                ry="0"
                width="80.66"
                height="8.879999999999999"
              />
              <rect x="302" y="32.05" rx="0" ry="0" width="93" height="16.96" />
              <rect x="332" y="75.05" rx="0" ry="0" width="61" height="10" />
              <rect x="72" y="74.05" rx="0" ry="0" width="0" height="0" />
            </ContentLoader>
          );
        })}
      </ContainerWithHorizontalPadding>
    )
  );
};


export const ProgressiveBookings = ({ isLoading, repeat, ...props }) => {
  return (
    isLoading && (
      <BookingsContainer>
        {[...Array(4)].map((_, i) => {
          return (
            <ContentLoader
              height={160}
              width={400}
              speed={2}
              primaryColor="#d9d9d9"
              secondaryColor="#eee"
              {...props}
              key={i}
            >
              <rect x="37" y="44.05" rx="0" ry="0" width="0" height="0" />
              <rect
                x="29.03"
                y="22.8"
                rx="0"
                ry="0"
                width="136"
                height="16.099999999999998"
                transform="rotate(0.21, 29.03, 22.8)"
              />
              <rect x="-2" y="99.05" rx="0" ry="0" width="168" height="7" />
              <rect x="1" y="60.05" rx="0" ry="0" width="153" height="14" />
              <circle
                cx="13.539936203984453"
                cy="32.58993620398445"
                r="12.539936203984453"
              />
              <rect
                x="285.39"
                y="22.65"
                rx="0"
                ry="0"
                width="116.39"
                height="16.53"
              />
              <rect x="303" y="45.05" rx="0" ry="0" width="14" height="1" />
              <rect x="300" y="64.05" rx="0" ry="0" width="81" height="7" />
              <circle
                cx="392.68770222135794"
                cy="66.63770222135793"
                r="7.587702221357926"
              />
              <rect
                x="0"
                y="137.01"
                rx="0"
                ry="0"
                width="401.88"
                height="2.04"
              />
            </ContentLoader>
          );
        })}
      </BookingsContainer>
    )
  );
};

const TextWrapper = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 99999;
  background: rgba(255,255,255, 0.7);
  width: calc(100vw - 2.9rem);
  font-family: ${({theme}) => theme.primaryFont};
  font-size: 1rem;
  padding: 1rem 0 1rem 2.3125rem;
  display: flex;
  align-items: center;

`;

const Icon = styled.img`
  display: inline-block;
  margin-right: 0.5rem;
`;

export const ProgressiveAngels = ({ isLoading, repeat, ...props }) => {
  return (
    isLoading && (
      <BookingsContainer>
      <TextWrapper>
            <Icon src={checkIcon} /> Persoonlijk gescreend op kantoor
      </TextWrapper>
        {[...Array(4)].map((_, i) => {
          return (
            <ContentLoader
              height={160}
              width={400}
              speed={2}
              primaryColor="#d9d9d9"
              secondaryColor="#eee"
              {...props}
              key={i}
            >
              <rect x="37" y="44.05" rx="0" ry="0" width="0" height="0" />
              <rect
                x="29.03"
                y="22.8"
                rx="0"
                ry="0"
                width="136"
                height="16.099999999999998"
                transform="rotate(0.21, 29.03, 22.8)"
              />
              <rect x="-2" y="99.05" rx="0" ry="0" width="168" height="7" />
              <rect x="1" y="60.05" rx="0" ry="0" width="153" height="14" />
              <circle
                cx="13.539936203984453"
                cy="32.58993620398445"
                r="12.539936203984453"
              />
              <rect
                x="285.39"
                y="22.65"
                rx="0"
                ry="0"
                width="116.39"
                height="16.53"
              />
              <rect x="303" y="45.05" rx="0" ry="0" width="14" height="1" />
              <rect x="300" y="64.05" rx="0" ry="0" width="81" height="7" />
              <circle
                cx="392.68770222135794"
                cy="66.63770222135793"
                r="7.587702221357926"
              />
              <rect
                x="0"
                y="137.01"
                rx="0"
                ry="0"
                width="401.88"
                height="2.04"
              />
            </ContentLoader>
          );
        })}
      </BookingsContainer>
    )
  );
};

export const ProgressivePaymentsCheck = ({ isLoading, repeat, ...props,width }) => {
  return (
    isLoading && (
      <BookingsContainer>
        {[...Array(3)].map((_, i) => {
          return (
            <ContentLoader
              height={110}
              width={width}
              speed={2}
              primaryColor="#e2e2e2"
              secondaryColor="#f4f4f4"
              {...props}
              key={i}
            >
            <circle
              cx="21.096122866536405"
              cy="49.1461228665364"
              r="21.0961228665364"
            />
            <rect x="56" y="32.05" rx="5" ry="5" width="154" height="10" />
            <rect x="56" y="58.05" rx="5" ry="5" width="154" height="10" />
            <rect x="290" y="32.05" rx="5" ry="5" width="71" height="10" />
            <rect
                x="0"
                y="107.01"
                rx="0"
                ry="0"
                width="401.88"
                height="0.9"
              />
            </ContentLoader>
          );
        })}
      </BookingsContainer>
    )
  );
};

export const ProgressiveConversations = ({ isLoading, repeat, ...props }) => {
  return (
    isLoading && (
      <Container>
        {[...Array(4)].map((_, i) => {
          return (
            <ContentLoader
              height={90}
              key={i}
              width={400}
              speed={2}
              primaryColor="#f3f3f3"
              secondaryColor="#ecebeb"
              {...props}
            >
              <circle cx="55.4" cy="30.5" r="30.2" />
              <rect
                x="95.5"
                y="0"
                rx="0"
                ry="0"
                width="95.96"
                height="17"
              />

              <rect
                x="95.5"
                y="32.05"
                rx="0"
                ry="0"
                width="195.96"
                height="9"
              />

              <rect
                x="95.5"
                y="47.05"
                rx="0"
                ry="0"
                width="170.96"
                height="9"
              />

              <rect
                x="291.5"
                y="0.0"
                rx="0"
                ry="0"
                width="45.96"
                height="15"
              />

              
            </ContentLoader>
          );
        })}
      </Container>
    )
  );
};

export const ProgressiveFacebook = ({ isLoading, repeat, ...props }) => {
  return (
    isLoading && (
      <div style={{ padding: '1rem 1.25rem' }}>
        <Facebook key="1" {...props} />
        <Facebook key="2" {...props} />
        <Facebook key="3" {...props} />
        <Facebook key="4" {...props} />
      </div>
    )
  );
};

export const TimerLoader = ({ isLoading, ...rest }) =>
  isLoading && (
    <div style={{ padding: '1rem 1.25rem' }}>
      <ContentLoader
        height={190}
        width={375}
        speed={4}
        primaryColor="#f3f3f3"
        secondaryColor="#ffffff"
        {...rest}
      >
        <circle cx="46.2" cy="45.2" r="43.2" />
        <rect x="104.63" y="28.05" rx="0" ry="0" width="55" height="41" />
        <rect x="184.63" y="28.05" rx="0" ry="0" width="55" height="41" />
        <rect x="269.63" y="28.05" rx="0" ry="0" width="55" height="41" />
        <rect x="19.63" y="34.05" rx="0" ry="0" width="0" height="0" />
        <rect x="104.62" y="77.05" rx="0" ry="0" width="55" height="11" />
        <rect x="184.63" y="77.05" rx="0" ry="0" width="55" height="11" />
        <rect x="269.63" y="77.05" rx="0" ry="0" width="55" height="11" />
        <rect x="291.63" y="77.05" rx="0" ry="0" width="0" height="0" />
        <rect x="101.63" y="7.05" rx="0" ry="0" width="224" height="11" />
        <rect x="3.63" y="112.05" rx="0" ry="0" width="379" height="74.9" />
      </ContentLoader>
    </div>
  );

export const AngelLoader = ({ isLoading, ...rest }) =>
  isLoading && (
    <ContentLoader
      height={600}
      width={400}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
      {...rest}
    >
      <circle cx="195.4" cy="96.92" r="59.4" />
      <rect x="127" y="164.05" rx="0" ry="0" width="141" height="41" />
      <rect x="145" y="216.05" rx="0" ry="0" width="108" height="10" />
      <rect x="115" y="240.05" rx="0" ry="0" width="172" height="9" />
      <rect x="0" y="290.05" rx="0" ry="0" width="344" height="8" />
      <rect x="0" y="318.05" rx="0" ry="0" width="291" height="8" />
      <rect x="1" y="348.05" rx="0" ry="0" width="267" height="8" />
      <rect x="-2" y="375.05" rx="0" ry="0" width="141" height="8" />
      <rect x="2" y="407.05" rx="0" ry="0" width="286" height="8" />
      <rect x="1" y="451.05" rx="0" ry="0" width="455" height="61" />
      <rect x="2" y="535.05" rx="0" ry="0" width="140" height="12" />
      <rect x="1" y="571.05" rx="0" ry="0" width="126" height="12" />
      <rect x="237" y="534.05" rx="0" ry="0" width="110" height="12" />
      <rect x="237" y="568.05" rx="0" ry="0" width="105" height="11.99" />
    </ContentLoader>
  );

export const ProgressiveMessages = ({ isLoading, ...props }) => {
  return isLoading ? (
    <NoPaddingContainer>
      {[...Array(4)].map((_, i) => {
        return (
          <ContentLoader
            height={160}
            key={i}
            width={400}
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
            {...props}
          >
            <rect x="0" y="16" rx="4" ry="4" width="117" height="12.16" />
            <rect
              x="275.37"
              y="20.05"
              rx="3"
              ry="3"
              width="123.25"
              height="6.34"
            />
            <rect x="1" y="67" rx="3" ry="3" width="350" height="6.4" />
            <rect x="0" y="82" rx="3" ry="3" width="380" height="6.4" />
            <rect x="1" y="97" rx="3" ry="3" width="201" height="6.4" />
            <rect x="3" y="137.05" rx="0" ry="0" width="398" height="2" />
          </ContentLoader>
        );
      })}
    </NoPaddingContainer>
  ) : null;
};

export const AngelPromoDashboard = ({ isLoading, ...props }) => {
  return isLoading ? (
    <ContainerWithHorizontalPadding>
      <ContentLoader
        height={360}
        width={400}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
        {...props}
      >
        <rect x="-1" y="25.05" rx="4" ry="4" width="117" height="15.69" />
        <rect x="320" y="21.05" rx="3" ry="3" width="81.34" height="27.07" />
        <rect x="1" y="61.05" rx="0" ry="0" width="42" height="43" />
        <rect x="59" y="62.05" rx="0" ry="0" width="193" height="6" />
        <rect x="60" y="78.05" rx="0" ry="0" width="174" height="6" />
        <rect x="60" y="94.05" rx="0" ry="0" width="141" height="6" />
        <rect x="60" y="111.05" rx="0" ry="0" width="172" height="6" />
        <rect x="59" y="127.05" rx="0" ry="0" width="159" height="6" />
        <rect x="3" y="247.05" rx="0" ry="0" width="181.35" height="82" />
        <rect x="203" y="247.05" rx="0" ry="0" width="200.1" height="80.36" />
        <rect x="317" y="63.05" rx="0" ry="0" width="86" height="19" />
      </ContentLoader>
    </ContainerWithHorizontalPadding>
  ) : null;
};
export const PaymentsLoader = ({ isLoading, copies = 3, ...props }) => {
  return isLoading ? (
    <ContainerWithHorizontalPadding>
      {Array.from(Array(copies), (item, i) => {
        return (
          <ContentLoader
            key={i}
            height={96}
            width={400}
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
            {...props}
          >
            <rect x="0" y="100" rx="3" ry="3" width="380" height="6.4" />
            <rect x="0" y="120" rx="3" ry="3" width="201" height="6.4" />
            <circle
              cx="34.096122866536405"
              cy="49.1461228665364"
              r="21.0961228665364"
            />
            <rect x="79" y="31.05" rx="0" ry="0" width="74" height="18" />
            <rect x="79" y="61.05" rx="0" ry="0" width="72" height="8" />
            <rect x="310" y="36.05" rx="0" ry="0" width="81" height="11" />
            <rect x="321" y="60.05" rx="0" ry="0" width="70" height="8.03" />
            <rect x="15" y="90.76" rx="0" ry="0" width="378" height="5.04" />
          </ContentLoader>
        );
      })}
    </ContainerWithHorizontalPadding>
  ) : null;
};
