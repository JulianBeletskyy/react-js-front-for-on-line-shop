import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { toggleModal } from 'actions/design'
import { CardSmallForm } from 'components/forms'
import CartTotal from 'components/cards/cart_total'
import BtnMain from 'components/buttons/btn_main'
import { getCreditCards } from 'actions/user'
import Input from 'components/inputs/input'
import { format } from 'utils/mask'

class StepThird extends Component {

    openModal = () => {
        store.dispatch(toggleModal(true, CardSmallForm, 'modal-md', 'Você ainda não cadastrou um cartão de crédito'))
    }

    checkMask = (mask, field) => e => {
        this.cvv.value = format(mask, e.target.value)
    }

    componentWillMount() {
        if (!this.props.user.guest) {
            store.dispatch(getCreditCards())
        }
    }

    getCardNumber = num => `****.****.****.${num.slice(-4)}`

    render() {
        const { default_card } = this.props.user
        return (
        	<div className="row pb-5">
        		<div className="col-sm-6">
        			<h4>Dados do cartão</h4>
                    {
                        !Object.keys(this.props.user.default_card).length
                        ?   ''
                        :   <div className="bg-white rounded p-3 mb-3">
                                <div className="fs-18 mb-3">{default_card.card_name}</div>
                                <div className="color-grey">{this.getCardNumber(default_card.card_number)}</div>
                                <div className="color-grey mb-1">Visa</div>
                                <div className="color-grey">Coloque o código de segurança do cartão</div>
                                <div className="d-flex">
                                    <Input
                                        value={''}
                                        className="bg-main"
                                        onChange={this.checkMask('cvv', 'cvv')}
                                        inputRef={ref => this.cvv = ref} />
                                </div>
                            </div>
                    }
                    <div className="mb-3">
                        <BtnMain
                            className="btn-block btn-outline font-weight-bold bg-main"
                            onClick={this.openModal}
                            title="Alterar cartão" />
                    </div>
        		</div>
        		<div className="col-sm-6">
        			<h4>Resumo do pedido</h4>
                    <CartTotal value={this.props.cart.total} step={this.props.step} />
        		</div>
        	</div>
        );
    }
}

const mapStateToProps = state =>
    ({
        cart: {
            total: state.cart.total
        },
        user: {
            guest: state.user.guest,
            default_card: state.user.default_card
        }
    })

export default connect(
    mapStateToProps
)(StepThird)