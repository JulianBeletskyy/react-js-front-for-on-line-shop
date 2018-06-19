import React, { Component } from 'react'
import Stars from 'components/stars'
import ImagePreview from 'components/images/preview'
import Price from 'components/price'

class CardReview extends Component {
	render() {
		return (
			<div className="bg-white rounded p-3">
				<div className="d-flex">
					<div className="w-40">
						<ImagePreview images={''} />
					</div>
					<div className="w-60 pl-2">
						<div className="fs-16">Máscara Senscience  Inner Restore Intensif  500ml</div>
						<div className="color-grey">
							Vendido e realizado por <span className="color-green pointer">Olist</span>
						</div>
						<Price current={72} />
					</div>
				</div>
				<div className="row">
					<div className="col-6">
						<div className="color-grey">
							Número do Pedido
						</div>
						<div>334930950</div>
					</div>
					<div className="col-6">
						<div className="color-grey">
							Avaliação
						</div>
						<Stars active={5} />
					</div>
					<div className="col-6">
						<div className="color-grey">
							Data de compra
						</div>
						<div>23/04/2018</div>
					</div>
					<div className="col-6">
						<div className="color-grey">
							Data da avaliação
						</div>
						<div>23/04/2018</div>
					</div>
				</div>
			</div>
		)
	}
}

export default CardReview