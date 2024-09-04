import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';


export default function useCategories() {
    
    function getCategories(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
        
    }

    let categoriesInfo = useQuery({
        queryKey:["categories"],
        queryFn: getCategories,
        staleTime:20000,
        // retry: 3,
        // // retryDelay:6000,
        // // refetchInterval:30000,
        // refetchOnWindowFocus:true,
      });
    
    return categoriesInfo;
}

