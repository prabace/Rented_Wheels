import React from "react";

const Filter = (props) => {

  
  
  return (
    
      <div class="items-center  ">
        <div class="flex p-2  rounded-lg relative">
          
          <input
            class="bg-gray-100 outline-none"
            onChange={props.handleFilter}
            type="text"
            value={props.filter}
            placeholder="Vehicle name..."
          />
          <div class="py-3 absolute right-8 top-1 text-white font-semibold rounded-lg transition duration-3000 cursor-pointer">
          <span><svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 opacity-30 text-dark hover:text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg></span>
        </div>
        </div>
    
        
      </div>
      
  );
};

export default Filter;
