import React from 'react';
import { hashHistory } from 'react-router'
import FormItem from '../components/FormItem';
import formProvider from '../utils/formProvider';

//文件引入
import UserEditor from '../components/UserEditor'

class UserAdd extends React.Component {
    render() {
        return (
                <UserEditor />
        );
    }
}

export default UserAdd;