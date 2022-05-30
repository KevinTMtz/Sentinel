import React from 'react';
import styled from 'styled-components';

import MonitorIcon from '../../../assets/svg/Services/MonitorIcon';
import BrowserIcon from '../../../assets/svg/Services/BrowserIcon';
import PrinterIcon from '../../../assets/svg/Services/PrinterIcon';
import CheckMark from '../../../assets/svg/Checkmark';

const PricingTable = ({ icon, price, title, text, offers }) => {
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
    <Wrapper className='radius8 shadow'>
      <div className='flexSpaceCenter'>
        {getIcon()}
        <p className='font30 extraBold'>{price}</p>
      </div>
      <div style={{ margin: '30px 0' }}>
        <h4 className='font30 extraBold'>{title}</h4>
        <p className='font14'>{text}</p>
      </div>
      <div>
        {offers
          ? offers.map((item, index) => (
              <div
                className='flexNullCenter'
                style={{ margin: '15px 0' }}
                key={index}
              >
                <div
                  style={{
                    position: 'relative',
                    top: '-1px',
                    marginRight: '15px',
                  }}
                >
                  {item.cheked ? (
                    <div style={{ minWidth: '20px' }}>
                      <CheckMark />
                    </div>
                  ) : (
                    <div style={{ minWidth: '20px' }}></div>
                  )}
                </div>
                <p className='font20 extraBold'>{item.name}</p>
              </div>
            ))
          : null}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  text-align: left;
  padding: 20px 30px;
  margin-top: 30px;
`;

export default PricingTable;
