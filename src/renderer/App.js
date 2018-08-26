import React, { Component } from 'react';
import _ from 'lodash';

import { Main, Split, Child } from './components/layout';
import LPButton from './components/LPButton';

import midi from 'midi';

class App extends Component {
  constructor(props) {
    super(props);

    let buttons = {}
    _.range(0, 8).map(y => 
      _.range(0, 8).map(x => 
        buttons[81 - (y * 10) + x] = { color: 0, pressed: false}
      )
    )
    this.state = {
      buttons
    }
  }

  componentDidMount() {
    let buttons = {}
    

    this.midiInput = new midi.input();
    this.midiOutput = new midi.output();

    this.midiInput.on('message', (deltaTime, [id, key, val]) => {
      let pressed = val ? true : false

      if (id === 144 /* Normal Keys */) {
        if (key % 10 === 9 /* Side Bar Keys */ ) {
          this.launchpadSideKeyEvent(key/*  % 9 - 1< */, pressed);
        } else {
          this.launchpadKeyEvent(key, pressed);
        }
      } else if (id === 176 /* Top Row Keys*/) {
        this.launchpadTopKeyEvent(key/*  % 104 */, pressed)
      }
    });

    this.midiInput.openPort(0);
  }

  launchpadKeyEvent(key, pressed) {
    this.setState(prevState => ({
      buttons: {
        ...prevState.buttons,
        [key]: {
          ...prevState.buttons[key],
          pressed
        }
      }
    }))
    
    console.log(`Main Button: ${key}, pressed: ${pressed}`)
  }

  launchpadTopKeyEvent(key, pressed) {
    console.log(`Top Button: ${key}, pressed: ${pressed}`)
  }

  launchpadSideKeyEvent(key, pressed) {
    console.log(`Side Button: ${key}, pressed: ${pressed}`)
  }

  render() {
    return (
      <Main>
        <Split direction="column">
          {_.range(0, 8).map(y => (
            <Split key={`row-${y}`} justify="center" items="stretch">
              {_.range(0, 8).map(x => {
                const buttonIndex = y * 8 + x;
                const LPIndex = 81 - (y * 10) + x
                return (
                  <Child key={`col-${x}`} fill={true} padding="5px">
                    <LPButton index={buttonIndex} color={this.state.buttons[LPIndex].pressed ? 'red' : 'light'}>{LPIndex}</LPButton>
                  </Child>
                )
              })}
            </Split>
          ))}
        </Split>
      </Main>
    )
  }
}

export default App;