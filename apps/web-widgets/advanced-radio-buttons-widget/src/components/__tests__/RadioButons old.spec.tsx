import { createElement } from 'react';
import { mount, render } from 'enzyme';
import { ValueStatus } from "mendix";
import { RadioButtons, RadioButtonsProps } from '../RadioButtons old';

function createMockEditableValue({ value = true, displayValue = "Yes", readOnly = false, universe = [true, false], validation = "" }) {
  return {
    status: ValueStatus.Available,
    readOnly,
    value,
    displayValue,
    setValue: jest.fn(),
    setTextValue: jest.fn(),
    validation,
    setValidator: jest.fn(),
    formatter: {
      format: jest.fn(),
      parse: jest.fn(),
    },
    setFormatter: jest.fn(),
    universe,
  };
}

describe('RadioButtons Component - ReadOnly and ReadOnlyAsText Scenarios', () => {
  const style: {} = { backgroundColor: 'blue', color: 'white' };
  const className: string | undefined = "custom-radio-buttons-class";
  const mockEditableValue = createMockEditableValue({ value: false, displayValue: "No", readOnly: true, validation: "Error: Incorrect value" });
  const baseProps: RadioButtonsProps  = {
    id: 'test-radio-buttons',
    readOnly: true,
    readOnlyAsText: true,
    formOrientation: 'horizontal',
    orientation: 'horizontal',
    showLabel: true,
    labelCaption: 'Test Label',
    labelWidth: 4,
    ariaRequired: false,
    useCustomLabels: true,
    customLabels: [
      { attributeValueKey: 'true', attributeValueNewCaption: 'Sure' },
      { attributeValueKey: 'false', attributeValueNewCaption: 'Ni!' },
    ],
    removeOtherOptions: false,  
    className: className,
    style: style,
    value: mockEditableValue, // Providing the mock value here
  };

  it('Tests base parameters', () => {
    const wrapper = render(<RadioButtons {...baseProps} />);

    // Validate aria-labelledby, id, and root class
    expect(wrapper.attr('id')).toBe(baseProps.id);
    expect(wrapper.attr('aria-labelledby')).toBe(`${baseProps.id}-label`);
    expect(wrapper.hasClass('mx-radiobuttons')).toBe(true);
    expect(wrapper.hasClass('form-group')).toBe(true);
    expect(wrapper.hasClass('inline')).toBe(true);
    expect(wrapper.hasClass('no-columns')).toBe(false);
    expect(wrapper.hasClass('has-error')).toBe(true);
    expect(wrapper.hasClass('custom-radio-buttons-class')).toBe(true);

    const children = wrapper.children();
    expect(children.length).toBe(2);

    // Validate label
    const label = children.eq(0);
    expect(label.attr('id')).toBe(`${baseProps.id}-label`);
    expect(label.prop('for')).toEqual(baseProps.id);
    expect(label.hasClass('control-label')).toBe(true);
    expect(label.hasClass(`col-sm-${baseProps.labelWidth}`)).toBe(true);
    expect(label.text()).toEqual(baseProps.labelCaption);
    
    // Validate parent div for formControlElement and alertMesssageElement
    const controlParent = children.eq(1);
    expect(controlParent.hasClass(`col-sm-${12 - (baseProps.labelWidth ?? 0)}`)).toBe(true);

    // Validate formControlStaticElement and its class
    const formControlStatic = controlParent.children().eq(0);
    expect(formControlStatic.hasClass('form-control-static')).toBe(true);
    expect(formControlStatic.text()).toBe(baseProps.customLabels[1].attributeValueNewCaption);

    // Validate alertMessageElement
    const alertMessage = controlParent.children().eq(1);
    expect(alertMessage.attr('id')).toBe(`${baseProps.id}-error`);
    expect(alertMessage.hasClass('alert-danger')).toBe(true);
    expect(alertMessage.hasClass('mx-validation-message')).toBe(true);
    expect(alertMessage.text()).toEqual(baseProps.value?.validation);
  });

  it('Tests base, but vertical form orientation, no custom class, no custom style', () => {
    const newProps = { ...baseProps };
    newProps.formOrientation = 'vertical';
    delete newProps.className;
    delete newProps.style;
    const wrapper = render(<RadioButtons {...newProps} />);

    // Validate root: aria-labelledby, id, and class
    expect(wrapper.attr('id')).toBe(newProps.id);
    expect(wrapper.attr('aria-labelledby')).toBe(`${newProps.id}-label`);
    expect(wrapper.hasClass('mx-radiobuttons')).toBe(true);
    expect(wrapper.hasClass('form-group')).toBe(true);
    expect(wrapper.hasClass('inline')).toBe(true);
    expect(wrapper.hasClass('no-columns')).toBe(true);
    expect(wrapper.hasClass('has-error')).toBe(true);
    expect(wrapper.hasClass('custom-radio-buttons-class')).toBe(false);

    const children = wrapper.children();
    expect(children.length).toBe(3);

    // Validate label
    const label = children.eq(0);
    expect(label.attr('id')).toBe(`${newProps.id}-label`);
    expect(label.prop('for')).toEqual(newProps.id);
    expect(label.hasClass('control-label')).toBe(true);
    expect(label.hasClass(`col-sm-${newProps.labelWidth}`)).toBe(false);
    expect(label.text()).toEqual(newProps.labelCaption);

    // Validate formControlStaticElement and its class
    const formControlStatic = children.eq(1);
    expect(formControlStatic.hasClass('form-control-static')).toBe(true);
    expect(formControlStatic.text()).toBe(newProps.customLabels[1].attributeValueNewCaption);

    // Validate alertMessageElement
    const alertMessage = children.eq(2);
    expect(alertMessage.attr('id')).toBe(`${newProps.id}-error`);
    expect(alertMessage.hasClass('alert-danger')).toBe(true);
    expect(alertMessage.hasClass('mx-validation-message')).toBe(true);
    expect(alertMessage.text()).toEqual(newProps.value?.validation);
  });

  it('Tests base , but vertical form orientation, no label, no validation', () => {
    const newProps = { ...baseProps };
    const mockEditableValueAsValid = createMockEditableValue({ value: false, displayValue: "No", readOnly: true, validation: "" });
    newProps.formOrientation = 'vertical';
    newProps.showLabel = false;
    newProps.value = mockEditableValueAsValid;
    const wrapper = render(<RadioButtons {...newProps} />);

    // Validate root: aria-labelledby, id, and class
    expect(wrapper.attr('id')).toBe(newProps.id);
    expect(wrapper.attr('aria-labelledby')).toBe(`${newProps.id}-label`);
    expect(wrapper.hasClass('mx-radiobuttons')).toBe(true);
    expect(wrapper.hasClass('form-group')).toBe(true);
    expect(wrapper.hasClass('inline')).toBe(true);
    expect(wrapper.hasClass('no-columns')).toBe(true);
    expect(wrapper.hasClass('has-error')).toBe(false);
    expect(wrapper.hasClass('custom-radio-buttons-class')).toBe(true);

    const children = wrapper.children();
    expect(children.length).toBe(1);

    // Validate label
    expect(children.find('.control-label').length).toBe(0);

    // Validate formControlStaticElement and its class
    const formControlStatic = children.eq(0);
    expect(formControlStatic.hasClass('form-control-static')).toBe(true);
    expect(formControlStatic.text()).toBe(newProps.customLabels[1].attributeValueNewCaption);

    // Validate alertMessageElement
    expect(children.find('.mx-validation-message').length).toBe(0);
  });

  it('Tests base, but vertical form orientation, aria-required is true, no custom labels, remove other options is true', () => {
    const newProps = { ...baseProps };
    newProps.formOrientation = 'vertical';
    newProps.removeOtherOptions = true;
    newProps.useCustomLabels = false;
    newProps.ariaRequired = true;
    const wrapper = render(<RadioButtons {...newProps} />);

    // Validate root: aria-labelledby, id, and class
    expect(wrapper.attr('id')).toBe(newProps.id);
    expect(wrapper.attr('aria-labelledby')).toBe(`${newProps.id}-label`);
    expect(wrapper.hasClass('mx-radiobuttons')).toBe(true);
    expect(wrapper.hasClass('form-group')).toBe(true);
    expect(wrapper.hasClass('inline')).toBe(true);
    expect(wrapper.hasClass('no-columns')).toBe(true);
    expect(wrapper.hasClass('has-error')).toBe(true);
    expect(wrapper.hasClass('custom-radio-buttons-class')).toBe(true);

    const children = wrapper.children();
    expect(children.length).toBe(3);

    // Validate label
    const label = children.eq(0);
    expect(label.attr('id')).toBe(`${newProps.id}-label`);
    expect(label.prop('for')).toEqual(newProps.id);
    expect(label.hasClass('control-label')).toBe(true);
    expect(label.hasClass(`col-sm-${newProps.labelWidth}`)).toBe(false);
    expect(label.text()).toEqual(newProps.labelCaption);

    // Validate formControlStaticElement and its class
    const formControlStatic = children.eq(1);
    expect(formControlStatic.hasClass('form-control-static')).toBe(true);
    expect(formControlStatic.text()).toBe('No');

    // Validate alertMessageElement
    const alertMessage = children.eq(2);
    expect(alertMessage.attr('id')).toBe(`${newProps.id}-error`);
    expect(alertMessage.hasClass('alert-danger')).toBe(true);
    expect(alertMessage.hasClass('mx-validation-message')).toBe(true);
    expect(alertMessage.text()).toEqual(newProps.value?.validation);
  });
});

