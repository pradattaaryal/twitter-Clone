"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { ImageIcon, Loader2Icon, SendIcon } from "lucide-react";
import { Button } from "./ui/button";
import { createPost } from "@/actions/post.action";
import { getSignedURL } from "@/actions/urlactions"; // Import the getSignedURL action
import toast from "react-hot-toast";

function CreatePost() {
  const { user } = useUser();
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!content.trim() && !imageFile) return;
  
    setIsPosting(true);
    try {
      let imageURL = ""; // Default to an empty string if no image is uploaded
  
      // Upload image to S3 if an image file is selected
      if (imageFile) {
        const signedURLResult = await getSignedURL();
  
        if (signedURLResult.failure !== undefined) {
          console.error(signedURLResult.failure);
          toast.error("Failed to generate upload URL");
          return;
        }
  
        if (signedURLResult.success) {
          const { urlSigned } = signedURLResult.success;
  
          // Upload the image file to S3
          await fetch(urlSigned, {
            method: "PUT",
            headers: {
              "Content-Type": imageFile.type,
            },
            body: imageFile,
          });
  
          // Extract the image URL without query parameters
          imageURL = urlSigned.split("?")[0];
        }
      }
  
      // Create the post with the content and image URL
      const result = await createPost(content, imageURL); // imageURL is always a string
  
      if (result?.success) {
        setContent("");
        setImageFile(null);
        setImagePreview(null);
        toast.success("Post created successfully");
      }
    } catch (error) {
      console.error("Failed to create post:", error);
      toast.error("Failed to create post");
    } finally {
      setIsPosting(false);
    }
  };

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.imageUrl || "/avatar.png"} alt="User Avatar" />
            </Avatar>
            <Textarea
              placeholder="What's on your mind?"
              className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-0 text-base"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isPosting}
              aria-label="Post content"
            />
          </div>

          <div className="rounded-lg">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isPosting}
              aria-label="Upload image"
              ref={fileInputRef}
              className="hidden"
            />
          </div>

          {imagePreview && (
            <div className="mt-4">
              <img src={imagePreview} alt="Post image preview" className="rounded-lg max-w-full h-auto" />
            </div>
          )}

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
                onClick={handleImageButtonClick}
                disabled={isPosting}
                aria-label="Toggle image upload"
              >
                <ImageIcon className="size-4 mr-2" />
                Photo
              </Button>
            </div>
            <Button
              className="flex items-center"
              onClick={handleSubmit}
              disabled={(!content.trim() && !imageFile) || isPosting}
              aria-label="Submit post"
            >
              {isPosting ? (
                <>
                  <Loader2Icon className="size-4 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <SendIcon className="size-4 mr-2" />
                  Post
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CreatePost;