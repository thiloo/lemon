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
        browserHistory.push(`/chain/products/${this.state.value}`);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form-group">
                <input type="text" placeholder="Enter an Address" value={this.state.value} onChange={this.handleChange} className="form-control" />
                <input type="submit" value="Submit" className="btn btn-primary" />
            </form>
        );
    }
}

export default SearchBox;
