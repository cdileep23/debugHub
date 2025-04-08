"use client";
import React, { useActionState, useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
// Import ReactQuill theme CSS
import "react-quill-new/dist/quill.snow.css";
import { Button } from "../../ui/button";

import { Articles } from "@prisma/client";
import Image from "next/image";
import { updateArticles } from "@/actions/editarticle";

type editArticle={
  article:Articles
}

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const EditArticle :React.FC<editArticle>= ({article}) => {
  const [content, setContent] = useState(article.content);
const[formState,action, isPending]=useActionState(updateArticles.bind(null,article.id),{errors:{}})
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit deBug</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-6">
            <div className="space-y-2">
              <Input type="text" name="title" defaultValue={article.title} placeholder="Enter the Bug Title" />
            </div>
            {formState.errors.title && <span className="text-red-400 text-sm">{formState.errors.title}</span>}
            <div className="space-y-2">
              <Label>Category</Label>
              <select name='category'  defaultValue={article.category} className="flex h-10 w-full rounded-md">
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
            <Image
    src={article.featuredImage}
    alt={article.title}
    width={192}  // w-48 (48 * 4)
    height={128} // h-32 (32 * 4)
    className="object-cover rounded-md"
/>

            <div className="space-y-2 min-h-4xl">
              <Label>Content</Label>
              <ReactQuill theme="snow" value={content} onChange={setContent} />
      {/* Hidden input to include content in form submissions */}
      <input  type="hidden" name="content" value={content} />
            </div>
            {formState.errors.content && <span className="text-red-400 text-sm">{formState.errors.content[0]}</span>}
            <div className="flex justify-end gap-4">
   <Button  variant={'outline'}>Cancel</Button>
   <Button type="submit" disabled={isPending}>{

isPending? "Loading..." : "Update Bug"
}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditArticle;
