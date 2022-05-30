import React from 'react';
import styled from 'styled-components';

import MonitorIcon from '../../../assets/svg/Services/MonitorIcon';
import BrowserIcon from '../../../assets/svg/Services/BrowserIcon';
import PrinterIcon from '../../../assets/svg/Services/PrinterIcon';

const ServiceBox = ({ icon, title, subtitle }) => {
  const getIcon = () => {
    switch (icon) {
      case 'monitor':
        return <MonitorIcon />;
      case 'browser':
        return <BrowserIcon />;
      case 'printer':
        return <PrinterIcon />;
      default:
        return <BrowserIcon />;
    }
  };

  return (
    <Wrapper className='flex flexColumn'>
      <IconStyle>{getIcon()}</IconStyle>
      <TitleStyle className='font20 extraBold'>{title}</TitleStyle>
      <SubtitleStyle className='font14'>{subtitle}</SubtitleStyle>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const IconStyle = styled.div`
  @media (max-width: 860px) {
    margin: 0 auto;
  }
`;

const TitleStyle = styled.h2`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 16px 0;
  @media (max-width: 860px) {
    padding: 20px 0;
  }
`;
const SubtitleStyle = styled.p`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;

export default ServiceBox;
