import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const Container = styled.div`
width: 50%;
margin: 0 auto;
max-width: 700px;
min-width: 500px;
padding: 5%;
`;
export const Header = styled.header`
  text-align: center;
  font-size: 2.5em;
  text-transform: uppercase;
  margin-bottom: 2em;
`;

export const Form = styled.form`
padding: 10%;

`;
export const Label = styled.label`
  font-size: 1.3em;
  display: block;
  margin-bottom: 0.5em;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  height: 3rem;
  font-size: 1.3em;
  margin-bottom: 2em;
  border-radius: 0.5em;
  border: 1px solid black;
  padding: 0 0.8rem;

`;
export const Error = styled.div`
  color: red;
  margin-top: -2.4em;
  margin-left: 1em;
`;
export const Button = styled.button`
  width: 100%;
  margin-top: 1em;
  background-color: #e6e6e6;
  height: 3em;
  border: none;
  border-radius: 0.5em;
`;
export const _Link = styled(Link)`
  text-align: center;
  display: block;

`;