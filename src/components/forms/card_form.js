import React, { Component } from 'react'
import { history } from 'store'
import Input from 'components/inputs/input'
import { format } from 'utils/mask'
import { getLang } from 'utils/lang'
import Validator from 'utils/validator'

class CardForm extends Component {

    constructor(props) {
        super(props)
        this.card = {}
        this.state = {
            checkingForm: false
        }
    }

    checkMask = (mask, field) => val => {
        this.setState({checkingForm: true})
        this.card[field].value = format(mask, val)
    }

    componentWillUnmount() {
        Validator.clear('card')
    }

    render() {
        const card = history.location.state || {}
        card.card_number = card.card_number ? format('card', card.card_number) : ''
        card.validity_month = card.validity_year && card.validity_month ? format('dd/mm', `${card.validity_month}${card.validity_year}`) : ''
        
        return (
        	<form name="card" onChange={this.props.onChange(this.card)}>
                <Input 
                    required
                    checking={this.state.checkingForm}
                    validation={['required']}
                    label={getLang("Nome para o cartão")}
                    description={getLang("ex: meu cartão")}
                    value={card.card_name}
                    onChange={this.checkMask('alphabet', 'card_name')}
                    inputRef={ref => this.card.card_name = ref} />
                <Input 
                    required
                    checking={this.state.checkingForm}
                    validation={['required']}
                    label={getLang("Nome impresso no cartão")}
                    value={card.name_on_card}
                    onChange={this.checkMask('alphabet', 'name_on_card')}
                    inputRef={ref => this.card.name_on_card = ref} />
                <Input 
                    required
                    checking={this.state.checkingForm}
                    validation={['required', '9999.9999.9999.9999']}
                    label={getLang("Número do cartão")}
                    value={card.card_number}

                    onChange={this.checkMask('card', 'card_number')}
                    inputRef={ref => this.card.card_number = ref} />
                <div className="row">
                    <div className="col-md-6">
                        <Input 
                            required
                            checking={this.state.checkingForm}
                            validation={['required', '99/99']}
                            label={getLang("Validate")}
                            placeholder="DD/MM"
                            value={card.validity_month}
                            onChange={this.checkMask('dd/mm', 'validity_month')}
                            inputRef={ref => this.card.validity_month = ref} />
                    </div>
                    <div className="col-md-6">
                        <Input 
                            required
                            checking={this.state.checkingForm}
                            validation={['required', 'min-3']}
                            label={getLang("Código de segurança")}
                            value={card.cvv}
                            onChange={this.checkMask('cvv', 'cvv')}
                            inputRef={ref => this.card.cvv = ref} />
                    </div>
                </div>
			</form>
        );
    }
}

export default CardForm