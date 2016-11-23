import React from 'react';

const ProductTemplateField = (props) => {
    console.log(props.field);
    return (
        <div>
            <div className="form-group col-md-6">
                <span className="input-group-addon">{props.field.title}</span>
                <input className="form-control" type="text" placeholder="Title" />
            </div>
        </div>
    );
};

export default ProductTemplateField;
