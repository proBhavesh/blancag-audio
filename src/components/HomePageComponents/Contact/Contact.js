import React, { useState } from 'react';
import styled from 'styled-components';
import emailjs from 'emailjs-com';

import HR from '../../HR';
import { Container } from '../../../hoc/Container';

const ContactDiv = styled.div`
  margin: 2rem auto;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'a b'
    'c c';
  width: 65%;

  margin: 2rem auto calc(2rem + 15px);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas: 'a' 'b' 'c';
  }

  @media (max-width: 481px) {
    width: 100%;
    margin: 2rem auto calc(2.5rem + 10px);
  }

  input,
  textarea {
    color: #000;
    font-family: inherit;
    font-size: 1rem;
    font-weight: bold;

    padding: 0.5em;

    border: 3px solid #000;
    background-color: #fff;
    outline: none;

    @media (max-width: 768px) {
      margin-bottom: 0.5rem;
      padding: 1em 0.5em;
    }
  }

  input::placeholder,
  textarea::placeholder {
    color: #a6a6a6;
    opacity: 1;
    font-weight: bold;
  }

  textarea {
    grid-area: b;
    @media (max-width: 768px) {
      min-height: 150px;
    }
  }
`;

const InputDiv = styled.div`
  grid-area: a;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  grid-area: c;
  margin: 0.5rem 0 0;
  transform: translatex(-10px);

  @media (max-width: 768px) {
    margin: 0;
  }

  color: #000;
  background-color: #cccccc;
  box-shadow: 1px 1px #505050, 2px 2px #505050, 3px 3px #505050, 4px 4px #505050,
    5px 5px #505050, 6px 6px #505050, 7px 7px #505050, 8px 8px #505050;

  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;

  justify-self: end;

  outline: none;
  cursor: pointer;
  transition: 0.12s ease;

  &:hover {
    background-color: #bada55;
    box-shadow: 0 0 #000;
    transform: translate(-3px, 10px);
  }
`;

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    const {
      REACT_APP_SERVICE_ID,
      REACT_APP_TEMPLATE_ID,
      REACT_APP_USER_ID,
    } = process.env;

    emailjs
      .send(
        REACT_APP_SERVICE_ID,
        REACT_APP_TEMPLATE_ID,
        {
          name: name,
          email: email,
          subject: subject,
          message: message,
        },
        REACT_APP_USER_ID
      )
      .then((res) => {
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      })
      .catch((error) => console.log(error.text));
  };

  return (
    <>
      <Container>
        <ContactDiv>
          <h2>Contact</h2>
          <Form onSubmit={(e) => sendEmail(e)}>
            <InputDiv>
              <input
                type='text'
                name='name'
                placeholder='Name *'
                required
                autoComplete='off'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type='email'
                name='email'
                placeholder='Email *'
                required
                pattern='[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+'
                autoComplete='off'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type='text'
                name='subject'
                placeholder='Subject'
                autoComplete='off'
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </InputDiv>
            <textarea
              name='message'
              placeholder='Message *'
              required
              autoComplete='off'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <Button>Send</Button>
          </Form>
        </ContactDiv>
      </Container>
      <HR />
    </>
  );
};

export default Contact;
