import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import articleService from "../appwrite/articles.services";
import Select from "./ui/Select";
import Button from "./ui/Button";
import Input from "./ui/Input";
import RTE from "./ui/RTE";

// Define form data type
interface PostFormValues {
  title: string;
  slug: string;
  content: string;
  status: "active" | "inactive";
  image?: FileList;
  featuredImage?: string;
}

// Define props type
interface PostFormProps {
  post?: {
    $id: string;
    title: string;
    content: string;
    status: "active" | "inactive";
    featuredImage: string;
  };
}

const PostForm: React.FC<PostFormProps> = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm<PostFormValues>({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.auth.userData);

  const submit = async (data: PostFormValues) => {
    if (post) {
      let featuredImage = post.featuredImage;

      if (data.image?.[0]) {
        const file = await articleService.uploadFile(data.image[0]);
        await articleService.deleteFile(post.featuredImage);
        featuredImage = file.$id;
      }

      const dbPost = await articleService.updatePost(post.$id, {
        ...data,
        featuredImage,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await articleService.uploadFile(data.image?.[0]);

      if (file) {
        const fileId = file.$id;
        const dbPost = await articleService.createPost({
          ...data,
          featuredImage: fileId,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value: string): string => {
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]+/g, "-")
      .replace(/\s+/g, "-");
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title || ""), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={articleService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
