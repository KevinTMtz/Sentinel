import React from 'react';
import styled from 'styled-components';

import QuotesIcon from '../../../assets/svg/Quotes';
import Dots from '../../../assets/svg/Dots';

const Header = () => (
  <Wrapper id='home' className='container'>
    <LeftSide className='flexCenter'>
      <div>
        <h1 className='extraBold font60'>We are Sentinel.</h1>
        <HeaderP className='font14 semiBold'>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum.
        </HeaderP>
      </div>
    </LeftSide>
    <RightSide>
      <ImageWrapper>
        <Img
          className='radius8'
          src={'//via.placeholder.com/426x607/000000/FFFFFF/?426x607'}
          alt='office'
          style={{ zIndex: 9 }}
        />
        <QuoteWrapper className='flexCenter darkBg radius8'>
          <QuotesWrapper>
            <QuotesIcon />
          </QuotesWrapper>
          <div>
            <p className='font15 whiteColor'>
              <em>
                Friends, such as we desire, are dreams and fables. Friendship
                demands the ability to do without it.
              </em>
            </p>
            <p
              className='font14 orangeColor textRight'
              style={{ marginTop: '10px' }}
            >
              Ralph Waldo Emerson
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
