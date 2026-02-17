
import { PiFlagBannerFill } from 'react-icons/pi'

interface FilterProps {
  onEnvironmentChange: (env: string) => void;
  onStatusChange: (status: string) => void;
  selectedEnvironment: string;
  selectedStatus: string;
}



  const filters = [
    {
      id: 'environment',
      name: 'Environment',
      options: [
        { value: 'all', label: 'All Environments'},
        { value: 'production', label: 'Production' },
        { value: 'staging', label: 'Staging' },
        { value: 'development', label: 'Development' },
      ],
    },
    {
      id: 'status',
      name: 'Status',
      options: [
        { value: 'all', label: 'All Statuses' },
        { value: 'enabled', label: 'Enabled' },
        { value: 'disabled', label: 'Disabled' },
      ],
    },
  ];




export default function Filters({onEnvironmentChange,
  onStatusChange,
  selectedEnvironment,
  selectedStatus,}:FilterProps) {


  return (
     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
         <PiFlagBannerFill className="h-8 w-8 text-[#4F97D1]" />
        Filters
      </h3>
      <div className="space-y-6">
        <div>
          <label htmlFor="environment-filter" className="block text-sm font-semibold text-gray-700 mb-2">
            Environment
          </label>
          <div className="relative">
            <select
              className="block w-full pl-3 pr-10 py-2.5 text-sm border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4F97D1] focus:border-transparent rounded-lg bg-gray-50 hover:bg-white transition-colors cursor-pointer "
              value={selectedEnvironment}
              onChange={(e) => onEnvironmentChange(e.target.value)}
            >
              {filters[0].options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
             
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="status-filter" className="block text-sm font-semibold text-gray-700 mb-2">
            Status
          </label>
          <div className="relative">
             <select
              className="block w-full pl-3 pr-10 py-2.5 text-sm border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4F97D1] focus:border-transparent rounded-lg bg-gray-50 hover:bg-white transition-colors cursor-pointer "
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
            >
              {filters[1].options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
