import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

const Logo = styled.img.attrs({
  alt: 'Charly Cares',
})`
	margin: auto;
	${isMobile ? 'margin-top: -2rem' : 'margin-top: 12rem'};
  height: 4rem;
`;

export default Logo;
