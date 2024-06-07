import { EditableValue, ValueStatus, Option, SimpleFormatter, ParseResult } from "mendix";

const option2Value : Option<boolean> = undefined;
const valueFormatter : SimpleFormatter<boolean> = {
    format: () => "",
    parse: () : ParseResult<boolean> => {
        return {
            valid: true,
            value: true
        }
    }
};
export function getPreviewEditableValue(universe: boolean[] | undefined, displayValue: string): EditableValue<boolean> {
    return {
        status: ValueStatus.Available,
        readOnly: true,
        value: option2Value,
        displayValue,
        setValue: () => {return},
        setTextValue: () => {return},
        validation: "", 
        formatter: valueFormatter,
        setValidator: () => {return},
        setFormatter: () => {return},
        universe
    };
}