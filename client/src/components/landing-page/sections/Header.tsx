import React from 'react';
import styled from 'styled-components';

import QuotesIcon from '../../../assets/svg/Quotes';
import Dots from '../../../assets/svg/Dots';

const Header = () => (
  <Wrapper id='home' className='container'>
    <LeftSide className='flexCenter'>
      <div>
        <h1 className='extraBold font60'>We are Sentinel</h1>
        <HeaderP className='font14 semiBold'>
          Data analysis platform that guides you in the creation of digital
          content and facilitates the development of marketing strategies
        </HeaderP>
      </div>
    </LeftSide>
    <RightSide>
      <ImageWrapper>
        <Img
          className='radius8'
          src={
            'https://firebasestorage.googleapis.com/v0/b/sentinel-52dd6.appspot.com/o/main.jpg?alt=media&token=28d8f955-23c9-4467-9e20-11c84e2ac13f'
          }
          alt='office'
          style={{ zIndex: 9, maxWidth: '60%' }}
        />
        <QuoteWrapper className='flexCenter darkBg radius8'>
          <QuotesWrapper>
            <QuotesIcon />
          </QuotesWrapper>
          <div>
            <p className='font15 whiteColor'>
              <em>
                If you have today's information, you already know what will
                happen tomorrow.
              </em>
            </p>
            <p
              className='font14 orangeColor textRight'
              style={{ marginTop: '10px' }}
            >
              Kevin Torres Martínez
            </p>
          </div>
        </QuoteWrapper>
        <DotsWrapper>
          <Dots />
        </DotsWrapper>
      </ImageWrapper>
    </RightSide>
  </Wrapper>
);

const Wrapper = styled.section`
  padding-top: 16px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 32px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const LeftSide = styled.div`
  width: 100%;
  text-align: center;
`;

const RightSide = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const HeaderP = styled.div`
  max-width: 470px;
  padding: 16px 0;
  line-height: 1.5rem;
  @media (max-width: 960px) {
    padding: 15px 0 50px 0;
    text-align: center;
    max-width: 100%;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  z-index: 9;
  @media (max-width: 960px) {
    width: 100%;
    justify-content: center;
  }
`;

const Img = styled.img`
  @media (max-width: 560px) {
    width: 80%;
    height: auto;
  }
`;

const QuoteWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 50px;
  max-width: 330px;
  padding: 30px;
  z-index: 99;
  @media (max-width: 960px) {
    left: 20px;
  }
  @media (max-width: 560px) {
    bottom: -50px;
  }
`;

const QuotesWrapper = styled.div`
  position: absolute;
  left: -20px;
  top: -10px;
`;

const DotsWrapper = styled.div`
  position: absolute;
  right: -100px;
  bottom: 100px;
  z-index: 2;
  @media (max-width: 960px) {
    right: 100px;
  }
  @media (max-width: 560px) {
    display: none;
  }
`;

export default Header;
