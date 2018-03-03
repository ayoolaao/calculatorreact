import React, {Component} from 'react';
import PointTarget from 'react-point';

import '../styles/CalculatorKey.css';

export default class CalculatorKey extends Component{
  render(){
    const {onPress, className, ...props} = this.props;
    
    return(
      <PointTarget onPoint={onPress}>
        <button className={`calculator-key ${className}`} {...props}/>
      </PointTarget>
    )
  }
}