describe('RadioButtons Component - Editable Scenarios', () => {
  const style = { backgroundColor: 'blue', color: 'white' };
  const className = "custom-radio-buttons-class";
  const mockEditableValue = createMockEditableValue({ value: false, displayValue: "No", readOnly: false, validation: "Error: Incorrect value" });
  const baseProps: RadioButtonsProps = {
    id: 'test-radio-buttons',
    readOnly: false,
    readOnlyAsText: false,
    formOrientation: 'horizontal',
    orientation: 'horizontal',
    showLabel: true,
    labelCaption: 'Test Label',
    labelWidth: 4,
    ariaRequired: true,
    useCustomLabels: true,
    customLabels: [
      { attributeValueKey: 'true', attributeValueNewCaption: 'Sure' },
      { attributeValueKey: 'false', attributeValueNewCaption: 'Ni!' },
    ],
    removeOtherOptions: false,  
    className,
    style,
    value: mockEditableValue, // Providing the mock value here
  };

  it('Tests base parameters', () => {
    const wrapper = render(<RadioButtons {...baseProps} />);

    // Validate root
    expect(wrapper.hasClass('mx-radiobuttons')).toBe(true);
    expect(wrapper.hasClass('form-group')).toBe(true);
    expect(wrapper.hasClass('inline')).toBe(true);
    expect(wrapper.hasClass('no-columns')).toBe(false);
    expect(wrapper.hasClass('has-error')).toBe(true);
    expect(wrapper.hasClass('custom-radio-buttons-class')).toBe(true);

    const children = wrapper.children();
    expect(children.length).toBe(2);

    // Validate control label
    const label = children.eq(0);
    expect(label.is('label')).toBe(true);
    expect(label.attr('id')).toBe(`${baseProps.id}-label`);
    expect(label.prop('for')).toEqual(baseProps.id);
    expect(label.hasClass('control-label')).toBe(true);
    expect(label.hasClass(`col-sm-${baseProps.labelWidth}`)).toBe(true);
    expect(label.text()).toEqual(baseProps.labelCaption);
    
    // Validate parent div for radio-buttons block
    const controlParent = children.eq(1);
    expect(controlParent.hasClass(`col-sm-${12 - (baseProps.labelWidth ?? 0)}`)).toBe(true);

    // Validate radio group and its class
    const radioGroup = controlParent.children().eq(0);
    expect(radioGroup.attr('id')).toBe(baseProps.id);
    expect(radioGroup.hasClass('mx-radiogroup')).toBe(true);
    expect(radioGroup.attr('role')).toBe('radiogroup');
    expect(radioGroup.attr('aria-labelledby')).toBe(`${baseProps.id}-label`);
    expect(radioGroup.attr('aria-required')).toBe('true');
    expect(radioGroup.attr('data-focusindex')).toBe("0");

    const radios = radioGroup.children();
    expect(radios.length).toBe(2);

    // Validate radio 0
    const radio0Index = 0;
    const radio0 = radios.eq(radio0Index);
    expect(radio0.attr('class')).toBe('radio');
    const radio0Children = radio0.children();
    expect(radio0Children.length).toBe(2);
    const radio0Input = radio0Children.eq(0);
    expect(radio0Input.is('input')).toBe(true);
    expect(radio0Input.attr('id')).toBe(`${baseProps.id}_${radio0Index}`);
    expect(radio0Input.attr('name')).toBe(baseProps.id);
    expect(radio0Input.attr('type')).toBe('radio');
    expect(radio0Input.attr('value')).toBe('true');
    expect(radio0Input.attr('checked')).toBe(undefined);
    const radio0Label = radio0Children.eq(1);
    expect(radio0Label.is('label')).toBe(true);
    expect(radio0Label.prop('for')).toBe(`${baseProps.id}_${radio0Index}`);
    expect(radio0Label.text()).toEqual(baseProps.customLabels[radio0Index].attributeValueNewCaption);
    

    // Validate radio 1
    const radio1Index = 1;
    const radio1 = radios.eq(radio1Index);
    expect(radio1.attr('class')).toBe('radio');
    const radio1Children = radio1.children();
    expect(radio1Children.length).toBe(2);
    const radio1Input = radio1Children.eq(0);
    expect(radio1Input.attr('id')).toBe(`${baseProps.id}_${radio1Index}`);
    expect(radio1Input.attr('name')).toBe(baseProps.id);
    expect(radio1Input.attr('type')).toBe('radio');
    expect(radio1Input.attr('value')).toBe('false');
    expect(radio1Input.attr('checked')).toBe('checked');
    const radio1Label = radio1Children.eq(1);
    expect(radio1Label.is('label')).toBe(true);
    expect(radio1Label.prop('for')).toBe(`${baseProps.id}_${radio1Index}`);
    expect(radio1Label.text()).toEqual(baseProps.customLabels[radio1Index].attributeValueNewCaption);

    // Validate alertMessageElement
    const alertMessage = controlParent.children().eq(1);
    expect(alertMessage.attr('id')).toBe(`${baseProps.id}-error`);
    expect(alertMessage.hasClass('alert-danger')).toBe(true);
    expect(alertMessage.hasClass('mx-validation-message')).toBe(true);
    expect(alertMessage.text()).toEqual(baseProps.value?.validation);
  });

  it('Tests base, but vertical orientations, no custom class, no custom style', () => {
    const newProps = { ...baseProps };
    newProps.formOrientation = 'vertical';
    newProps.orientation = 'vertical';
    delete newProps.className;
    delete newProps.style;
    const wrapper = render(<RadioButtons {...newProps} />);

    // Validate root: aria-labelledby, id, and class
    expect(wrapper.hasClass('mx-radiobuttons')).toBe(true);
    expect(wrapper.hasClass('form-group')).toBe(true);
    expect(wrapper.hasClass('inline')).toBe(false);
    expect(wrapper.hasClass('no-columns')).toBe(true);
    expect(wrapper.hasClass('has-error')).toBe(true);
    expect(wrapper.hasClass('custom-radio-buttons-class')).toBe(false);

    const children = wrapper.children();
    expect(children.length).toBe(3);

    // Validate control label
    const label = children.eq(0);
    expect(label.is('label')).toBe(true);
    expect(label.attr('id')).toBe(`${baseProps.id}-label`);
    expect(label.prop('for')).toEqual(baseProps.id);
    expect(label.hasClass('control-label')).toBe(true);
    expect(label.hasClass(`col-sm-${baseProps.labelWidth}`)).toBe(false);
    expect(label.attr('class')).not.toContain('col-');
    expect(label.text()).toEqual(baseProps.labelCaption);

    // Validate radio group and its class
    const radioGroup = children.eq(1);
    expect(radioGroup.attr('id')).toBe(baseProps.id);
    expect(radioGroup.hasClass('mx-radiogroup')).toBe(true);
    expect(radioGroup.attr('role')).toBe('radiogroup');
    expect(radioGroup.attr('aria-labelledby')).toBe(`${baseProps.id}-label`);
    expect(radioGroup.attr('aria-required')).toBe('true');

    const radios = radioGroup.children();
    expect(radios.length).toBe(2);

    // Validate radio 0
    const radio0Index = 0;
    const radio0 = radios.eq(radio0Index);
    expect(radio0.attr('class')).toBe('radio');
    const radio0Children = radio0.children();
    expect(radio0Children.length).toBe(2);
    const radio0Input = radio0Children.eq(0);
    expect(radio0Input.attr('id')).toBe(`${baseProps.id}_${radio0Index}`);
    expect(radio0Input.attr('name')).toBe(baseProps.id);
    expect(radio0Input.attr('type')).toBe('radio');
    expect(radio0Input.attr('value')).toBe('true');
    expect(radio0Input.attr('checked')).toBe(undefined);
    const radio0Label = radio0Children.eq(1);
    expect(radio0Label.is('label')).toBe(true);
    expect(radio0Label.prop('for')).toBe(`${baseProps.id}_${radio0Index}`);
    expect(radio0Label.text()).toEqual(baseProps.customLabels[radio0Index].attributeValueNewCaption);

    // Validate radio 1
    const radio1Index = 1;
    const radio1 = radios.eq(radio1Index);
    expect(radio1.attr('class')).toBe('radio');
    const radio1Children = radio1.children();
    expect(radio1Children.length).toBe(2);
    const radio1Input = radio1Children.eq(0);
    expect(radio1Input.attr('id')).toBe(`${baseProps.id}_${radio1Index}`);
    expect(radio1Input.attr('name')).toBe(baseProps.id);
    expect(radio1Input.attr('type')).toBe('radio');
    expect(radio1Input.attr('value')).toBe('false');
    expect(radio1Input.attr('checked')).toBe('checked');
    const radio1Label = radio1Children.eq(1);
    expect(radio1Label.is('label')).toBe(true);
    expect(radio1Label.prop('for')).toBe(`${baseProps.id}_${radio1Index}`);
    expect(radio1Label.text()).toEqual(baseProps.customLabels[radio1Index].attributeValueNewCaption);

    // Validate alertMessageElement
    const alertMessage = children.eq(2);
    expect(alertMessage.attr('id')).toBe(`${baseProps.id}-error`);
    expect(alertMessage.hasClass('alert-danger')).toBe(true);
    expect(alertMessage.hasClass('mx-validation-message')).toBe(true);
    expect(alertMessage.text()).toEqual(baseProps.value?.validation);
  });

  it('Tests base , but vertical form orientation, no label, no validation', () => {
    const newProps = { ...baseProps };
    const mockEditableValueAsValid = createMockEditableValue({ value: true, displayValue: "Yes", readOnly: false, validation: "" });
    newProps.formOrientation = 'vertical';
    newProps.showLabel = false;
    newProps.value = mockEditableValueAsValid;
    const wrapper = render(<RadioButtons {...newProps} />);

    // Validate root: aria-labelledby, id, and class
    expect(wrapper.hasClass('mx-radiobuttons')).toBe(true);
    expect(wrapper.hasClass('form-group')).toBe(true);
    expect(wrapper.hasClass('inline')).toBe(true);
    expect(wrapper.hasClass('no-columns')).toBe(true);
    expect(wrapper.hasClass('has-error')).toBe(false);
    expect(wrapper.hasClass('custom-radio-buttons-class')).toBe(true);

    const children = wrapper.children();
    expect(children.length).toBe(1);

    // Validate label
    expect(children.find('.control-label').length).toBe(0);

    // Validate radio group and its class
    const radioGroup = children.eq(0);
    expect(radioGroup.attr('id')).toBe(baseProps.id);
    expect(radioGroup.hasClass('mx-radiogroup')).toBe(true);
    expect(radioGroup.attr('role')).toBe('radiogroup');
    expect(radioGroup.attr('aria-labelledby')).toBe(`${baseProps.id}-label`);
    expect(radioGroup.attr('aria-required')).toBe('true');

    const radios = radioGroup.children();
    expect(radios.length).toBe(2);

    // Validate radio 0
    const radio0Index = 0;
    const radio0 = radios.eq(radio0Index);
    expect(radio0.attr('class')).toBe('radio');
    const radio0Children = radio0.children();
    expect(radio0Children.length).toBe(2);
    const radio0Input = radio0Children.eq(0);
    expect(radio0Input.attr('id')).toBe(`${baseProps.id}_${radio0Index}`);
    expect(radio0Input.attr('name')).toBe(baseProps.id);
    expect(radio0Input.attr('type')).toBe('radio');
    expect(radio0Input.attr('value')).toBe('true');
    expect(radio0Input.attr('checked')).toBe('checked');
    const radio0Label = radio0Children.eq(1);
    expect(radio0Label.is('label')).toBe(true);
    expect(radio0Label.prop('for')).toBe(`${baseProps.id}_${radio0Index}`);
    expect(radio0Label.text()).toEqual(baseProps.customLabels[radio0Index].attributeValueNewCaption);

    // Validate radio 1
    const radio1Index = 1;
    const radio1 = radios.eq(radio1Index);
    expect(radio1.attr('class')).toBe('radio');
    const radio1Children = radio1.children();
    expect(radio1Children.length).toBe(2);
    const radio1Input = radio1Children.eq(0);
    expect(radio1Input.attr('id')).toBe(`${baseProps.id}_${radio1Index}`);
    expect(radio1Input.attr('name')).toBe(baseProps.id);
    expect(radio1Input.attr('type')).toBe('radio');
    expect(radio1Input.attr('value')).toBe('false');
    expect(radio1Input.attr('checked')).toBe(undefined);
    const radio1Label = radio1Children.eq(1);
    expect(radio1Label.is('label')).toBe(true);
    expect(radio1Label.prop('for')).toBe(`${baseProps.id}_${radio1Index}`);
    expect(radio1Label.text()).toEqual(baseProps.customLabels[radio1Index].attributeValueNewCaption);

    // Validate alertMessageElement
    expect(children.find('.mx-validation-message').length).toBe(0);
  });

  it('Tests base, but vertical form orientation, no custom labels, read-only, remove other options is true', () => {
    const newProps = { ...baseProps };
    newProps.formOrientation = 'vertical';
    newProps.removeOtherOptions = true;
    newProps.useCustomLabels = false;
    newProps.readOnly = true;
    newProps.customLabels = [
      { attributeValueKey: 'true', attributeValueNewCaption: 'Sure' }
    ]
    const wrapper = render(<RadioButtons {...newProps} />);

    // Validate root
    expect(wrapper.hasClass('mx-radiobuttons')).toBe(true);
    expect(wrapper.hasClass('form-group')).toBe(true);
    expect(wrapper.hasClass('inline')).toBe(true);
    expect(wrapper.hasClass('no-columns')).toBe(true);
    expect(wrapper.hasClass('has-error')).toBe(true);
    expect(wrapper.hasClass('custom-radio-buttons-class')).toBe(true);

    const children = wrapper.children();
    expect(children.length).toBe(3);

    // Validate control label
    const label = children.eq(0);
    expect(label.is('label')).toBe(true);
    expect(label.attr('id')).toBe(`${baseProps.id}-label`);
    expect(label.prop('for')).toEqual(baseProps.id);
    expect(label.hasClass('control-label')).toBe(true);
    expect(label.hasClass(`col-sm-${baseProps.labelWidth}`)).toBe(false);
    expect(label.attr('class')).not.toContain('col-');
    expect(label.text()).toEqual(baseProps.labelCaption);

    // Validate radio group and its class
    const radioGroup = children.eq(1);
    expect(radioGroup.attr('id')).toBe(baseProps.id);
    expect(radioGroup.hasClass('mx-radiogroup')).toBe(true);
    expect(radioGroup.attr('role')).toBe('radiogroup');
    expect(radioGroup.attr('aria-labelledby')).toBe(`${baseProps.id}-label`);
    expect(radioGroup.attr('aria-required')).toBe('true');

    const radios = radioGroup.children();
    expect(radios.length).toBe(2);

    // Validate radio 0
    const radio0Index = 0;
    const radio0 = radios.eq(radio0Index);
    expect(radio0.attr('class')).toBe('radio');
    const radio0Children = radio0.children();
    expect(radio0Children.length).toBe(2);
    const radio0Input = radio0Children.eq(0);
    expect(radio0Input.attr('id')).toBe(`${baseProps.id}_${radio0Index}`);
    expect(radio0Input.attr('name')).toBe(baseProps.id);
    expect(radio0Input.attr('type')).toBe('radio');
    expect(radio0Input.attr('value')).toBe('true');
    expect(radio0Input.attr('checked')).toBe(undefined);
    expect(radio0Input.attr('disabled')).toBe('disabled');
    const radio0Label = radio0Children.eq(1);
    expect(radio0Label.is('label')).toBe(true);
    expect(radio0Label.prop('for')).toBe(`${baseProps.id}_${radio0Index}`);
    expect(radio0Label.text()).toEqual('Yes');

    // Validate radio 1
    const radio1Index = 1;
    const radio1 = radios.eq(radio1Index);
    expect(radio1.attr('class')).toBe('radio');
    const radio1Children = radio1.children();
    expect(radio1Children.length).toBe(2);
    const radio1Input = radio1Children.eq(0);
    expect(radio1Input.attr('id')).toBe(`${baseProps.id}_${radio1Index}`);
    expect(radio1Input.attr('name')).toBe(baseProps.id);
    expect(radio1Input.attr('type')).toBe('radio');
    expect(radio1Input.attr('value')).toBe('false');
    expect(radio1Input.attr('checked')).toBe('checked');
    expect(radio1Input.attr('disabled')).toBe('disabled');
    const radio1Label = radio1Children.eq(1);
    expect(radio1Label.is('label')).toBe(true);
    expect(radio1Label.prop('for')).toBe(`${baseProps.id}_${radio1Index}`);
    expect(radio1Label.text()).toEqual('No');

    // Validate alertMessageElement
    const alertMessage = children.eq(2);
    expect(alertMessage.attr('id')).toBe(`${baseProps.id}-error`);
    expect(alertMessage.hasClass('alert-danger')).toBe(true);
    expect(alertMessage.hasClass('mx-validation-message')).toBe(true);
    expect(alertMessage.text()).toEqual(baseProps.value?.validation);
  });

  it('Tests base, but vertical form orientation, remove other options is true', () => {
    const newProps = { ...baseProps };
    const mockEditableValueAsValid = createMockEditableValue({ value: true, displayValue: "Oh, yeah!", readOnly: false, validation: "" });
    newProps.formOrientation = 'vertical';
    newProps.removeOtherOptions = true;
    newProps.useCustomLabels = true;
    newProps.value = mockEditableValueAsValid;
    newProps.customLabels = [
      { attributeValueKey: 'true', attributeValueNewCaption: 'Sure' }
    ]
    const wrapper = render(<RadioButtons {...newProps} />);

    // Validate root
    expect(wrapper.hasClass('mx-radiobuttons')).toBe(true);
    expect(wrapper.hasClass('form-group')).toBe(true);
    expect(wrapper.hasClass('inline')).toBe(true);
    expect(wrapper.hasClass('no-columns')).toBe(true);
    expect(wrapper.hasClass('has-error')).toBe(false);
    expect(wrapper.hasClass('custom-radio-buttons-class')).toBe(true);

    const children = wrapper.children();
    expect(children.length).toBe(2);

    // Validate control label
    const label = children.eq(0);
    expect(label.is('label')).toBe(true);
    expect(label.attr('id')).toBe(`${baseProps.id}-label`);
    expect(label.prop('for')).toEqual(baseProps.id);
    expect(label.hasClass('control-label')).toBe(true);
    expect(label.hasClass(`col-sm-${baseProps.labelWidth}`)).toBe(false);
    expect(label.attr('class')).not.toContain('col-');
    expect(label.text()).toEqual(baseProps.labelCaption);

    // Validate radio group and its class
    const radioGroup = children.eq(1);
    expect(radioGroup.attr('id')).toBe(baseProps.id);
    expect(radioGroup.hasClass('mx-radiogroup')).toBe(true);
    expect(radioGroup.attr('role')).toBe('radiogroup');
    expect(radioGroup.attr('aria-labelledby')).toBe(`${baseProps.id}-label`);
    expect(radioGroup.attr('aria-required')).toBe('true');

    const radios = radioGroup.children();
    expect(radios.length).toBe(1);

    // Validate radio 0
    const radio0Index = 0;
    const radio0 = radios.eq(radio0Index);
    expect(radio0.attr('class')).toBe('radio');
    const radio0Children = radio0.children();
    expect(radio0Children.length).toBe(2);
    const radio0Input = radio0Children.eq(0);
    expect(radio0Input.attr('id')).toBe(`${baseProps.id}_${radio0Index}`);
    expect(radio0Input.attr('name')).toBe(baseProps.id);
    expect(radio0Input.attr('type')).toBe('radio');
    expect(radio0Input.attr('value')).toBe('true');
    expect(radio0Input.attr('checked')).toBe('checked');
    const radio0Label = radio0Children.eq(1);
    expect(radio0Label.is('label')).toBe(true);
    expect(radio0Label.prop('for')).toBe(`${baseProps.id}_${radio0Index}`);
    expect(radio0Label.text()).toEqual(baseProps.customLabels[radio0Index].attributeValueNewCaption);

    // Validate alertMessageElement
    expect(children.find('.mx-validation-message').length).toBe(0);
  });

  it('Tests input click events with base properties', () => {
    const wrapper = mount(<RadioButtons {...baseProps} />);

    const radio0Input = wrapper.find('input').at(0);
    radio0Input.simulate('click');
    expect(mockEditableValue.setValue).toHaveBeenCalledTimes(1);

    const radio1Input = wrapper.find('input').at(1);
    radio1Input.simulate('click');
    expect(mockEditableValue.setValue).toHaveBeenCalledTimes(2);
  });

  it('Tests input click events with base properties, but read-only and vertical radiogroup', () => {
    const newProps = { ...baseProps };
    newProps.formOrientation = 'vertical';
    newProps.readOnly = true;
    const wrapper = mount(<RadioButtons {...newProps} />);

    const radio0Input = wrapper.find('input').at(0);
    radio0Input.simulate('click');
    expect(mockEditableValue.setValue).toHaveBeenCalledTimes(0);

    const radio1Input = wrapper.find('input').at(1);
    radio1Input.simulate('click');
    expect(mockEditableValue.setValue).toHaveBeenCalledTimes(0);
  });
});