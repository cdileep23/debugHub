"use server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY 
});

const createArticleSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be at most 100 characters"),
  category: z.string().min(1, "Category is required").max(50, "Category must be at most 50 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

type createArticlesFormState = {
  errors: {
    title?: string[],
    category?: string[],
    featuredImage?: string[],
    content?: string[],
    formError?: string[]
  }
};

export const createArticle = async(
  prevState: createArticlesFormState, 
  formData: FormData
): Promise<createArticlesFormState> => {
  // Validate the form data using Zod
  const res = createArticleSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    content: formData.get("content")
  });

  if (!res.success) {
    return {
      errors: res.error.flatten().fieldErrors
    };
  }

  // Authenticate the user using Clerk
  const { userId } = await auth();
  if (!userId) {
    return {
      errors: {
        formError: ['You have to log in first']
      }
    };
  }

  const existingUser=await prisma.user.findUnique({
    where:{
        clerkUserId:userId
    }
  })

  if(!existingUser){
return {
    errors:{
        formError:["user Not Found , Please Register before Creating Article"]
    }
}
  }

  // Get the image file from form data and ensure it's a File instance
  const imageFile = formData.get("featuredImage");
  if (!imageFile || !(imageFile instanceof File)) {
    return {
      errors: {
        featuredImage: ["Image file is required"]
      }
    };
  }


  const arrayBuffer = await imageFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

 
  const uploadResult: UploadApiResponse | undefined = await new Promise(
    (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    }
  );

  const imageUrl = uploadResult?.secure_url;
  if(!imageUrl){
    return{
        errors:{
            featuredImage:["Failed To Upload The Image, Please Try Again"]
        }
    }
  }

  try {
    await prisma.articles.create({
        data:{
            title:res.data.title,content:res.data.content,category:res.data.category,featuredImage:imageUrl,authorId:existingUser.id
        }
    })
  } catch (error:unknown) {
   if(error instanceof Error){
    return{
        errors:{
            formError:[error.message]
        }
    }
   }else{
    return{
    errors:{
        formError:["Some Internal Error Occured"]
    }
   }}
  }
  // After processing, redirect the user
  revalidatePath('/')
  redirect("/dashboard");
  // Return an empty error state (redirect halts execution, but TypeScript expects a return)
  return { errors: {} };
};
