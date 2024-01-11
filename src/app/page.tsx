//Home Page
'use client'

import SearchForm from "@/components/homepage-search-form/search-form";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router:AppRouterInstance  = useRouter();

  return (
    <>
    <div className="w-full block bg-[url('../../public/sky.jpg')] bg-cover">
      <div className="flex justify-center flex-wrap">
        <div className="w-full xl:max-w-screen-xl mt-32 flex justify-center flex-wrap">
          <h1 className="my-4 text-white font-bold text-3xl w-full text-center flex justify-center">
            Từ Việt Nam Đến Thế Giới, Trong Tầm Tay Bạn
          </h1>
          <SearchForm router={router} />
        </div>

        <div className='bg-white w-full rounded-t-3xl flex justify-center'>
          <div className="pt-16 w-full xl:max-w-screen-xl">
            <div className="">
              <h2 className="font-bold text-xl">Content</h2>
              <div className="grid grid-cols-3 gap-8">
                <div className="h-40 bg-blue-300 rounded-md"></div>
                <div className="h-40 bg-blue-300 rounded-md"></div>
                <div className="h-40 bg-blue-300 rounded-md"></div>
                <div className="h-40 bg-blue-300 rounded-md"></div>
                <div className="h-40 bg-blue-300 rounded-md"></div>
                <div className="h-40 bg-blue-300 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>  
      </div>
    </div>
    </>
  )
}
