import React from "react";
import { Link } from "react-router-dom";
import articleService from "../appwrite/articles.services";


interface PostCardProps {
  $id: string;
  title: string;
  featuredImage: string;
}

const PostCard: React.FC<PostCardProps> = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full flex justify-center mb-4">
          <img
            src={articleService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl object-cover h-48 w-full"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
