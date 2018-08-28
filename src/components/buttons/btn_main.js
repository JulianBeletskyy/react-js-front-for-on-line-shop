import React, { Component } from 'react';
//import './btn_main.css';
import { getLang } from '../../utils/lang.js'

class BtnMain extends Component {
    render() {
        const { type = 'button' } = this.props
        return (
            <div>
                <button 
                    type={type}
                    onClick={this.props.onClick}
                    className={"btn btn-primary " + this.props.className}
                    disabled={this.props.disabled}>
                    {getLang(this.props.title)}
                </button>
            </div>    
        );
    }
}

export default BtnMain