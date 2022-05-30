import React, { useRef } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import emailjs from '@emailjs/browser';

import { emailJSConfig } from '../../../config/email';

const Contact = () => {
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: any) => {
    e.preventDefault();

    if (form && form.current)
      emailjs
        .sendForm(
          emailJSConfig.serviceID,
          emailJSConfig.templateID,
          form.current,
          emailJSConfig.publicKey,
        )
        .then(
          (result) => {
            e.target.reset();
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          },
        );
  };

  return (
    <Wrapper id='contact'>
      <div className='container'>
        <HeaderInfo>
          <h1 className='font40 extraBold'>Let's get in touch</h1>
        </HeaderInfo>
        <div className='row' style={{ paddingBottom: '30px' }}>
          <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
            <Form ref={form} onSubmit={(e) => sendEmail(e)}>
              <label className='font14'>First name:</label>
              <input
                type='text'
                name='user_name'
                className='font20 extraBold'
              />
              <label className='font14'>Email:</label>
              <input type='text' name='email' className='font20 extraBold' />
              <label className='font14'>Subject:</label>
              <input type='text' name='subject' className='font20 extraBold' />
              <label className='font14'>Message:</label>
              <textarea
                rows={2}
                className='font20 extraBold'
                name='message'
                style={{
                  resize: 'none',
                }}
              />
              <SumbitWrapper className='flex'>
                <Button variant='contained' type='submit'>
                  Send Message
                </Button>
              </SumbitWrapper>
            </Form>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

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
