import { createElement } from 'react';
import { render } from 'enzyme';
import { ControlLabel } from '../ControlLabel';
import { RadioLabelProps } from 'src/userTypes';

describe('<ControlLabel />', () => {
    let props: RadioLabelProps;

    beforeEach(() => {
        props = {
            id: "test-id",
            labelCaption: "Test Caption",
            customClass: 'testClass'
        };
    });

    it("renders without crashing", () => {
        const wrapper = render(<ControlLabel {...props} />);
        
        expect(wrapper.length).toBe(1);
    });

    it("renders as label element", () => {
        const wrapper = render(<ControlLabel {...props} />);
        
        expect(wrapper.is('label')).toBeTruthy();
        expect(wrapper.empty()).toBeTruthy();
    });
    
    
    it("should have a label with the correct className", () => {
        const wrapper = render(<ControlLabel {...props} />);

        expect(wrapper.hasClass('control-label')).toBeTruthy();
        expect(wrapper.hasClass(props.customClass!)).toBeTruthy();
    });
    
    it("should have the correct htmlFor attribute", () => {
        const wrapper = render(<ControlLabel {...props} />);

        expect(wrapper.prop('for')).toEqual(props.id);
    });

    it("should have the correct id attribute", () => {
        const wrapper = render(<ControlLabel {...props} />);

        expect(wrapper.prop('id')).toEqual(`${props.id}-label`);
    });

    it("should display the passed labelCaption", () => {
        const wrapper = render(<ControlLabel {...props} />);

        expect(wrapper.text()).toEqual(props.labelCaption);
    });

    it("should display empty string when labelCaption is not provided", () => {
        const newProps = { ...props };
        delete newProps.labelCaption;
        const wrapper = render(<ControlLabel {...newProps} />);
        
        expect(wrapper.text()).toEqual('');
        expect(wrapper.prop('for')).toEqual(props.id);
        expect(wrapper.prop('id')).toEqual(`${props.id}-label`);
    });

    it("should have only default class name when customClass is not provided", () => {
        const newProps = { ...props };
        delete newProps.customClass;
        const wrapper = render(<ControlLabel {...newProps} />);

        expect(wrapper.attr('class')).toEqual('control-label');
        expect(wrapper.prop('for')).toEqual(props.id);
        expect(wrapper.prop('id')).toEqual(`${props.id}-label`);
    });
});