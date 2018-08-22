import React, { Component } from 'react'
import { connect } from 'react-redux'
import store, { history } from 'store'
import { LIST_MENU } from 'config'
import Avatar from 'components/images/avatar'
import { getLang } from 'utils/lang'
import { logout } from 'actions/auth'

class SideMenuWeb extends Component {
    state = {
        display: 'block'
    }

    printList = (item, i) => {
        const [, first] = history.location.pathname.split('/')
        let className = 'pl-3 py-3 d-flex align-items-center pointer menu-web-item color-grey'
        if (item.url === first) {
            className += ' active'
        }
        return  <div key={i} className={className} onClick={e => history.push(`/${item.url}`)}>
                    <div className="img-fluid w-15 h-100 pr-2"></div>
                    <object data={`/assets/svg/${item.svg_icon}`} width="12%" className="svg-icon" type="image/svg+xml"></object>
                    <object data={`/assets/svg/${item.svg_icon_hover}`} width="12%" className="svg-icon-hover" type="image/svg+xml"></object>
                    <span className="w-85 pl-4">{getLang(item.title)}</span>
                </div>
    }

    logout = () => {
        store.dispatch(logout())
    }

    render() {
        const { first_name, last_name } = this.props.user.data
        const image_url = this.props.user.data.user_image.image_url
        return (
        	<div className="bg-white rounded pb-4 border wrap-menu-web d-none d-sm-block">
        		<div className="p-3">
    				<div className="form-group">
                        <div className="row">
                            <div className="col-5 pr-1">
                                <Avatar image={image_url} defaultImg="/assets/images/default-avatar.png" edit={false} />
                            </div>
                            <div className="col-7 px-0 py-3">
                                <div className="d-flex align-items-start flex-column h-100">
                                    <div><strong>{`${first_name} ${last_name}`}</strong></div>
                                    <div className="mt-auto">
                                        <div className="d-flex align-items-center">
                                            <img src="/assets/svg/Logout.svg" alt="" style={{opacity: 0.8}} className="img-fluid img-icon mr-2" />
                                            <span className="pointer" onClick={this.logout}>{getLang('Logout')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
        			</div>
	            </div>
                { LIST_MENU.map((item, i) => this.printList(item, i)) }
			</div>
        );
    }
}

const mapStateToProps = state =>
    ({
        user: {
            data: {
                first_name: state.user.data.first_name,
                last_name: state.user.data.last_name,
                user_image: {
                    image_url: state.user.data.user_image.image_url,
                }
            }
        }
    })

export default connect(
    mapStateToProps
)(SideMenuWeb)