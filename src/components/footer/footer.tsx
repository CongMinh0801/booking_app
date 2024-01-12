export default function Footer() {
    return (
        <div className="w-full flex flex-wrap bg-white justify-center items-center mt-2 border-t border-gray-200">
            <div className="flex justify-center bg-white w-full xl:max-w-screen-xl text-sm p-2">
                Footer content
            </div>

            <span className="flex justify-center text-sm py-6 border-t-2 border-gray-200 text-gray-500 w-full sm:text-center">
                © 2023 
                <a href="https://flowbite.com/" className="hover:underline">
                    My App
                </a>
                . All Rights Reserved.
            </span>
        </div>
    )
}