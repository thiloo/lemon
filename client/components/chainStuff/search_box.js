import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if(Meteor.userId()) {
            browserHistory.push(`/products/${this.state.value}`);
        } else {
            browserHistory.push(`/chain/products/${this.state.value}`);
        }


    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form-inline">
                <div className="input-group col-sm-8 col-sm-offset-3">
                    <input type="text" placeholder="Search for a product, enter an address" value={this.state.value} onChange={this.handleChange} className="form-control" />
                     <span className="input-group-btn">
                         <button type="submit" value="Submit" className="btn btn-default">Search</button>
                     </span>
                </div>
            </form>
        );
    }
}

export default SearchBox;
