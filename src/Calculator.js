import React, { Component } from 'react';
import './Calculator.css';

import CalculatorKey from './components/CalculatorKey'

class Calculator extends Component {
  inputDigit(digit) {
    const { displayValue, waitingForOperand } = this.state;
  
    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false
      })
    } else {
      this.setState({
        displayValue: displayValue === '0' ? String(digit) : displayValue + digit
      })
    }
  }
  
  render() {
    return (
      <div className="calculator">
        <div className="calculator-display">0</div>
        <div className="calculator-keypad grid-container">
          <div className="input-keys function-keys">
            <CalculatorKey className="key-clear grid-item">C</CalculatorKey>
            <CalculatorKey className="key-sign grid-item">±</CalculatorKey>
            <CalculatorKey className="key-percent grid-item">%</CalculatorKey>
          </div>
          <div className="input-keys digit-keys">
            <CalculatorKey className="key-7 grid-item" onPress={() => this.inputDigit(7)}>7</CalculatorKey>
            <CalculatorKey className="key-8 grid-item">8</CalculatorKey>
            <CalculatorKey className="key-9 grid-item">9</CalculatorKey>
            <CalculatorKey className="key-4 grid-item">4</CalculatorKey>
            <CalculatorKey className="key-5 grid-item">5</CalculatorKey>
            <CalculatorKey className="key-6 grid-item">6</CalculatorKey>
            <CalculatorKey className="key-1 grid-item">1</CalculatorKey>
            <CalculatorKey className="key-2 grid-item">2</CalculatorKey>
            <CalculatorKey className="key-3 grid-item">3</CalculatorKey>
            <CalculatorKey className="key-0 grid-item">0</CalculatorKey>
            <CalculatorKey className="key-dot grid-item">●</CalculatorKey>
          </div>
          <div className="operator-keys">
            <CalculatorKey className="grid-item">/</CalculatorKey>
            <CalculatorKey className="grid-item">*</CalculatorKey>
            <CalculatorKey className="grid-item">-</CalculatorKey>
            <CalculatorKey className="grid-item">+</CalculatorKey>
            <CalculatorKey className="grid-item">=</CalculatorKey>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
