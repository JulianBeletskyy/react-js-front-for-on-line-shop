import React, { Component } from 'react'
import StepsRound from 'components/steps/steps_round.js'
import Price from 'components/price'

class PurchasePage extends Component {
	state = {
		step: 1
	}

	changeStep = step => e => {
		this.setState({step})
	}

    render() {
    	const purchase = this.props.purchase ? this.props.purchase : {}
        return (
        	<div>
        		<div className="mb-3">
	            	<StepsRound active={this.state.step} onClick={this.changeStep} />
	            </div>
	            <div className="row">
	            	<div className="col-sm-6">
	            		<div className="rounded bg-white border p-3">
	            			<h4 className="mb-3">Valores</h4>
	            			<div className="border-bottom mb-3"></div>

	            			<div className="d-flex justify-content-between color-grey mb-3">
	            				<div className="fs-18">Subtotal:</div>
								<div className="text-left">
									<Price current={purchase.items_total} />
								</div>
							</div>

							<div className="d-flex justify-content-between color-grey mb-3">
	            				<div className="fs-18">Frete:</div>
								<div className="text-left">
									<Price current={purchase.delivery_tax} />
								</div>
							</div>

							<div className="d-flex justify-content-between mb-3">
	            				<div className="fs-18">Total:</div>
								<div className="text-left">
									<Price current={purchase.total} />
								</div>
							</div>

	            		</div>
	            	</div>
	            	<div className="col-sm-6">
	            		<div className="rounded bg-white border p-3">
	            			<h4 className="mb-3">Endereço de entrega</h4>
	            			<div className="border-bottom mb-3"></div>
	            		</div>
	            	</div>
	            </div>
			</div>
        );
    }
}

export default PurchasePage