import type { FeatureFlag } from '../services/flags';
import Toggle from './toggle';


interface FeatureFlagTableProps {
  flags: FeatureFlag[];
  onToggle: (id: string, enabled: boolean) => void;
  loadingId: string | null;
}

export default function TableContent({
  flags,
  onToggle,
  loadingId
}:FeatureFlagTableProps) {


  function  formatDate(value:string){
    const reDate= new Date(value).toISOString().split("T")[0]
    return reDate
    }



 if (flags.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No feature flags found matching your criteria.
      </div>
    );
  }

  return (


    <div className="overflow-x-auto rounded-lg shadow ring-1 ring-black ring-opacity-5">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
              Name
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Environment
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Status
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Created Date
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {flags.map((flag) => (
            <tr key={flag.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                {flag.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                
                  {flag.environment}
              
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <span
                  className={
                    `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium 
                    ${flag.enabled ? "text-green-800 bg-green-100" : "text-gray-800 bg-gray-100"}`
                  }
                >
                  {flag.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {formatDate(flag.createdDate)}
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <div className="flex items-center justify-end gap-2">

                    <div className='w-10 h-10 '>
                        {loadingId === flag.id && (
                    <span className="loader"></span>
                  )}

                    </div>
                  
                  <Toggle
                    checked={flag.enabled}
                    onChange={(checked) => onToggle(flag.id, checked)}
                    disabled={loadingId === flag.id}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
