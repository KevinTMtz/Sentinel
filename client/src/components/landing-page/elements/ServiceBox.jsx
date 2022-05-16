import React from 'react';
import styled from 'styled-components';

import RollerIcon from '../../../assets/svg/Services/RollerIcon';
import MonitorIcon from '../../../assets/svg/Services/MonitorIcon';
import BrowserIcon from '../../../assets/svg/Services/BrowserIcon';
import PrinterIcon from '../../../assets/svg/Services/PrinterIcon';

const ServiceBox = ({ icon, title, subtitle }) => {
  const getIcon = () => {
    switch (icon) {
      case 'roller':
        return <RollerIcon />;
      case 'monitor':
        return <MonitorIcon />;
      case 'browser':
        return <BrowserIcon />;
      case 'printer':
        return <PrinterIcon />;
      default:
        return <RollerIcon />;
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
  padding: 40px 0;
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
