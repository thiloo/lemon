import React from 'react';

const Home = () => {
    return (
        <div className="col-md-10">
            <h2 className="text-center">lemon</h2>
            <div>
                <h4>What is lemon?</h4>
                <p>
                    Lemon is a provenance tool that allows you to keep track of goods by tagging them with a unique blockchain address. This way you can learn more about a product's history to help you determine it's true value to you. Honest producers, that produce to fair standards have an incentive to show that. Lemon just enables this by allowing producers to bring more transparency into their supply chain.
                </p>
                <h4>How does it work?</h4>
                <ol>
                    <li>Producer manufactures good and pubishes it to blockchain</li>
                    <li>Blockchain returns unique address that allows product tracking</li>
                    <li>Producer transfers ownership tokens to customers</li>
                    <li>Customers are able to look up info on the good</li>
                </ol>
            </div>

        </div>
    );
};

export default Home;
