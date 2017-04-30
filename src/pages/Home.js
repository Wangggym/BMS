import React from 'react'
import { Link, hashHistory } from 'react-router'

//文件引入
import HomeLayout from '../layouts/HomeLayout'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <HomeLayout title={'this is home'}>
                <Link to="user/add">添加用户</Link>
                <br />
                <Link to="user/list">用户列表</Link>
            </HomeLayout>
        )
    }
}

export default Home