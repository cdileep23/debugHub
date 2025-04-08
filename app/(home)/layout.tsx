import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react';

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const user = await currentUser();

    if (!user) {
        return <div>{children}</div>;
    }

    await prisma.user.upsert({
        where: { clerkUserId: user.id },
        update: {},
        create: {
            name: user.fullName || "Unknown User",
            clerkUserId: user.id,
            email: user.emailAddresses[0]?.emailAddress || "No Email",
            ImageUrl: user.imageUrl
        }
    });

    return <div>{children}</div>;
};

export default Layout;
