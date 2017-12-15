// import React from 'react'
// import AnimatedWrapper from "./animated-wrapper"
//
// let About = (props) => (
//     <div>
//         <h1>About Us</h1>
//         <p>Hello Medium!</p>
//     </div>
// )
//
// export default About;

import React, { Component } from "react";
import AnimatedWrapper from "./animated-wrapper";
class About extends Component {
    render() {
        return (
            <div>
                <h1>About</h1>
                <p>About me!</p>
            </div>
        )
    }
}
// About = AnimatedWrapper(About);
export default About;