import { createElement } from 'react';
import { ShallowWrapper, render, shallow } from 'enzyme';
import { Alert } from '../Alert';
import { AlertProps } from 'src/userTypes';

describe('<Alert />', () => {
    let props: AlertProps = {
        id: 'testId',
        message: 'Test Message',
        className: 'testClass',
        bootstrapStyle: "success"
    };

    it("renders without crashing", () => {
        const wrapper = render(<Alert {...props} />);

        expect(wrapper.length).toBe(1);
    });

    it("renders as div element", () => {
        const wrapper = render(<Alert {...props} />);
        
        expect(wrapper.is('div')).toBeTruthy();
        expect(wrapper.empty()).toBeTruthy();
    });
    
    it("should have a div with the correct className and role attributes", () => {
        const wrapper = render(<Alert {...props} />);

        expect(wrapper.hasClass(`alert alert-${props.bootstrapStyle}`)).toBeTruthy();
        expect(wrapper.hasClass(props.className!)).toBeTruthy();
    });
    
    it("should have a div with the correct role attribute", () => {
        const wrapper = render(<Alert {...props} />);

        expect(wrapper.prop('role')).toEqual("alert");
    });
    
    it("should have the correct id attribute", () => {
        const wrapper = render(<Alert {...props} />);

        expect(wrapper.prop('id')).toEqual(`${props.id}-error`);
    });

    it("should display the passed message", () => {
        const wrapper = render(<Alert {...props} />);

        expect(wrapper.text()).toEqual(props.message);
    });

    it("should render only alert classes when there's no className provided", () => {
        const newProps = { ...props };
        delete newProps.className;
        const wrapper = render(<Alert {...newProps} />);
        
        expect(wrapper.attr('class')).toEqual(`alert alert-${newProps.bootstrapStyle}`);
    });

    it("should render an empty Fragment when there's no message", () => {
        const newProps = { ...props };
        delete newProps.message;
        let wrapper: ShallowWrapper<AlertProps>;
        wrapper = shallow(<Alert {...newProps} />);
        
        expect(wrapper.html()).toEqual('');
    });
});