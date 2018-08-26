import React from 'react';
import styled from 'styled-components';

import buttonMask from '../../static/buttonmask.png';

const Button = styled.button`
  border: 2px solid rgba(0,0,0,.25);
  outline: none;
  border-radius: 7px;

  min-height: 48px;
  min-width: 48px;

  width: 100%;
  height: 100%;

  background-size: cover;
  background-color: ${({ color }) => color};
  background-image: url(${buttonMask});
`
const LPButton = ({ children, color = "light" }) => (
  <Button color={color}>{children}</Button>
)

export default LPButton