"use client";
import React, { useActionState, useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
// Import ReactQuill theme CSS
import "react-quill-new/dist/quill.snow.css";
import { Button } from "../../ui/button";
import { createArticle } from "@/actions/create-arcticle";


// Dynamically import ReactQuill, disabling SSR.
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const CreateArticles = () => {
  const [content, setContent] = useState("");
const[formState,action, isPending]=useActionState(createArticle,{errors:{}})
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New deBug</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-6">
            <div className="space-y-2">
              <Input type="text" name="title" placeholder="Enter the Bug Title" />
            </div>
            {formState.errors.title && <span className="text-red-400 text-sm">{formState.errors.title}</span>}
            <div className="space-y-2">
              <Label>Category</Label>
              <select name='category' className="flex h-10 w-full rounded-md">
                <option value="">Select Category</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Coding">Coding</option>
              </select>
              {formState.errors.category && <span className="text-red-400 text-sm">{formState.errors.category}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image</Label>
              <Input type="file" name="featuredImage" accept="image/*" id="featuredImage" />
            </div>
            <div className="space-y-2 min-h-4xl">
              <Label>Content</Label>
              <ReactQuill theme="snow" value={content} onChange={setContent} />
      {/* Hidden input to include content in form submissions */}
      <input type="hidden" name="content" value={content} />
            </div>
            {formState.errors.content && <span className="text-red-400 text-sm">{formState.errors.content[0]}</span>}
            <div className="flex justify-end gap-4">
   <Button  variant={'outline'}>Cancel</Button>
   <Button type="submit" disabled={isPending}>{

isPending? "Loading..." : "publish Article"
}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateArticles;
