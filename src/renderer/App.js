import React, { Component } from 'react';
import _ from 'lodash';
import midi from 'midi';
import settings from 'electron-settings';

import { Main, Split, Child } from './components/layout';
import LPButton from './components/LPButton';


const { Provider } = React.createContext({
  setKeyColor(key, color) {
    this.midiOutput.sendMessage(144, key, color);
  }
});

const createDefaultConfig = () => {
  settings.set('devices', {
    input: 0,
    output: 1
  });
}

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


    if (!settings.has('devices')) {
      createDefaultConfig();
    } else {
      this.state.config = {
        devices: settings.get('devices')
      }
    }
    
  }

  componentDidMount() {
    let buttons = {}
    
console.log(this.state)
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
    this.midiOutput.openPort(1);

    this.clearLaunchpad();
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

  clearLaunchpad() {
    console.log(this.midiOutput)
    _.range(11, 89).map(i => this.midiOutput.sendMessage([144, i, 0]))
  }

  launchpadTopKeyEvent(key, pressed) {
    this.clearLaunchpad();
    console.log(`Top Button: ${key}, pressed: ${pressed}`)
  }

  launchpadSideKeyEvent(key, pressed) {
    console.log(`Side Button: ${key}, pressed: ${pressed}`)
  }

  render() {
    return (
      <Provider midiOutput={this.midiOutput} midiInput={this.midiInput}>
        <Main>
          <Split direction="column">
            <Split justify="center" self="stretch" content="stretch">
              <Child fill padding="15px">
                <LPButton color={"light"} round />
              </Child>
              <Child fill padding="15px">
                <LPButton color={"light"} round />
              </Child>
              <Child fill padding="15px">
                <LPButton color={"light"} round />
              </Child>
              <Child fill padding="15px">
                <LPButton color={"light"} round />
              </Child>
              <Child fill padding="15px">
                <LPButton color={"light"} round />
              </Child>
              <Child fill padding="15px">
                <LPButton color={"light"} round />
              </Child>
              <Child fill padding="15px">
                <LPButton color={"light"} round />
              </Child>
              <Child fill padding="15px">
                <LPButton color={"light"} round />
              </Child>
            </Split>
            {_.range(0, 8).map(y => (
              <Split key={`row-${y}`} justify="center" self="stretch" content="stretch">
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
      </Provider>
    )
  }
}

export default App;