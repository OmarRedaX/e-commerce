import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

export default function useBrands() {

    function getBrands(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
        
    }

    let brandsInfo = useQuery({
        queryKey:["brands"],
        queryFn: getBrands,
        staleTime:20000,
        // retry: 3,
        // // retryDelay:6000,
        // // refetchInterval:30000,
        // refetchOnWindowFocus:true,
      });
    
    return brandsInfo;
}
