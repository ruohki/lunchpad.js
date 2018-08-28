import React from 'react';

import { injectGlobal } from 'styled-components';
import { fontFace } from 'polished';

import { COLOR_DARKER, COLOR_WHITE } from './constants';

injectGlobal`
  ${fontFace({
    fontFamily: 'Proxima Nova',
    fontFilePath: '/fonts/proxima-regular',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fileFormats: ['ttf'],
  })}
  ${fontFace({
    fontFamily: 'Proxima Nova',
    fontFilePath: '/fonts/proxima-regularit',
    fontWeight: 'normal',
    fontStyle: 'italic',
    fileFormats: ['ttf'],
  })}
  ${fontFace({
    fontFamily: 'Proxima Nova',
    fontFilePath: '/fonts/proxima-bold',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fileFormats: ['ttf'],
  })}
  ${fontFace({
    fontFamily: 'Proxima Nova',
    fontFilePath: '/fonts/proxima-boldit',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fileFormats: ['ttf'],
  })}
  ${fontFace({
    fontFamily: 'Proxima Nova',
    fontFilePath: '/fonts/proxima-light',
    fontWeight: '200',
    fontStyle: 'normal',
    fileFormats: ['ttf'],
  })}

  html {
    font-size: 62.5%;
    //font-size: calc(16px + (20 - 16) * (100vw - 320px) / (1280 - 320));
  }

  * {
    margin: 0;
    padding: 0;

    overflow: hidden;
    user-select: none;

    box-sizing: border-box;
  }

  body {
    font-family: Proxima Nova;
    
    font-size: 1.6rem;
    font-weight: normal;
    font-style: normal;

    color: ${COLOR_WHITE};
    background-color: ${COLOR_DARKER};
  }
`;
