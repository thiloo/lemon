import React from 'react';
import { Link } from 'react-router';

const ProductDetail = ({ product }) => {
    const { address } = product;
    const { title, description, quantity, units } = product.template;
    const url = `/products/${address}`;
    return (
        <Link to={url}>
            <div className="thumbnail">
                <div className="caption text-center">
                    <h3>{title}</h3>
                    <ul className="list-group text-left">
                        <li className="list-group-item">Details: {description}</li>
                        <li className="list-group-item">{quantity} {units}</li>
                    </ul>
                </div>
            </div>
        </Link>
    );
};

export default ProductDetail;
