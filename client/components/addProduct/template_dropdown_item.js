import React from 'react';

const TemplateDropdownItem = (props) => {
    return (
        <div className="">
            <li className='list-group-item'
                onClick={() => {
                    props.onTemplateSelect(props.template._id); }}>

                <div className="bring-one-line">{props.template.title} - {props.template.description}</div>
            </li>
        </div>
    );
};

export default TemplateDropdownItem;
