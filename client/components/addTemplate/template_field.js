import React from 'react';

const NewField = (props) => {
    return (
        <div className="form-group row">
            <div className="col-md-2">
                <input className="form-control col-md-2" placeholder="Field Title" />
            </div>
            <div className="col-md-2">
                <input className="form-control col-md-2" placeholder="Field Type (Dropdown later)" />
            </div>
            <div className="checkbox enabled cold-md-2">
                <label><input type="checkbox" /> Mandatory</label>
            </div>
        </div>
    );
};
export default NewField;
