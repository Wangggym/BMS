import React from 'react'
import BookEditor from '../components/BookEditor'

export default class BookAdd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <BookEditor />
        )
    }
}