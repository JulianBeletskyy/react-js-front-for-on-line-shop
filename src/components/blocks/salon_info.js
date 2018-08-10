import React, { Component } from 'react'
import AddressMap from 'components/map'
import { getLang } from 'utils/lang'

class SalonInfo extends Component {
	printSocial = (item, i) => {
		return 	<div key={i} className="mb-2">
					<h5 className="text-capitalize">{item.type}</h5>
    				<a target="_blank" href={`http://${item.url}`} className="color-grey">{item.url}</a>
				</div>
	}

    render() {
    	const { address, social_media, hide } = this.props
        return (
        	<div className="row align-items-stretch">
	        	{
	        		hide
	        		? 	<div className="col-lg-4 mb-2">
			            	<div className="rounded border p-3 h-100">
			            		<h5>{getLang('Horários')}</h5>
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
			            		hide
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