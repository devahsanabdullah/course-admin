import { useState } from "react";
import Sorting from "@/components/Sorting";
import Checkbox from "@/components/Checkbox";
import Image from "@/components/Image";

import { products } from "@/mocks/products";
import {useAxios} from '@/components//services/http.service'
import { useQuery } from 'react-query'
type ProductsProps = {};

const Products = ({}: ProductsProps) => {
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [checkboxes, setCheckboxes] = useState(products);

    const handleCheckboxChange = (checkboxId: string) => {
        const updatedCheckboxes = [...checkboxes];
        const checkboxIndex = updatedCheckboxes.findIndex(
            (checkbox) => checkbox.id === checkboxId
        );
        updatedCheckboxes[checkboxIndex].isChecked =
            !updatedCheckboxes[checkboxIndex].isChecked;
        setCheckboxes(updatedCheckboxes);
    };

    const handleSelectAll = (value: boolean) => {
        setSelectAll(value);
        const updatedCheckboxes = [...checkboxes];
        for (let checkbox of checkboxes) {
            checkbox.isChecked = value;
        }
        setCheckboxes(updatedCheckboxes);
    };
    const {  get } = useAxios()
    const fetchData = async () => {
      let endpoint = `/allUser`
      const response = await get(endpoint)
      return response?.data
    }
    const { data: userData, isLoading } = useQuery(
        ['userData'],
        fetchData,
        {
          refetchOnWindowFocus: false,
          refetchOnReconnect: false
        }
      )
      console.log(userData?.allUsers)
    return (
        <div className="relative mt-8 p-8 rounded-3xl bg-white card-shadow md:p-6 md:pt-8 dark:bg-dark-2">
            <Sorting />
            <div className="table w-full mt-10 border-b border-grey-light md:-mt-8.5 md:block md:w-auto md:-mx-6 dark:border-grey-light/10">
                <div className="table-row text-caption-1 text-[#B2B3BD] md:flex md:items-center md:pl-6">
                    {/* <div className="table-cell align-middle w-5 pb-6">
                        <Checkbox
                            className="mb-5 last:mb-0"
                            value={selectAll}
                            onChange={() => handleSelectAll(!selectAll)}
                        />
                    </div> */}
                    <div className="table-cell align-middle pl-4 pb-6 md:pl-6">
                        Name
                    </div>
                    <div className="table-cell align-middle pl-5 pb-6 md:hidden">
                    Company
                    </div>
                    <div className="table-cell align-middle pl-5 pb-6 md:hidden">
                        phone Number
                    </div>
                    <div className="table-cell align-middle pl-5 pb-6 md:hidden">
                        Role
                    </div>
                    <div className="table-cell align-middle pl-5 pb-6 md:hidden">
                        status
                    </div>
                </div>
                {userData?.allUsers?.map((product:any) => (
                    <div
                        className="table-row md:flex md:items-center md:flex-wrap md:p-6 md:border-t md:border-grey-light dark:md:border-grey-light/10"
                        key={product?._id}
                    >
                        {/* <div className="table-cell align-middle w-5 py-8 border-t border-grey-light md:py-0 md:border-t-0 dark:border-grey-light/10">
                            <Checkbox
                                className="mb-5 last:mb-0"
                                value={product?.isChecked}
                                onChange={() =>
                                    handleCheckboxChange(product?._id)
                                }
                            />
                        </div> */}
                        <div className="table-cell align-middle pl-4 py-8 border-t border-grey-light md:grow md:pl-6 md:py-0 md:border-t-0 dark:border-grey-light/10">
                            <div className="flex items-center">
                                <div className="relative shrink-0 w-24 mr-6 rounded-lg bg-[#A0D7E7] before:absolute before:z-1 before:top-full before:left-2 before:right-2 before:h-2 before:rounded-b-lg before:bg-[#E7FAFF] xl:w-18 xl:mr-4">
                                    <Image
                                        className="w-full"
                                        src={product?.image}
                                        width={96}
                                        height={72}
                                        alt=""
                                    />
                                </div>
                                <div className="grow">
                                    <div className="mb-2 text-title">
                                        {product?.name}
                                    </div>
                                    <div className="text-caption-1 text-grey">
                                        {product?.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-cell align-middle pl-5 py-8 border-t border-grey-light md:hidden dark:border-grey-light/10">
                            {product?.company} 
                        </div>
                      
                        <div className="table-cell align-middle pl-5 py-8 border-t border-grey-light md:hidden dark:border-grey-light/10">
                            <div className="group relative cursor-pointer">
                                <div className="text-link">
                                {product?.phone} 
                                </div>
                                <div className="absolute z-1 top-1/2 left-1/2 min-w-[10rem] -translate-x-1/2 -translate-y-1/2 px-6 py-8 rounded-3xl bg-white shadow-[0_1.25rem_2rem_rgba(227,230,236,0.9)] transition-all invisible opacity-0 group-hover:visible group-hover:opacity-100 lg:hidden dark:bg-dark-2 dark:shadow-[0_1.25rem_2rem_rgba(0,0,0,0.5)]">
                                    <div className="flex items-center mb-2 text-caption-2 text-grey">
                                        <div className="flex justify-center items-center w-4 h-4 mr-2 rounded-md bg-[#FF9A7B]">
                                            <Image
                                                className="w-2"
                                                src="/images/chat-black.svg"
                                                width={8}
                                                height={8}
                                                alt=""
                                            />
                                        </div>
                                        Latest Sale
                                    </div>
                                    <div className="text-h3">
                                        ${product?.price}
                                    </div>
                                    <div className="relative w-18 h-0.5 bg-grey-light rounded-full dark:bg-grey-light/10">
                                        <div
                                            className="absolute top-0 left-0 bottom-0 bg-primary rounded-full"
                                            style={{ width: "60%" }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-cell align-middle pl-5 py-8 border-t border-grey-light md:hidden dark:border-grey-light/10">
                            <span className="text-green">
                                {product?.role}
                            </span>
                           
                        </div>
                        <div className="table-cell align-middle pl-5 py-8 border-t border-grey-light md:hidden dark:border-grey-light/10">
                            
                            <span className="ml-2 text-grey">
                            {product?.verified?"Active":"In-Active"}
                            </span>
                        </div>
                       
                    </div>
                ))}
            </div>
            {/* <div className="mt-10 text-center 2xl:mt-6">
                <button className="btn-black min-w-[10.5rem]">Load More</button>
            </div> */}
        </div>
    );
};

export default Products;
