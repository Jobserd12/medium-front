import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import Placeholder from '@tiptap/extension-placeholder';
import apiInstance from "../../utils/axios";
import useUserData from "../../plugin/useUserData";
import Toast from "../../plugin/Toast";
import Swal from "sweetalert2";

const editPostSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(60, "Title cannot exceed 60 characters"),
  preview: z.string()
    .min(1, "Preview text is required")
    .max(200, "Preview cannot exceed 200 characters"),
  category: z.string()
    .min(1, "You must select a category"),
  tags: z.string()
    .min(1, "Tags are required"),
  status: z.string()
    .min(1, "Status is required"),
  image: z.any()
    .optional(),
  content: z.string()
    .min(1, "Content is required")
});

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="border-bottom p-2 mb-3 d-flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`btn btn-sm ${editor.isActive('heading', { level: 1 }) ? 'btn-primary' : 'btn-outline-secondary'}`}
      >
        <i className="fas fa-heading"></i> H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`btn btn-sm ${editor.isActive('heading', { level: 2 }) ? 'btn-primary' : 'btn-outline-secondary'}`}
      >
        <i className="fas fa-heading"></i> H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`btn btn-sm ${editor.isActive('bold') ? 'btn-primary' : 'btn-outline-secondary'}`}
      >
        <i className="fas fa-bold"></i>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`btn btn-sm ${editor.isActive('italic') ? 'btn-primary' : 'btn-outline-secondary'}`}
      >
        <i className="fas fa-italic"></i>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`btn btn-sm ${editor.isActive('bulletList') ? 'btn-primary' : 'btn-outline-secondary'}`}
      >
        <i className="fas fa-list-ul"></i>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`btn btn-sm ${editor.isActive('orderedList') ? 'btn-primary' : 'btn-outline-secondary'}`}
      >
        <i className="fas fa-list-ol"></i>
      </button>
      <button
        type="button"
        onClick={() => {
          const url = window.prompt('Enter the URL:');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className={`btn btn-sm ${editor.isActive('link') ? 'btn-primary' : 'btn-outline-secondary'}`}
      >
        <i className="fas fa-link"></i>
      </button>
      <button
        type="button"
        onClick={() => {
          const url = window.prompt('Enter the image URL:');
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
        className="btn btn-sm btn-outline-secondary"
      >
        <i className="fas fa-image"></i>
      </button>
      <button
        type="button"
        onClick={() => {
          const url = window.prompt('Enter the YouTube URL:');
          if (url) {
            editor.chain().focus().setYoutubeVideo({ src: url }).run();
          }
        }}
        className="btn btn-sm btn-outline-secondary"
      >
        <i className="fas fa-video"></i>
      </button>
    </div>
  );
};

function EditPost() {
  const [categoryList, setCategoryList] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const userId = useUserData()?.user_id;
  const navigate = useNavigate();
  const { id } = useParams();
  const username = useUserData()?.username;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link,
      Youtube,
      Placeholder.configure({
        placeholder: 'Start writing your post content here...',
      }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setValue('content', editor.getHTML());
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm({
    resolver: zodResolver(editPostSchema),
  });

  const fetchPost = async () => {
    try {
      const response = await apiInstance.get(`admin/post-detail/${userId}/${id}/`);
      const post = response.data;
      
      // Establecer los valores iniciales en el formulario
      reset({
        title: post.title,
        preview: post.preview,
        category: post.category?.id.toString(),
        tags: post.tags,
        status: post.status,
        content: post.content
      });

      if (editor) {
        editor.commands.setContent(post.content);
      }

      setImagePreview(post.image);
    } catch (error) {
      Toast("error", "Error loading post");
      navigate(`/profile/@${username}`);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await apiInstance.get(`post/category/list/`);
      setCategoryList(response.data);
    } catch (error) {
      Toast("error", "Error loading categories");
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchPost();
  }, [editor]);

  // Image preview handler
  const imageFile = watch("image");
  useEffect(() => {
    if (imageFile?.[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(imageFile[0]);
    }
  }, [imageFile]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("title", data.title);

    formData.append("image", data.image[0]);
    formData.append("preview", data.preview);
    formData.append("content", data.content);
    formData.append("tags", data.tags);
    formData.append("category", data.category);
    formData.append("post_status", data.status);

    try {
      await apiInstance.patch(`admin/post-detail/${userId}/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      Swal.fire({
        icon: "success",
        title: "Post updated successfully",
      });
      navigate(`/profile/@${username}`);
    } catch (error) {
      Toast("error", "Error updating post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-1">Edit Post</h2>
              <p className="text-muted">Update your post information</p>
            </div>
            <button
              onClick={() => navigate("/posts/")}
              className="btn btn-outline-secondary"
            >
              <i className="fas fa-arrow-left me-2"></i>
              Back
            </button>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title mb-4">Post Preview Information</h5>
                
                {/* Preview Image Section */}
                <div className="mb-4">
                  <label className="form-label d-block">
                    <i className="fas fa-image me-2"></i>Preview Image
                    <small className="text-muted ms-2">Leave empty to keep current image</small>
                  </label>
                  <img
                    src={imagePreview || "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png"}
                    alt="Preview"
                    className="img-fluid rounded mb-2"
                    style={{ maxHeight: "300px", width: "100%", objectFit: "cover" }}
                  />
                  <input
                    type="file"
                    className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                    accept="image/*"
                    {...register("image")}
                  />
                  {errors.image && (
                    <div className="invalid-feedback">{errors.image.message}</div>
                  )}
                </div>

                {/* Title */}
                <div className="mb-3">
                  <label className="form-label">
                    <i className="fas fa-heading me-2"></i>Title
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    {...register("title")}
                  />
                  {errors.title && (
                    <div className="invalid-feedback">{errors.title.message}</div>
                  )}
                </div>

                {/* Preview Text */}
                <div className="mb-3">
                  <label className="form-label">
                    <i className="fas fa-align-left me-2"></i>Preview Text
                    <small className="text-muted ms-2">(Max 200 characters)</small>
                  </label>
                  <textarea
                    className={`form-control ${errors.preview ? 'is-invalid' : ''}`}
                    rows="3"
                    {...register("preview")}
                    maxLength={200}
                  ></textarea>
                  {errors.preview && (
                    <div className="invalid-feedback">{errors.preview.message}</div>
                  )}
                </div>

                {/* Category */}
                <div className="mb-3">
                  <label className="form-label">
                    <i className="fas fa-folder me-2"></i>Category
                  </label>
                  <select
                    className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                    {...register("category")}
                  >
                    <option value="">Select a category</option>
                    {categoryList?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <div className="invalid-feedback">{errors.category.message}</div>
                  )}
                </div>

                {/* Tags */}
                <div className="mb-3">
                  <label className="form-label">
                    <i className="fas fa-tags me-2"></i>Tags
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.tags ? 'is-invalid' : ''}`}
                    placeholder="Example: health, medicine, fitness"
                    {...register("tags")}
                  />
                  {errors.tags && (
                    <div className="invalid-feedback">{errors.tags.message}</div>
                  )}
                </div>

                {/* Status */}
                <div className="mb-3">
                  <label className="form-label">
                    <i className="fas fa-toggle-on me-2"></i>Status
                  </label>
                  <select
                    className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                    {...register("status")}
                  >
                    <option value="Published">Publish</option>
                    <option value="Draft">Draft</option>
                    <option value="Disabled">Disabled</option>
                  </select>
                  {errors.status && (
                    <div className="invalid-feedback">{errors.status.message}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Rich Text Editor Card */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title mb-4">Post Content</h5>
                <MenuBar editor={editor} />
                <EditorContent editor={editor} className="form-control editor-content" />
                {errors.content && (
                  <div className="text-danger mt-2">{errors.content.message}</div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-100 mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin me-2"></i>
                  Updating post...
                </>
              ) : (
                <>
                  <i className="fas fa-save me-2"></i>
                  Update Post
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPost;