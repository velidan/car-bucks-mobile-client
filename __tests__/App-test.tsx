/**
 * @format
 */


import 'react-native';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';

import App from '../src/App';

import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });


// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
   const tree = renderer.create(<App />).toJSON();
   expect(tree).toMatchSnapshot();
});


describe('App testing suite', () => {
	it('renders as expected', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('Text').first().prop('children')).toBe("Hello World");
	});
  
	it('The counter text should contain 0 at the start', () => {
		const wrapper = shallow(<App />);
		const counterTextEl = wrapper.findWhere((node) => node.prop('testID') === 'counter');
		expect(counterTextEl.prop('children')).toEqual(["Counter ", 0]);
    });
	
	it('Should contain the button', () => {
		const wrapper = shallow(<App />);
		const buttonEl = wrapper.findWhere((node) => node.prop('testID') === 'button');
		expect(buttonEl.length).toBeTruthy();
    });
	
	it('Should increment the counter on the button press', () => {
		const wrapper = shallow(<App />);
		
		const counterTextEl = wrapper.findWhere((node) => node.prop('testID') === 'counter');
		expect(counterTextEl.prop('children')).toEqual(["Counter ", 0]);
		
		const buttonEl = wrapper.findWhere((node) => node.prop('testID') === 'button');
		buttonEl.simulate('press')
		
		const counterTextElUpdated = wrapper.findWhere((node) => node.prop('testID') === 'counter');
		expect(counterTextElUpdated.prop('children')).toEqual(["Counter ", 1]);
    });
});