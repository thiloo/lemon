import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';


import App from './components/app';
import ProductOverview from './components/getProductInfo/product_main';
import ProductList from './components/getProductInfo/product_list';
import { Templates, Fields } from '../imports/collections/templates';
import AddTemplate from './components/addTemplate/add_template';


// After Meteor loads, render this to the DOM
const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={ProductList} />
            <Route path="products/:productId" component={ProductOverview} />
            <Route path="templates/:templateId" component={AddTemplate} />
        </Route>
    </Router>
);

Meteor.startup(() => {
    // React renders call
    ReactDOM.render(routes, document.querySelector('.render-target'));
});
