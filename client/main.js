import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';


import App from './components/app';
import ProductOverview from './components/getProductInfo/product_main';
import ProductList from './components/getProductInfo/product_list';
import NewProduct from './components/addProduct/new_product_main';
import SendProduct from './components/sendProduct/send_product';
import { Fields } from '../imports/collections/fields';
import { Templates } from '../imports/collections/templates';
import { Products } from '../imports/collections/products';
import { Keys } from '../imports/collections/keys';
import ChainInteraction from './components/chainStuff/chain_interaction';
import WalletMain from './components/wallet/wallet_main';

import AddTemplate from './components/addTemplate/add_template';


// After Meteor loads, render this to the DOM
const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={ProductList} />
            <Route path="products/:productId" component={ProductOverview} />
            <Route path="products/add/:productId" component={NewProduct} />
            <Route path="products/send/:productId" component={SendProduct} />
            <Route path="templates/:templateId" component={AddTemplate} />
            <Route path="wallet" component={WalletMain} />
        </Route>
    </Router>
);

Meteor.startup(() => {
    // React renders call
    ReactDOM.render(routes, document.querySelector('.render-target'));
});
