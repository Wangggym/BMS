import React from 'react'
import PropTypes from 'prop-types'
import BookEditor from '../components/BookEditor'
import { get } from '../utils/request'

export default class BookEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            book: null
        }
    }
    componentWillMount() {
        const bookId = this.context.router.params.id
        get('http://localhost:3000/book/' + bookId)
            .then(res => {
                this.setState({
                    book: res
                })
            })
    }
    render() {
        const { book } = this.state
        return (
            <div>
                {book ? <BookEditor editTarget={book} /> : '加载中...'}
            </div>
        )
    }
}

BookEdit.contextTypes = {
    router: React.PropTypes.object.isRequired
}


