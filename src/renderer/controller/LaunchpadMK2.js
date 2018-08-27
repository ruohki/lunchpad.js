import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import buttonMask from '../../static/buttonmask.png';

import 'react-tippy/dist/tippy.css'
import { Tooltip, withTooltip } from 'react-tippy';

const PadContainerOuter = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
`;

const PadContainerInner = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

const PadRow = styled.div`
  display: flex;
  flex-grow: 1;
  
`

const PadCol = styled.div`
  flex-grow: 1;
  padding: 5px;
`

const AspectBoxOuter = styled.div`

  width: 100%;
  padding-top: 100%;
  position: relative;
  
  
`

const AspectBoxInner = styled.div`
background-size: cover;
  
background-image: url(${buttonMask});

border-radius: ${({round}) => round ? "999" : "7"}px;
  border: 0.3rem solid rgba(0,0,0,.25);
  border-bottom: .8rem solid rgba(0,0,0,.25);
  border-radius: ${({round}) => round ? "999" : "7"}px;
  background-color: ${({ color }) => color};
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  &:hover {
    border: 0.3rem solid rgba(0,0,0,.30);
    border-bottom: .8rem solid rgba(0,0,0,.30);
  }

  &:active{
    margin-top: 0.2rem;
    border-bottom: 0.3rem solid rgba(0,0,0,.30);
  }
`

const AspectBoxContainer = styled.div`

  padding: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Button = ({ caption, round, color }) => {
  const Button = (
    <AspectBoxOuter round={round} >
      <AspectBoxInner round={round} color={color}>
        <AspectBoxContainer>
          {caption}
        </AspectBoxContainer>
      </AspectBoxInner>
    </AspectBoxOuter>
  )

  return caption.length > 6 ? (
    <Tooltip
      arrow={true}
      offset={0}
      distance={0}
      title={caption}
      size="big"
      position="bottom"
      trigger="mouseenter"
    >
      {Button}
    </Tooltip>
  ) : Button
}

export const Launchpad = ({ buttons = {}, btn = new Map()}) => (
  <PadContainerOuter>
    <PadContainerInner>
      {/* TopBar */}
      <PadRow>
        {_.range(0,8).map(i => {
          const btnConfig = btn.get(104 + i) || { color: 0, pressed: false}

          return (
            <PadCol key={`top-${i}`}>
              <Button
                round
                color={btnConfig.pressed ? 'red' : 'gray'}
                caption={i}
              />
            </PadCol>
          )
        }
        )}
        <PadCol />
      </PadRow>
      {_.range(0, 8).map(y => 
        <PadRow key={`row-${y}`}>
          {_.range(0,9).map(x => {
            const buttonIndex = y * 8 + x;
            const LPIndex = 81 - (y * 10) + x
            const btnConfig = btn.get(LPIndex) || { color: 0, pressed: false}
            return (
              <PadCol key={`col-${y}-${x}`}>
                {x === 8 ? <Button
                              round
                              color={btnConfig.pressed ? 'red' : 'gray'}
                              key={`side-${y}`}
                              caption={y}
                            />
                         : <Button
                              color={btnConfig.pressed ? 'red' : 'gray'}
                              key={`btn-${x}`}
                              caption={LPIndex}
                           />
                }
              </PadCol>
            )
          }
          )}
        </PadRow>
      )}
    </PadContainerInner>
  </PadContainerOuter>
)