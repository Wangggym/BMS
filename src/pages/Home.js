import React, {Component, PropTypes } from 'react'
import { Link, hashHistory } from 'react-router'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <div>
                <header>
                    <h1>this is Home</h1>
                </header>
                <main>
                    <Link to="user/add">添加用户</Link>
                </main>
            </div>
        )
    }
}

export default Home