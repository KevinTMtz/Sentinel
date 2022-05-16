import React from 'react';
import { Button } from '@mui/material';
import styled from 'styled-components';

const Contact = () => (
  <Wrapper id='contact'>
    <div className='container'>
      <HeaderInfo>
        <h1 className='font40 extraBold'>Let's get in touch</h1>
        <p className='font14'>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut
          <br />
          labore et dolore magna aliquyam erat, sed diam voluptua.
        </p>
      </HeaderInfo>
      <div className='row' style={{ paddingBottom: '30px' }}>
        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
          <Form>
            <label className='font14'>First name:</label>
            <input type='text' className='font20 extraBold' />
            <label className='font14'>Email:</label>
            <input type='text' className='font20 extraBold' />
            <label className='font14'>Subject:</label>
            <input type='text' className='font20 extraBold' />
            <textarea rows='2' type='text' className='font20 extraBold' />
          </Form>
          <SumbitWrapper className='flex'>
            <Button variant='contained'>Send Message</Button>
          </SumbitWrapper>
        </div>
      </div>
    </div>
  </Wrapper>
);

const Wrapper = styled.section`
  width: 100%;
  @media (max-width: 860px) {
    padding: 0 32px;
  }
`;

const HeaderInfo = styled.div`
  padding: 32px 0;
  @media (max-width: 860px) {
    text-align: center;
  }
`;

const Form = styled.form`
  padding: 8px 0;
  input,
  textarea {
    width: 100%;
    background-color: transparent;
    border: 0px;
    outline: none;
    box-shadow: none;
    border-bottom: 1px solid #707070;
    height: 30px;
    margin-bottom: 30px;
  }
  textarea {
    min-height: 100px;
  }
`;

const SumbitWrapper = styled.div`
  @media (max-width: 991px) {
    width: 100%;
    margin-bottom: 50px;
  }
`;

export default Contact;
