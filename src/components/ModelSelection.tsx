"use client"
import useSWR from "swr"
import Select from "react-select"

const fetchModels = ()=>{
    return fetch('/api/getEngines').then(res=>res.json())
}
function ModelSelection() {
    const {data:models, isLoading}=useSWR("models",fetchModels)
    const {data:model, mutate:setModel} =useSWR('model', {
        fallbackData:"text-davinvi-003"
    });
  return (
    <div  className="mt-2">
        <Select className="mt-2" 
        options={models?.modelOptions}
        isSearchable 
        isLoading={isLoading}
        menuPosition='fixed'
        classNames={{
            control:(state)=>"bg-[#434654] boarder-[#434654]"
        }}
        onChange={(e)=>setModel(e.value)}
        />
    </div>

  )
}

export default ModelSelection