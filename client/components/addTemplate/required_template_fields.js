import React, { Component } from 'react';

class RequiredTemplateFields extends Component {
    render() {
        return (
            <div>
                <div className="form-group col-md-6">
                    <span className="input-group-addon">Title</span>
                    <input className="form-control" type="text" placeholder="Title" />
                </div>
                <div className="form-group col-md-6">
                    <span className="input-group-addon">Description</span>
                    <input className="form-control" type="text" placeholder="Description" />
                </div>
                <div className="form-group col-md-6">
                    <span className="input-group-addon">Quantity</span>
                    <input className="form-control" type="text" placeholder="Quantity" />
                    <span className="input-group-addon">Units</span>
                    <input className="form-control" type="text" placeholder="Units" />
                </div>
            </div>
        );
    }
}

export default RequiredTemplateFields;
