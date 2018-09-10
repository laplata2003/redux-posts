
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';

import { fetchPosts } from '../actions';

class PostsIndex extends Component {

    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        return _.map(this.props.posts, post => {
            return (
                <ListGroupItem key={post.id}>
                    <Link to={`/posts/${post.id}`}>
                        {post.title}
                    </Link>
                </ListGroupItem>
            )
        });
    }

    render() {
        return (
            <div>
                <div className="float-right"> 
                    <Button outline color="primary" tag={Link} to="/posts/new">
                        Agregar un Post
                    </Button>
                </div>
                <h3>Posts</h3>
                <ListGroup>
                    {this.renderPosts()}
                </ListGroup>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {posts: state.posts};
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);