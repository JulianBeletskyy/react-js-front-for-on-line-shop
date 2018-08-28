import Enzyme, { shallow } from 'enzyme'
import React from 'react'
import BtnMain from '../src/components/buttons/btn_main.js'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Render', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallow(<BtnMain className="test" disabled={true} title="Carrinho" />)
    })

    it('render component', () => {
       expect(wrapper.length).toEqual(1)
    });

    it('render child component', () => {
       expect(wrapper.children().length).toEqual(1)
    });

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('disables the button element', () => {
        const buttonElement = wrapper.find('button');
        expect(buttonElement.props().disabled).toBe(true);
    });

    it('contains component exact button', () => {
        expect(wrapper.contains(<button className="btn btn-primary test" disabled={true} type="button">Carrinho</button>)).toBe(true);
    });
});