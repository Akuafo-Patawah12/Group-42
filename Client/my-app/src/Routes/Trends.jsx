import React,{lazy} from 'react'
import Header from '../Routes/Header'
const TrendsCompo = lazy(()=>import('./RoutesComponents/TrendsCompo'))

const Trends = () => {
  return (
    <div className=' bg-red-300 '>
      <Header />
      <React.Suspense fallback={<div>Loading..</div>} >
         <TrendsCompo />
      </React.Suspense>
    </div>
  )
}

export default Trends