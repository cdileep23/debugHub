"use client"

import { SearchIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { useRouter, useSearchParams } from 'next/navigation'

const ArticleSearchInput = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [searchValue, setSearchValue] = useState(searchParams.get('search') || "")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)

    if (searchValue) {
      params.set('search', searchValue)
    } else {
      params.delete('search')
    }

    // Update the URL without a full page reload
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <form onSubmit={handleSearch} className='mx-auto max-w-2xl'>
      <div className='relative'>
        <SearchIcon className='w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2'/>
        <Input 
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder='Search Articles'
          className='w-full pl-10 pr-4'
        />
      </div>
    </form>
  )
}

export default ArticleSearchInput
