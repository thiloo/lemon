import React from 'react';

const SingleWallet = (props) => {
    return (
        <div id={props.wallet._id}>
            {props.wallet.walletName}
            <input
                value={props.state.password}
                onChange={(event) => props.onPasswordInput(event.target.value)}
                type="password"
                placeholder="Please insert your password for this wallet" />
            <button onClick={(event) => props.unlockWallet(event)}>Unlock</button>
        </div>
    );
};

export default SingleWallet;
