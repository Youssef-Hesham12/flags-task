import  { useEffect, useMemo, useState } from 'react'

import { getFeatureFlags, updateFeatureFlagStatus, type FeatureFlag } from '../services/flags';
import { toast } from 'react-toastify';
import Filters from '../components/filters';
import TableContent from '../components/table-content';
import Header from '../components/Headers';

export default function Home() {

  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<string | null>(null);


  // Filters state
  const [environmentFilter, setEnvironmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');



  function onStatusChange (value:string){
    setStatusFilter(value)
  }


  function onEnvironmentChange (value:string){
    setEnvironmentFilter(value)
  }


   const fetchFlags = async () => {
    try {
      setLoading(true);
      const data = await getFeatureFlags();
      setFlags(data);
       
    } catch (error) {
      console.error('Failed to fetch flags:', error);
     
      toast.error('Failed to load feature flags. Please ensure the server is running.');
    } finally {
      setLoading(false);
    }
  };


    const handleToggle = async (id: string, newStatus: boolean) => {
    // Optimistic update
    const previousFlags = [...flags];
    setFlags(flags.map(flag => 
      flag.id === id ? { ...flag, enabled: newStatus } : flag
    ));
    setLoadingId(id);

    try {
      await updateFeatureFlagStatus(id, newStatus);
      toast.success(`Successfully Updated `  );
    } catch (error) {
      // Revert on error
      console.error('Failed to update flag:', error);
      setFlags(previousFlags);
      toast.error('Failed to update feature flag status');
    } finally {
      setLoadingId(null);
    }
  };


  useEffect(function(){
     fetchFlags()
  },[])



   const filteredFlags = useMemo(() => {
    return flags.filter(flag => {
      const matchesEnv = environmentFilter === 'all' || flag.environment === environmentFilter;
      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'enabled' && flag.enabled) || 
        (statusFilter === 'disabled' && !flag.enabled);
      return matchesEnv && matchesStatus;
    });
  }, [flags, environmentFilter, statusFilter]);


 

  return (
    <>

    <div className="min-h-screen bg-gray-50 bg-linear-to-br from-indigo-50/50 via-white to-purple-50/50">
    

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-8">
          
          {/* Header Section */}

          <Header/>
         

          {/* Filters & Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <Filters
                selectedEnvironment={environmentFilter}
                onEnvironmentChange={onEnvironmentChange}
                selectedStatus={statusFilter}
                onStatusChange={onStatusChange}
              />
            </div>

            {/* Main Table Content */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center min-h-100">
                 
                  <h3 className="text-lg font-medium text-gray-900">Loading Feature Flags</h3>
                  <p className="text-gray-500 text-sm mt-1">Please wait data...</p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden  hover:shadow-md">
                  <TableContent
                    flags={filteredFlags}
                    onToggle={handleToggle}
                    loadingId={loadingId}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>


   

    
    </>
  )
}
