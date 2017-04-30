import React from 'react'
import PropTypes from 'prop-types'
//文件引入
import HomeLayout from '../layouts/HomeLayout'
import UserEditor from '../components/UserEditor'

export default class UserEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
    }
    componentDidMount() {
        const userId = this.context.router.params.id;
        fetch('http://localhost:3000/user/' + userId)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    user: res
                })
            })
    }
    render() {
        const user = this.state.user
        return (
            <HomeLayout title='编辑用户'>
                {user ? <UserEditor editTarget={user} /> : '加载中...'}
            </HomeLayout>
        )
    }
}

UserEdit.contextTypes = {
    router: React.PropTypes.object.isRequired
};