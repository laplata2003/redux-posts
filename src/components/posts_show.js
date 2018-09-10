
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPost, deletePost } from '../actions';
import Button from 'reactstrap/lib/Button';

class PostsShow extends Component {

    constructor(props) {
        super(props);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
    }

    onDeleteClick() {
        const { id } = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { post } = this.props;

        if (!post) {
            return <div>Cargando ...</div>;
        }

        return (
            <div>
            <div className="float-right margin: 10px;"> 
                <Button color="primary" outline tag={Link} to="/">Volver</Button>
                <Button color="danger" outline onClick={this.onDeleteClick}>Borrar</Button>
            </div>
            <div>
                <h3>{post.title}</h3>
                <h6>Categorias: {post.categories}</h6>
                <h6>{post.content}</h6>
            </div>
            </div>
        );
    }

}

function mapStateToProps({ posts }, ownProps) {
    return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost } )(PostsShow);