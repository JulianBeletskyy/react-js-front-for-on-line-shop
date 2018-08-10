import React, { Component } from 'react'
import store, { history } from 'store'
import { toggleLightBox } from 'actions/design'
import Lightbox from 'react-images'
import { connect } from 'react-redux'
import { LIGHTBOX_THEME } from 'config'

const keys = {37: 1, 38: 1, 39: 1, 40: 1};

class Viewer extends Component {
	closeLightbox = () => {
		store.dispatch(toggleLightBox(false, [], 0))
	}

	gotoNext = () => {
		store.dispatch(toggleLightBox(true, this.props.design.lightbox.img, this.props.design.lightbox.current + 1))
	}

	gotoPrevious = () => {
		store.dispatch(toggleLightBox(true, this.props.design.lightbox.img, this.props.design.lightbox.current - 1))
	}

	preventDefault = e => {
		e = e || window.event;
		if (e.preventDefault) {
			e.preventDefault();
		}
		e.returnValue = false;
	}

	preventDefaultForScrollKeys = e => {
	    if (keys[e.keyCode]) {
	        this.preventDefault(e);
	        return false;
	    }
	}

	disableScroll = () => {
		if (window.addEventListener) // older FF
		window.addEventListener('DOMMouseScroll', this.preventDefault, false);
		window.onwheel = this.preventDefault; // modern standard
		window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
		//window.touchmove  = this.preventDefault; // mobile
		document.onkeydown  = this.preventDefaultForScrollKeys;
	}

	enableScroll = () => {
		if (window.removeEventListener)
		window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
		window.onmousewheel = document.onmousewheel = null; 
		window.onwheel = null; 
		//window.touchmove = null;  
		document.onkeydown = null;  
	}

	componentDidMount() {
		
		history.listen((location, action) => {
            this.closeLightbox()
        })
	}

	render() {
		const { open, img, current, settings } = this.props.design.lightbox

		open ? this.disableScroll() : this.enableScroll()

		const defaultSettings = {
			images: img,
			isOpen: open,
			onClickPrev: this.gotoPrevious,
			onClickNext: this.gotoNext,
			currentImage: current,
			backdropClosesModal: true,
			theme: LIGHTBOX_THEME,
			preloadNextImage: false,
			preventScroll: false,
			enableKeyboardInput: false,
			onClose: this.closeLightbox,
			...settings
		}

		return (
			<Lightbox {...defaultSettings} />
		)
	}
}

const mapStateToProps = state => 
	({
        design: {
        	lightbox: state.design.lightbox,
        }
    })

export default connect(
    mapStateToProps
)(Viewer)