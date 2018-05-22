import React, { Component } from 'react'
import './input.css'

class Input extends Component {
    thisRef = ref => {
        this.props.inputRef(ref)
        this.input = ref
    }

    render() {
        return (
            <div className="form-group">
                <label>{this.props.label}:</label>
                {
            		this.props.required
                	? 	<sup style={{color: '#70C49C'}}><small>&#9733;</small></sup>
                	: 	''
                }
                <input 
                    type="text" 
                    placeholder={this.props.placeholder}
                    className="form-control" 
                    ref={this.thisRef}
                    defaultValue={this.props.value} />
            </div>
        );
    }
}

export default Input