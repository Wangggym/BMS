import React from 'react'
import style from '../styles/home-page.less'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <div className={style.welcome}>
                welcome
            </div>
        )
    }
}

export default Home