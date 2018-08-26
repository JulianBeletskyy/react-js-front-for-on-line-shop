import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './input.css'
import Validator from 'utils/validator'
import { getLang } from 'utils/lang'

class Input extends Component {
    constructor(props) {
        super(props)
        this.input = null
        this.obj = {
            valid: true,
            message: ''
        }
        this.firstTime = false
        this.state = {
            value: ''
        }
    }

    handleChange = ({target: {value}}) => {
        if (this.props.checking && !this.firstTime) {
            this.firstTime = true
        }
        if (this.props.onChange) {
            this.props.onChange(value)
        }
        if (this.props.validation && this.input) {
            this.obj = Validator.setValue(this.input.value, this.props.validation, this.props.label, this.formName.name)
        }
        this.setState({value})
    }

    inputRef = ref => {
        this.input = ref
        if (this.props.inputRef) {
            this.props.inputRef(ref)
        }
    }

    componentDidMount() {
        this.formName = ReactDOM.findDOMNode(this).parentNode.closest('form')
        if (this.props.validation && this.formName) {
            this.obj = Validator.setValue(this.props.value, this.props.validation, this.props.label, this.formName.name)
        }
    }

    handleFocus = ({target: {value}}) => {
        this.firstTime = true
    }

    isValid = () => this.props.checking && this.props.validation && !this.obj.valid && this.firstTime

    render() {
        const { 
            placeholder = '',
            disabled = false,
            type = 'text',
            readonly = false,
            checking = false,
            maxlength = null,
            onChange,
            inputRef,
            onKeyDown,
            className = '',
            label = this.props.label ? `${this.props.label}:` : <span>&nbsp;</span>,
            value 
        } = this.props

        const validClass = this.isValid() ? 'border-danger' : ''
        return (
                <div id="first">
                    <label>{label}</label>
                    {
                        this.props.required
                        ?   <sup style={{color: '#70C49C'}}><small>&#9733;</small></sup>
                        :   null
                    }{
                        this.props.description
                        ?   <span style={{color: '#70C49C'}}> ({this.props.description})</span>
                        :   null
                    }
                    <input 
                        type={type}
                        maxLength={maxlength}
                        readOnly={readonly}
                        disabled={disabled}
                        placeholder={placeholder}
                        className={`form-control ${className} ${validClass}`}
                        ref={this.inputRef}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onKeyDown={onKeyDown}
                        defaultValue={value} />
                    <small className="color-grey">{this.props.bottomText}</small>
                    {
                        this.isValid()
                        ?   <small className="text-danger">{`${this.props.label} ${getLang(this.obj.message)}`}</small>
                        :   <small>&nbsp;</small>
                    }
                </div>
        );
    }
}

export default Input