import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';

import ServiceBox from '../elements/ServiceBox';
import { Link } from 'react-scroll';

const Services = () => (
  <Wrapper id='services'>
    <div style={{ padding: '60px 0' }}>
      <div className='container'>
        <HeaderInfo>
          <h1 className='font40 extraBold'>Our awesome services</h1>
          <p className='font14'>
            Sentinel offers a variety of services in order to accommodate what
            you need and what you are looking for.
          </p>
        </HeaderInfo>
        <ServiceBoxRow className='flex'>
          <ServiceBoxWrapper>
            <ServiceBox
              icon='browser'
              title='Search report'
              subtitle='Know what are the statistics of the tweets regarding a topic at any time.'
            />
          </ServiceBoxWrapper>
          <ServiceBoxWrapper>
            <ServiceBox
              icon='monitor'
              title='Sentiment analysis'
              subtitle='Obtain information on the feelings that the public has regarding any topic.'
            />
          </ServiceBoxWrapper>
          <ServiceBoxWrapper>
            <ServiceBox
              icon='printer'
              title='Topic subscriptions'
              subtitle='Search for a topic, subscribe and receive regular reports about it.'
            />
          </ServiceBoxWrapper>
        </ServiceBoxRow>
      </div>
      <div>
        <div className='container'>
          <Advertising className='flexSpaceCenter'>
            <AddLeft>
              <h2 className='font40 extraBold'>A few words from us</h2>
              <p className='font14'>
                Sentinel was formed by creative, innovative students that wanted
                to facilitate the process of data analytics so that any
                enterpriese could reach their top. We are dedicated to provide
                an easier, always avaiable and faster way to know your public
                and better satisfy their needs.
              </p>
              <ButtonsRow
                className='flexNullCenter'
                style={{ margin: '30px 0', justifyContent: 'center' }}
              >
                <div style={{ width: '190px', marginLeft: '15px' }}>
                  <Link
                    className='whiteColor animate pointer font14'
                    to='contact'
                    smooth={true}
                    offset={-80}
                  >
                    <Button variant='contained'>Contact Us</Button>
                  </Link>
                </div>
              </ButtonsRow>
            </AddLeft>
            <AddRight>
              <AddRightImg
                className='radius8'
                src={
                  'https://firebasestorage.googleapis.com/v0/b/sentinel-52dd6.appspot.com/o/second.jpg?alt=media&token=707d95df-ac14-49c3-8216-25c6a47c573f'
                }
                alt='office'
              />
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
  justify-content: space-around;
  @media (max-width: 860px) {
    flex-direction: column;
  }
`;

const ServiceBoxWrapper = styled.div`
  width: 30%;
  padding: 32px 0;
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
  margin: 32px 0 0 0;
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
  display: flex;
  justify-content: center;
  @media (max-width: 860px) {
    width: 80%;
  }
`;

const AddRightImg = styled.img`
  width: 80%;
  margin-left: auto;
  @media (max-width: 860px) {
    margin: auto;
  }
`;

export default Services;
