import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {
  addInputs,
  subtractInputs,
  async_addInputs
} from '../actions/calculatorActions';

const mapStateToProps = ({ output }) => ({
  output
});

export class Home extends React.Component {
  state = {
    num1: 0,
    num2: 0
  };

  changeHandle = (num, value) => {
    this.setState({ [num]: value });
  };

  addHandle = () => {
    const { num1, num2 } = this.state;
    this.props.addInputs(parseInt(num1) + parseInt(num2));
  };

  subHandle = () => {
    const { num1, num2 } = this.state;
    this.props.subtractInputs(parseInt(num1) - parseInt(num2));
  };

  addAsyncHandle = () => {
    const { num1, num2 } = this.state;
    this.props.async_addInputs(parseInt(num1) + parseInt(num2));
  };

  render() {
    return (
      <div className="container">
        <h2>Калькулятор с react и redux</h2>
        <input
          type="text"
          placeholder="Первое число"
          onChange={e => this.changeHandle('num1', e.target.value)}
        />
        <input
          type="text"
          placeholder="Второе число"
          onChange={e => this.changeHandle('num2', e.target.value)}
        />
        <div>
          Результаты : <span id="output">{this.props.output}</span>
        </div>
        <button id="add" onClick={this.addHandle}>Сложить</button>
        <button id="subtract" onClick={this.subHandle}>Вычесть</button>
        <button id="async_add" onClick={this.addAsyncHandle}>Сложить асинхронно</button>
        <hr />
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  addInputs,
  subtractInputs,
  async_addInputs
})(Home);