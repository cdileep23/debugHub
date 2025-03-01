intsalll next js latest version 

npx create-next-app@latest


create a new neon db which use postgresql and copy the given DB url link to .env


install prisma for databse setup

npm i prisma --save-dev

npm install @prisma/client

npx prisma init --datasource-provider postgresql

create Models

creating header 

we use next themes to provide dark light system theme 


clerk authnetication


npm install @clerk/nextjs

create middleware.ts in root folder where env is created 

when ever anthing is opened code in middleware is executed is executed


  //when ever we need user in server component using clerk 

    const user=await currentUser();


    