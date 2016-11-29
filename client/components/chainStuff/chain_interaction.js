import React, {Component} from 'react';

class ChainInteraction extends Component {
    getInfo() {

        Meteor.call('eth.send.newTransaction', 'e19dde9ff41c7ae1092b9b8822160c31d8523f44', 'a6851cd98f5b2bd2dfe66e6b558b7e9dfb3addd3', 3000000000, '4ffa2048145440371889ed1c4f1c88ef26d0b3063bb15d46b1cfed5ff09ff0d7', (error, value) => {
            if(error) {
                console.log('error:', error);
            } else {
                console.log(value);
            }
        });
    }

    render() {
        return (
            <div>Hello this is working!!! {this.getInfo()}</div>
        );
    }
}

export default ChainInteraction;
