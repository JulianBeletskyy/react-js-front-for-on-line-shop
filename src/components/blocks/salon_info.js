import React, { Component } from 'react'
import AddressMap from 'components/map'
import { getLang } from 'utils/lang'
import { WEEK } from 'config'

class SalonInfo extends Component {
	printSocial = (item, i) => {
		return 	<div key={i} className="mb-2">
					<h5 className="text-capitalize">{item.type}</h5>
    				<a target="_blank" href={`http://${item.url}`} className="color-grey">{item.url}</a>
				</div>
	}

    render() {
    	const { address, social_media, hide, working_hours } = this.props
        return (
        	<div className="row align-items-stretch">
	        	{
	        		hide && Object.keys(working_hours).length
	        		? 	<div className="col-lg-4 mb-2">
			            	<div className="rounded border p-3 h-100">
			            		<h5>{getLang('Horários')}</h5>
			            		 {
                                    Object.keys(working_hours).map((item, i) => {
                                        const [{from, to}] = working_hours[item].length ? working_hours[item] : [{from: '', to: ''}]
                                        return  <div key={i} className="color-grey d-flex justify-content-between py-1">
                                                    <div>{getLang(WEEK[item])}</div>
                                                    <div>{from} - {to}</div>
                                                </div>
                                    })
                                    
                                }
			            	</div>
			            </div>
	        		: 	null
	        	}
	            
	            <div className="col-lg-4 col-sm-6 mb-2">
	            	<div className="rounded border p-3 h-100">
	            		<h5>{getLang('Endereço')}</h5>
	            		<span className="color-grey">{`${address.title}, ${address.number} ${address.street}`}</span>
	            		{
	            			address.latitude
	            			? 	<AddressMap {...address} />
	            			: 	null
	            		}
	            	</div>
	            </div>
	            {
	            	social_media.length && hide
	            	? 	<div className="col-lg-4 col-sm-6 mb-2">
			            	<div className="rounded border p-3 h-100">
			            	{
			            		hide && address.phone
			            		? 	<div>
					            		<h5>{getLang('Telefone')}</h5>
				            			<div className="color-grey mb-2">{address.phone}</div>
			            			</div>
			            		: 	null
			            	}
			            		
		            		{ social_media.map((item, i) => this.printSocial(item, i)) }
			            	</div>
			            </div>
	            	: 	null
	            }
			</div>
        );
    }
}

export default SalonInfo