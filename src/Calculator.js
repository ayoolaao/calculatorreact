import React, { Component } from 'react';
import './Calculator.css';

import CalculatorKey from './components/CalculatorKey';
import CalculatorDisplay from './components/CalculatorDisplay';

const CalculatorOperations = {
  '/' : (prevValue, nextValue) => prevValue / nextValue,
  '*' : (prevValue, nextValue) => prevValue * nextValue,
  '-' : (prevValue, nextValue) => prevValue - nextValue,
  '+' : (prevValue, nextValue) => prevValue + nextValue,
  '=' : (prevValue, nextValue) => nextValue,
};

class Calculator extends Component {
  state = {
    value: null,
    displayValue: '0',
    operator: null,
    waitingForOperand: false,
  };
  
  clearAll(){
    this.setState({
      value: null,
      displayValue: '0',
      operator: null,
      waitingForOperand: false,
    })
  }
  
  clearDisplay(){
    this.setState({
      displayValue: '0',
    })
  }
  
  clearLastChar() {
    const {displayValue} = this.state;
    
    this.setState({
      displayValue: displayValue.substring(0, displayValue.length - 1) || '0'
    })
  }
  
  toggleSign(){
    const {displayValue} = this.state;
    const newValue = parseFloat(displayValue) * - 1;
    
    this.setState({
      displayValue: String(newValue)
    })
  }
  
  inputPercent(){
    const { displayValue } = this.state;
    const currentValue = parseFloat(displayValue);
  
    if (currentValue === 0)
      return;
  
    const fixedDigits = displayValue.replace(/^-?\d*\.?/, '');
    const newValue = parseFloat(displayValue) / 100;
  
    this.setState({
      displayValue: String(newValue.toFixed(fixedDigits.length + 2))
    })
  }
  
  inputDot(){
    const { displayValue } = this.state;
  
    if (!(/\./).test(displayValue)) {
      this.setState({
        displayValue: displayValue + '.',
        waitingForOperand: false
      })
    }
  }
  
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
  
  performOperation(nextOperator){
    const { value, displayValue, operator } = this.state;
    const inputValue = parseFloat(displayValue);
  
    if (value == null) {
      this.setState({
        value: inputValue
      })
    } else if (operator) {
      const currentValue = value || 0;
      const newValue = CalculatorOperations[operator](currentValue, inputValue);
    
      this.setState({
        value: newValue,
        displayValue: String(newValue)
      })
    }
  
    this.setState({
      waitingForOperand: true,
      operator: nextOperator
    })
  }
  
  handleKeyDown = (event) => {
    let { key } = event;
  
    if (key === 'Enter')
      key = '=';
  
    if ((/\d/).test(key)) {
      event.preventDefault();
      this.inputDigit(parseInt(key, 10))
    } else if (key in CalculatorOperations) {
      event.preventDefault();
      this.performOperation(key)
    } else if (key === '.') {
      event.preventDefault();
      this.inputDot()
    } else if (key === '%') {
      event.preventDefault();
      this.inputPercent()
    } else if (key === 'Backspace') {
      event.preventDefault();
      this.clearLastChar()
    } else if (key === 'Clear') {
      event.preventDefault();
    
      if (this.state.displayValue !== '0') {
        this.clearDisplay()
      } else {
        this.clearAll()
      }
    }
  };
  
  componentDidMount(){
    document.addEventListener('keydown', this.handleKeyDown)
  }
  
  componentWillUnmount(){
    document.removeEventListener('keydown', this.handleKeyDown)
  }
  
  render() {
    const {displayValue} = this.state;
    const cleaDisplay = displayValue !== '0';
    const clearText = cleaDisplay ? 'C' : 'AC';
    
    return (
      <div className="calculator">
        <CalculatorDisplay value={displayValue}/>
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
