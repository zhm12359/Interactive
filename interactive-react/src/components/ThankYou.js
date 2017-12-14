// ./src/pages/ThankYou.js
import React, { Component } from 'react';
import SubscribeForm from '../components/SubscribeForm';
class ThankYou extends Component {
    render() {
        return(
            <div>
                <h2>Thank you!</h2>
                <p>Expect our awesome contents in your email as soon as you confirm subscription!</p>
                <SubscribeForm thanks={true} {...this.props}/>
            </div>
        )
    }
}
export default ThankYou;