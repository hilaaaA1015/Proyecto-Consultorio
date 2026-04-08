import React from "react";
import { Input, Form, FormGroup } from "rsuite";
import "./formfields.css"


interface FieldProps {
as?: React.ElementType;
field: React.InputHTMLAttributes<HTMLInputElement>; 
errors?: string;
labelText?: React.ReactNode;
required?: boolean;
[key: string]: any
}
const FormFields = (props: FieldProps) => {
const {as: Component = Input, field, errors, labelText, required, ...rest} = props;

const {name, value, onChange, onBlur} = field;
return (
    <FormGroup className={`form-group ${rest.className || ""}`}>
        <Form.Label  htmlFor={name}>{labelText}
            {required && <span>*</span>}
        </Form.Label>
         <Component id={name} value={value} onChange ={onChange} onBlur={onBlur} {... rest} />     
             <Form.ErrorMessage show={!!errors} placement='bottomStart'>
                {errors}
                </Form.ErrorMessage> 
            </FormGroup>
)
}
export default FormFields;