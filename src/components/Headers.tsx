
import { PiFlagBannerFill } from "react-icons/pi";
import logo from "../assets/brightskies logo.svg"

export default function Header() {
  return (


    <div>

         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-50 rounded-xl">
                
                <PiFlagBannerFill className="h-8 w-8 text-[#4F97D1]" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  Feature Flags
                </h1>
                <p className="mt-1 text-sm text-gray-500 font-medium">
                  Manage capabilities across your environments
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
             <img src={logo} className='w-50' alt="" />
            </div>
          </div>
        

    </div>
  )
}
