import React from 'react';
import { Link } from 'react-router';

const ProductDetail = ({template}) => {
    const { _id, title, units} = template;
    const url = `/products/${_id}`;
    return (
        <Link to={url}>
            <div className="thumbnail">
                <div className="caption">
                    <h3>{title}</h3>
                    <ul className="list-group">
                        <li className="list-group-item">ID: {_id} </li>
                        <li className="list-group-item">Amount: {units}</li>
                    </ul>
                </div>
            </div>
        </Link>
    );
};

export default ProductDetail;
