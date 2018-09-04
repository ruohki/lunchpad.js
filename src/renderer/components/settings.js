import React, { Component } from 'react';
import midi from 'midi';

import { COLOR_REDISH, COLOR_NOTBLACK, COLOR_ALMOSTBLACK } from './constants'
import { Split, Child, Outer } from './layout';

import { Input, Border, Button, TabPane } from './LPControls';

const getInputs = () => {
  const input = new midi.input();
  let inputs = []
  for(let i = 0; i < input.getPortCount(); i++) {
    inputs.push(input.getPortName(i));
  }

  return inputs;
}

const getOutputs = () => {
  const output = new midi.output();
  let outputs = []
  for(let i = 0; i < output.getPortCount(); i++) {
    outputs.push(output.getPortName(i));
  }

  return outputs;
}

class Settings extends Component {
  constructor(props) {
    super(props);

    const {
      description = "",
      selectedFile = "",
      selectedColor = 0,
    } = props;

    this.state = {
      inputs: [],
      outputs: []
    }
  }

  componentDidMount() {
    const inputs = getInputs();
    const outputs = getOutputs();

    this.setState({
      inputs,
      outputs
    })
  }
  
  onAccept() {

  }

  onCancel() {

  }
  
  render() {


    return (
      <Split direction="column">
        <Child>
          <h2>Input Devices</h2>
        </Child>
        <Child padding="0 0 3rem 0">
          <TabPane tabs={this.state.inputs} />
        </Child>
        <Child>
          <h2>Output Devices</h2>
        </Child>
        <Child padding="0 0 3rem 0">
          <TabPane tabs={this.state.outputs} />
        </Child>
        <Child>
          <Split justify="flex-end">
            <Child padding="0 1rem 0 0">
              <Button color={COLOR_REDISH} onAccept={this.onCancel.bind(this)}>Cancel</Button>
            </Child>
            <Child>
              <Button onAccept={this.onAccept.bind(this)}>Accept</Button>
            </Child>
          </Split>
        </Child>
      </Split>
    )
  }
}

export default Settings;