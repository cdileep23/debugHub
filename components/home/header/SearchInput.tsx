import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import React from 'react'

const SearchInput = () => {
  return (
    <form>
      <div className='relative '>
    
      <SearchIcon className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground'/>
     <Input type="text" name="search" placeholder='Search Errors..' className='pl-10 w-40 focus-visible:ring-1'/>
      </div>
    
    </form>
  )
}

export default SearchInput
