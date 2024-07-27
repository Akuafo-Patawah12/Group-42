import React,{lazy,useRef,useState,useEffect} from 'react'
import Header, { Sidebar } from './HeaderAndSidebar'
import Loading from '../icons/Loading'
const TrendsCompo = lazy(()=>import('./RoutesComponents/TrendsCompo'))

const Trends = () => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    },{
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);
  return (
    <div >
      <Header />
      <Sidebar/>
         
         <div ref={elementRef} className='w-[80%] float-none lg:float-right'>
         <div className='w-3/5 bg-green-300 h-[40px] mx-auto mt-[80px] rounded-2xl'></div>
         {isVisible? <TrendsCompo /> : <Loading/>}
         </div>
     
    </div>
  )
}

export default Trends