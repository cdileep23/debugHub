"use server"

import { redirect } from "next/navigation"

export const searchAction=async(formData:FormData)=>{
    const searchText=formData.get('search')
    console.log("sercer")
    if(typeof searchText!=='string' || !searchText){
        redirect('/')
    }

    redirect(`/articles?search=${searchText}`)
}