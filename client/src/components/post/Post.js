import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { getPost } from "../../actions/post";

import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

// const Post = ({ getPost, post: { post, loading }, match }) => {
const Post = ({ getPost, post: { post, loading } }) => {
  const { id } = useParams();

  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  console.log(post);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link className="btn" to={"/posts"}>
        Back to Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
