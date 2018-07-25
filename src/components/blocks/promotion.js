import React, { Component } from 'react'
import BtnMain from 'components/buttons/btn_main'
import Price from 'components/price'
import Carousel from 'components/carousel'
import ImagePreview from 'components/images/preview'
import Stars from 'components/stars'
import { getLang } from 'utils/lang'

class PromotionBlock extends Component { 

	printPromotionItem = (item, i) => {
		return 	<div key={i} className="px-4 position-relative">
					<div className="position-absolute paggin-plus d-none d-md-block">
						<i className="fas fa-plus color-green"></i>
					</div>
					<div className="rounded border p-2">
						<div className="d-flex align-items-center">
							<div className="w-20 mr-2">
								<ImagePreview image={''} />
							</div>
							<div>
								<div>{getLang('Eau Thermale Avéne')}</div>
								<div className="d-flex">
									<div className="mr-1">
										<div className="color-grey">{getLang('Avaliação')}</div>
										<div className="color-grey"><Stars active={4} /></div>
									</div>
									<div>
										<div className="color-grey">{getLang('Quantidade')}:</div>
										<div>3 {getLang('itens')}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
	}

	render() {
		const promotionCards = ['', '', '']
		const settings = {
			infinite: false,
			slidesToShow: 2,
			swipeToSlide: true,
			responsive: [
				{
            		breakpoint: 767, 
                    settings: {
                        slidesToShow: 1
                    }
            	}
            ]
		}
		return (
			<div>
				<div className="mb-2">Air plant you prorably haven't heard of them pour-over</div>
				<div className="row align-items-center">
					<div className="col-xl-8 col-lg-12 mb-3 mb-xl-0">
						<Carousel 
							items={promotionCards.map((item, i) => this.printPromotionItem(item, i))} 
							arrowType="promotions"
		        			settings={settings} />
					</div>
					<div className="col-xl-2 col-lg-6 text-center mb-3 mb-lg-0">
						<Price style={{fontSize: 22}} current={72} old={140.90} />
					</div>
					<div className="col-xl-2 col-lg-6">
						<BtnMain
	        				className="font-weight-bold mb-2 btn-block"
	        				title="Comprar agora" />
        				<BtnMain
	        				className="font-weight-bold btn-outline btn-block"
	        				title="Adicionar ao carrinho" />
					</div>
				</div>
			</div>
		)
	}
}

export default PromotionBlock