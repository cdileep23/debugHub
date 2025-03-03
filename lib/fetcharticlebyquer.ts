import { prisma } from "./prisma"



export const fetchartcilebysearch=async(search:string)=>{
    const artciles= prisma.articles.findMany({
where:{
    OR:[
        {title:{contains:search,mode:'insensitive'}},{category:{contains:search,mode:'insensitive'}}
    ]
},
include:{
    author:{
        select:{
            name:true,
            email:true,
            ImageUrl:true
        }
    }
}
    })

    console.log(artciles)
    return artciles;
}