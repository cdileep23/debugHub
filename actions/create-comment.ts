"use server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const createCommentSchema = z.object({
    content: z.string().min(1),
});

type createCommentFormState = {
    errors: {
        content?: string[];
        formErrors?: string[];
    };
};

export const createComment = async (
    articleId: string,
    previousState: createCommentFormState,
    formData: FormData
): Promise<createCommentFormState> => {
    const res = createCommentSchema.safeParse({ content: formData.get("body") });

    if (!res.success) {
        return {
            errors: res.error.flatten().fieldErrors,
        };
    }

    const { userId } = await auth();

    if (!userId) {
        return {
            errors: {
                formErrors: ["You have to log in first"],
            },
        };
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            clerkUserId: userId,
        },
    });

    if (!existingUser) {
        return {
            errors: {
                formErrors: ["User not found. Please register before commenting."],
            },
        };
    }

    try {
        await prisma.comment.create({
            data: {
                authorId: existingUser.id,
                content: res.data.content,
                articleId,
            },
        });
   
           revalidatePath(`/articles/${articleId}`)
      
        return {
            errors: {},
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    formErrors: [error.message],
                },
            };
        } else {
            return {
                errors: {
                    formErrors: ["Error occurred while adding comment"],
                },
            };
        }
    }
};
