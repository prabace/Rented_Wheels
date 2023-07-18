import React from 'react'

const Pagination = ({totalPosts, postsPerPage, setCurrentPage}) => {
    let pages = [];

    for(let i=1 ; i<= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i)
    };

  return (
    <div>
    { pages.map((page, index) => {
            return <button onClick={() => setCurrentPage(page)} 
                            className='px-2 py-1 mx-2 shadow-[0px_10px_20px_10px_#00000024] border-none bg-transparent text-orange-800 '
                             key={index}>{page}</button>
        })}
    </div>
  ) 
}

export default Pagination