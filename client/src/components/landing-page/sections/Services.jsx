import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';

import ServiceBox from '../elements/ServiceBox';

const Services = () => (
  <Wrapper id='services'>
    <div style={{ padding: '60px 0' }}>
      <div className='container'>
        <HeaderInfo>
          <h1 className='font40 extraBold'>Our Awesome Services</h1>
          <p className='font14'>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut
            <br />
            labore et dolore magna aliquyam erat, sed diam voluptua.
          </p>
        </HeaderInfo>
        <ServiceBoxRow className='flex'>
          <ServiceBoxWrapper>
            <ServiceBox
              icon='roller'
              title='Graphic Design'
              subtitle='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
            />
          </ServiceBoxWrapper>
          <ServiceBoxWrapper>
            <ServiceBox
              icon='monitor'
              title='Web Design'
              subtitle='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore.'
            />
          </ServiceBoxWrapper>
          <ServiceBoxWrapper>
            <ServiceBox
              icon='browser'
              title='Development'
              subtitle='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.'
            />
          </ServiceBoxWrapper>
          <ServiceBoxWrapper>
            <ServiceBox
              icon='printer'
              title='Print'
              subtitle='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.'
            />
          </ServiceBoxWrapper>
        </ServiceBoxRow>
      </div>
      <div>
        <div className='container'>
          <Advertising className='flexSpaceCenter'>
            <AddLeft>
              <h4 className='font15 semiBold'>A few words about company</h4>
              <h2 className='font40 extraBold'>A Study of Creativity</h2>
              <p className='font14'>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum.
              </p>
              <ButtonsRow
                className='flexNullCenter'
                style={{ margin: '30px 0' }}
              >
                <div style={{ width: '190px' }}>
                  <Button variant='contained'>Get Started</Button>
                </div>
                <div style={{ width: '190px', marginLeft: '15px' }}>
                  <Button variant='contained'>Contact Us</Button>
                </div>
              </ButtonsRow>
            </AddLeft>
            <AddRight>
              <AddRightInner>
                <div className='flexNullCenter'>
                  <AddImgWrapp1 className='flexCenter'>
                    <img
                      src={
                        '//via.placeholder.com/285x406/000000/FFFFFF/?285x406'
                      }
                      alt='office'
                    />
                  </AddImgWrapp1>
                  <AddImgWrapp2>
                    <img
                      src={
                        '//via.placeholder.com/197x333/000000/FFFFFF/?197x333'
                      }
                      alt='office'
                    />
                  </AddImgWrapp2>
                </div>
                <div className='flexNullCenter'>
                  <AddImgWrapp3>
                    <img
                      src={
                        '//via.placeholder.com/112x125/000000/FFFFFF/?112x125'
                      }
                      alt='office'
                    />
                  </AddImgWrapp3>
                  <AddImgWrapp4>
                    <img
                      src={
                        '//via.placeholder.com/197x224/000000/FFFFFF/?197x224'
                      }
                      alt='office'
                    />
                  </AddImgWrapp4>
                </div>
              </AddRightInner>
            </AddRight>
          </Advertising>
        </div>
      </div>
    </div>
  </Wrapper>
);

const Wrapper = styled.section`
  width: 100%;
`;

const ServiceBoxRow = styled.div`
  @media (max-width: 860px) {
    flex-direction: column;
  }
`;

const ServiceBoxWrapper = styled.div`
  width: 20%;
  margin-right: 5%;
  padding: 80px 0;
  @media (max-width: 860px) {
    width: 100%;
    text-align: center;
    padding: 40px 0;
  }
`;

const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;

const Advertising = styled.div`
  margin: 32px 0;
  padding: 32px 0;
  position: relative;
  @media (max-width: 1160px) {
    padding: 100px 0 40px 0;
  }
  @media (max-width: 860px) {
    flex-direction: column;
    padding: 0 0 30px 0;
    margin: 80px 0 0px 0;
  }
`;

const ButtonsRow = styled.div`
  @media (max-width: 860px) {
    justify-content: space-between;
  }
`;

const AddLeft = styled.div`
  width: 50%;
  p {
    max-width: 475px;
  }
  @media (max-width: 860px) {
    width: 80%;
    order: 2;
    text-align: center;
    h2 {
      line-height: 3rem;
      margin: 15px 0;
    }
    p {
      margin: 0 auto;
    }
  }
`;

const AddRight = styled.div`
  width: 50%;
  position: absolute;
  top: -70px;
  right: 0;
  @media (max-width: 860px) {
    width: 80%;
    position: relative;
    order: 1;
    top: -40px;
  }
`;

const AddRightInner = styled.div`
  width: 100%;
`;

const AddImgWrapp1 = styled.div`
  width: 48%;
  margin: 0 6% 10px 6%;
  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;

const AddImgWrapp2 = styled.div`
  width: 30%;
  margin: 0 5% 10px 5%;
  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;

const AddImgWrapp3 = styled.div`
  width: 20%;
  margin-left: 40%;
  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;

const AddImgWrapp4 = styled.div`
  width: 30%;
  margin: 0 5%auto;
  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;

export default Services;
