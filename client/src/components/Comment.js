import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function Comment({ comment }) {
  return (
    <div className="border-t pt-2">
      <p>
        <Link to={`/profile/${comment.user.id}`} className="font-bold">
          {comment.user.name}
        </Link>
        : {comment.content}
        <span className="text-gray-500 text-sm ml-2">
          {moment(comment.createdAt).fromNow()}
        </span>
      </p>
    </div>
  );
}

export default Comment;