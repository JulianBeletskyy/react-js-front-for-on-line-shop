import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { getUserAddress, getCredits } from 'actions/user'
import { setStep } from 'actions/cart'
import StepsArrow from 'components/steps/steps_arrow'
import { StepFirst, StepSecond, StepThird, StepFourth, StepFifth } from 'components/cart'

class Cart extends Component {
	constructor(props) {
		super(props)
		store.dispatch(getUserAddress())
		store.dispatch(getCredits())
	}

	changeStep = step => e => {
		store.dispatch(setStep(step))
	}

	componentWillMount() {
		store.dispatch(setStep(1))
	}

	getStepContent = () => {
		if (this.props.cart.list.product.length) {
			switch(this.props.cart.step) {
				case 1: return <StepFirst step={this.props.cart.step} />
				case 2: return <StepSecond step={this.props.cart.step} />
				case 3: return <StepThird step={this.props.cart.step} />
				case 4: return <StepFourth step={this.props.cart.step} />
				case 5: return <StepFifth step={this.props.cart.step} />
				default: return
			}
		} else {
			switch(this.props.cart.step) {
				case 1: return <StepFirst step={this.props.cart.step} />
				case 2: return <StepThird step={this.props.cart.step} />
				case 3: return <StepFourth step={this.props.cart.step} />
				case 4: return <StepFifth step={this.props.cart.step} />
				default: return
			}
		}
	}

	getSteps = () => {
		return this.props.cart.list.product.length ? [{title: 'Meu carrinho'}, {title: 'Entrega'}, {title: 'Pagamento'}, {title: 'Confirmação'}] : [{title: 'Meu carrinho'}, {title: 'Pagamento'}, {title: 'Confirmação'}]
	}

    render() {
    	console.log(this.props.cart.list)
        return (
        	<div className="bg-main font-avenir pt-4">
	            <div className="container">
	            	<StepsArrow className="rounded mb-5" steps={this.getSteps()} active={this.props.cart.step} onClick={this.changeStep} />
	            	{ this.getStepContent() }
	            </div>
			</div>
        );
    }
}

const mapStateToProps = state =>
    ({
        cart: {
        	step: state.cart.step,
        	list: state.cart.list,
        }
    })

export default connect(
    mapStateToProps
)(Cart)