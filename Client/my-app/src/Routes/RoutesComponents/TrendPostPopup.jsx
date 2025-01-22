import React,{useState,useRef} from 'react'
import {ReactComponent as Image} from "../../icons/image.svg"
import { CloseOutlined } from '@ant-design/icons';
const TrendPostPopup = (props) => {


 

  // E-commerce categories
  const categories = [
    "Electronics",
    "Fashion",
    "Home & Living",
    "Beauty & Personal Care",
    "Health & Wellness",
    "Groceries",
    "Sports & Outdoor",
    "Books & Stationery",
    "Toys & Baby Products",
    "Automotive",
    "Industrial & Business Supplies",
    "Pet Supplies",
    "Mobile & Computer Accessories",
    "Appliances",
    "Jewelry",
    "Art & Collectibles",
    "Travel & Luggage",
    "Tools & Hardware",
    "Event & Party Supplies",
    "Digital Products",
    "Eco-Friendly Products",
    "Luxury Items",
    "DIY & Crafts",
    "Gaming",
  ];

  const handleCategoryChange = (e) => {
    props.selectCat[1](e.target.value);
    console.log("Selected Category:", e.target.value); // You can handle filtering logic here
  };


  const [productCondition, setProductCondition] = useState("");

  const handleConditionChange = (e) => {
    setProductCondition(e.target.value);
    console.log("Selected Condition:", e.target.value); // You can handle logic based on the selected condition
  };



  const parentRef= useRef(null)
  const childRef1= useRef(null)
  const childRef2= useRef(null)
  const [Index,setIndex]= useState(0)

  const slide=(index)=>{
      
       setIndex(index)   
     
    }
     
  return (

    
        <div className='w-full fixed flex items-center justify-center bottom-0 left-0 top-0 h-[100vh] right-0 bg-black/40 backdrop-blur-custom z-50 '>
        {/*pop up menu */}
        <div  ref={props.reference} className=' w-[500px] h-[70%] overflow-hidden bg-white rounded-lg md:w-[50%] lg:w-[500px]'>
          
         <div className='flex items-center justify-between border-b h-[20%] mb-[2%] font-bold text-xl px-[5%]'><span className="my-auto h-fit">Add Product.</span><button onClick={()=> props.setOpenDialog(false)} className='h-10 w-10 bg-stone-100 rounded-[50%]'><CloseOutlined /></button></div>
         
         <section ref={parentRef} onDragOver={(e)=>e.preventDefault()} className='h-[56%] w-[90%]  mx-auto flex overflow-x-auto snap-x snap-mandatory scrollbar-0'>
         {Index===0 ? <div ref={childRef1} className='relative h-full min-w-full rounded-lg border-dashed border-2 border-[var(--purple)] snap-start'>
          <img ref={props.picRef}  alt="select_image" ></img>
          <Image className="absolute translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%]"/>
          <div className=" clip absolute bottom-0 w-full"></div>
          <label className='absolute bottom-0 right-0 z-3 flex justify-center items-center underline h-[40px] w-[100px] pointer'>
      <input type="file"
        onChange={props.handleChange}
        className=' hidden'
        />
        Select Image
        </label>
        </div>

: <div ref={childRef2} className=" snap-start py-4 overflow-y-auto px-[2%]  h-full min-w-full rounded-lg bg-stone-100">
        

{/* Product Category */}
<div className="mb-4">
  <label htmlFor="category" className="block text-sm font-medium mb-2">
    Product Category
  </label>
  <select
        id="categoryFilter"
        value={props.selectCat[0]}
        onChange={handleCategoryChange}
        className="w-full border border-gray-300 rounded px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          Choose a category
        </option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
</div>

{/* Product Price */}
<div className="mb-4">
  <label htmlFor="price" className="block text-sm font-medium mb-2">
    Price ($)
  </label>
  <input
    type="number"
    id="price"
    value={props.price[0]}
    onChange={(e) => props.price[1](e.target.value)}
    placeholder="Enter price"
    className="w-full border rounded px-4 py-2"
  />
</div>


<h2 className="text-sm font-medium text-gray-800 mb-2">
        Select Product Condition
      </h2>

      <div className="space-y-4 mb-4">
        {/* Radio Buttons */}
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="condition"
            value="Second Hand"
            checked={productCondition === "Second Hand"}
            onChange={handleConditionChange}
            className="form-radio h-4 w-4 text-blue-600 focus:ring focus:ring-blue-300"
          />
          <span className="text-gray-700">Second Hand</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="condition"
            value="Slightly Used"
            checked={productCondition === "Slightly Used"}
            onChange={handleConditionChange}
            className="form-radio h-4 w-4 text-blue-600 focus:ring focus:ring-blue-300"
          />
          <span className="text-gray-700">Slightly Used</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="condition"
            value="New"
            checked={productCondition === "New"}
            onChange={handleConditionChange}
            className="form-radio h-4 w-4 text-blue-600 focus:ring focus:ring-blue-300"
          />
          <span className="text-gray-700">New</span>
        </label>
      </div>


{/* Premium Ad Option */}
<div className="mb-4">
  <label className="inline-flex items-center space-x-2">
    <input
      type="checkbox"
      checked={props.premium[0]}
      onChange={(e) => props.premium[1](e.target.checked)}
      className="form-checkbox checked:bg-[var(--purple)]"
    />
    <span>Promote as Premium Ad</span>
  </label>
  <input 
    type="text"
    placeholder='Add your website url (Optional)'
    className="w-full border rounded px-4 py-2"
  />
</div>



        </div>}

         </section>
         
      <form onSubmit={props.send} className='  w-full  h-[20%] px-[5%] mt-[2%] py-2 bg-white border-t border-stone-200 shadow-[30px] flex justify-between  '>
    
       
      <textarea 
        
        value={props.cap}
        onChange={(e) => props.setCaption(e.target.value)}
        className='  p-2 bg-slate-100 rounded-2xl outline-none rows-span-2 max-h-[150px] w-[60%]'
        rows="2"
        placeholder='Add product description here...'
      />
      <section className=' space-y-1 w-[100px]'> 
      {Index===0 ? <button onClick={()=> slide(1)} className='rounded bg-green-300 h-[30px] w-[100px]'>
          Add feature
      </button> :
      <button onClick={()=> slide(0)} className='rounded bg-green-300 h-[30px] w-[100px]'>
          Back
      </button>}
      
       <button type='submit'
        className='rounded- bg-[var(--purple)] text-white h-[30px] w-[100px]'>
          Post
        </button>
        </section>
      </form>
      </div>
      </div> 
      
    
  )
}

export default TrendPostPopup