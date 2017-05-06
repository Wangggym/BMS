import React from 'react'
import BookEditor from '../components/BookEditor'
import HomeLayout from '../layouts/HomeLayout'
export default class BookAdd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <HomeLayout title='添加图书'>
                <BookEditor />
            </HomeLayout>
        )
    }
}