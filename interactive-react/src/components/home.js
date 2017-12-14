// import React from 'react'
// import { push } from 'react-router-redux'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
//
//
// const Home = props => (
//     <div>
//         <h1>Home</h1>
//         <p>Welcome home!</p>
//         <button onClick={() => props.changePage()}>Go to about page via redux</button>
//     </div>
// )
//
// const mapDispatchToProps = dispatch => bindActionCreators({
//     changePage: () => push('/about-us')
// }, dispatch)
//
// export default connect(
//     null,
//     mapDispatchToProps
// )(Home)

import React, { Component } from "react";
import AnimatedWrapper from "./animated-wrapper";
class Home extends Component {
    render() {
        return (
            <div className="page">
                <h1>Home</h1>
                <p>Hello from the home page!</p>
            </div>
        )
    }
}
// Home = AnimatedWrapper(Home);
export default Home;