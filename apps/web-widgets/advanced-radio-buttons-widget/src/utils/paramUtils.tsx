import { AdvancedRadioButtonsContainerProps, AdvancedRadioButtonsPreviewProps } from "typings/AdvancedRadioButtonsProps";
import { ControlLabelProps, FormHorizotalLayout, NoControlLabelProps, SingleRadioValueProps } from "src/userTypes";

function isLabelWidth(value: number): value is FormHorizotalLayout['labelWidth'] {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].includes(value);
}

function toLabelWidth(value: number): FormHorizotalLayout['labelWidth'] {
    return isLabelWidth(value) ? value : (value < 1 ? 1 : 11);
}

export function prepareControlLabelParams(props: AdvancedRadioButtonsContainerProps | AdvancedRadioButtonsPreviewProps): ControlLabelProps | NoControlLabelProps {
    if (props.showLabel) {
        const labelCaption = typeof props.labelCaption == "string" ? props.labelCaption : (props.labelCaption?.value  ?? '');
        if (props.showLabel && props.formOrientation === "horizontal") {
            return {
                withControlLabel: true,
                caption: labelCaption,
                useColumns: true,
                bootsrapBreakpoint: 'sm',
                labelWidth: toLabelWidth(props.labelWidth || 12)
            }
        }
        return {
            withControlLabel: true,
            caption: labelCaption,
            useColumns: false
        }
    }
    return {
        withControlLabel: false
    }
}

export function prepareValuesParam(props: AdvancedRadioButtonsContainerProps): SingleRadioValueProps[] {
    let valueObject : SingleRadioValueProps[] = [];
    if (!props.attributeValue.universe) {
        return valueObject;
    } else {
        for (let i = 0; i < props.attributeValue.universe.length; i++) {
            const universeValue = props.attributeValue.universe[i];
            let radioLabel = universeValue === true ? "Yes" : universeValue === false ? "No" : universeValue;
    
            if (props.useCustomLabels) {
                const customLabel = props.customLabels.find(l => l.attributeValueKey === universeValue.toString());
                if (!customLabel && props.removeOtherOptions) {
                    continue;
                }
                if (customLabel) {
                    radioLabel = customLabel.attributeValueNewCaption;
                }
            }

            valueObject.push({
                isChecked: props.attributeValue.value !== undefined ? props.attributeValue.value === universeValue : false,
                value: universeValue === true,
                label: radioLabel
            });
        }
    }
    return valueObject;
}

export function preparePreviewValuesParam(props: AdvancedRadioButtonsPreviewProps): SingleRadioValueProps[] {
    let valueObject : SingleRadioValueProps[] = [
        {
            isChecked: false,
            value: true,
            label: "Yes"
        },
        {
            isChecked: false,
            value: false,
            label: "No"
        }
    ];
    if (props.useCustomLabels && props.customLabels) {
        if (props.removeOtherOptions) {
            //removing other options
            valueObject = valueObject.filter(vo => props.customLabels.find(cl => vo.value.toString() == cl.attributeValueKey));
        }
        valueObject = valueObject.map(vo => {
            const customLabel = props.customLabels.find(cl => vo.value.toString() == cl.attributeValueKey);
            if (customLabel) {
                vo.label = customLabel.attributeValueNewCaption
            }
            return vo;
        })
    }
    return valueObject;
}