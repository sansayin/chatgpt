import {SunIcon} from '@heroicons/react/24/solid'
function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-2 text-white">
      <h1 className="text-left font-bold mb-20">就AI帮你忙～</h1>
      <div className='flex space-x-2 text-center'>
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <SunIcon className='h-8 w-8 text-blue-500'/>
            <h2>求医问药</h2>
          </div>
          <div className="space-y-0">
            <p className="infoText">123</p>
            <p className="infoText">123</p>
            <p className="infoText">123</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <SunIcon className='h-8 w-8 text-blue-500'/>
            <h2>占卜预测</h2>
          </div>
          <div className="space-y-0">
            <p className="infoText">123</p>
            <p className="infoText">123</p>
            <p className="infoText">123</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <SunIcon className='h-8 w-8 text-blue-500'/>
            <h2>发财秘籍</h2>
          </div>
          <div className="space-y-0">
            <p className="infoText">123</p>
            <p className="infoText">123</p>
            <p className="infoText">123</p>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default HomePage