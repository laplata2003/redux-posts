
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPost } from '../actions';

class PostsShow extends Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
    }

    render() {
        const { post } = this.props;

        if (!post) {
            return <div>Cargando ...</div>;
        }

        return (
            <div>
            <div className="float-right"> 
                <Link to="/">Volver</Link>
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

export default connect(mapStateToProps, { fetchPost } )(PostsShow);