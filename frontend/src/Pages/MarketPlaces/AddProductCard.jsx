import React, { useState, useRef } from 'react';
import { Modal, Button, Select, Input, Radio, Checkbox, message } from 'antd';
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import {Upload,Image as ImageIcon} from "lucide-react"

const { TextArea } = Input;
const { Option } = Select;

const AddProductCard = (props) => {
  const categories = [
    "Electronics", "Fashion", "Home & Living", "Beauty & Personal Care",
    "Health & Wellness", "Groceries", "Sports & Outdoor", "Books & Stationery",
    "Toys & Baby Products", "Automotive", "Industrial & Business Supplies",
    "Pet Supplies", "Mobile & Computer Accessories", "Appliances", "Jewelry",
    "Art & Collectibles", "Travel & Luggage", "Tools & Hardware", "Event & Party Supplies",
    "Digital Products", "Eco-Friendly Products", "Luxury Items", "DIY & Crafts", "Gaming"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [productCondition, setProductCondition] = useState("");

  const handleCategory = (value) => {
    props.setCategory[1](value);
  };

  const handleConditionChange = (e) => {
    setProductCondition(e.target.value);
  };

  const slide = (index) => setCurrentSlide(index);

  return (
    <Modal
      open={true}
      onCancel={() => props.setOpenDialog(false)}
      footer={null}
      centered
      width={600}
      title={<span className="font-bold text-lg ">Add Product</span>}
      closeIcon={<CloseOutlined />}
    >
      {currentSlide === 0 ? (
        <div>
        <div  onClick={() => document.getElementById("fileInput").click()} className="w-full h-48 border-2 border-dashed border-purple-500 flex justify-center items-center rounded-lg mb-4 overflow-hidden">
        <img
          src={props.imagePreview}
          alt="Preview"
          className={`max-w-full ${props.image ?"block":"hidden"} max-h-full object-contain`}
        />
        <ImageIcon className={`text-stone-300 w-12 h-12 ${props.image ? "hidden" : "block"}`} />
      </div>

      {/* File Input */}
      <label htmlFor="fileInput" style={{marginBlock:"12px"}} className="bg-purple-500 text-white px-6 py-2  rounded-lg cursor-pointer text-sm text-center flex items-center gap-1">
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={props.handleChange}
          className="hidden"
        />
         <Upload className="mr-2" size={20} />
        Upload Image
      </label>

      {/* Display selected file name */}
      {props.image && (
        <div style={{marginTop:"12px"}} className="mt-3 text-sm text-gray-700">
          <strong>Selected File:</strong> {props.image.name}
        </div>
      )}
    </div>
      ) : (
        <div className="space-y-6 p-6 max-h-[350px] rounded-2xl overflow-auto border border-gray-200 shadow-sm bg-white">
  {/* Category */}
  <div style={{marginBlock:"8px"}} className="space-y-1">
    <label className="block text-sm font-semibold text-gray-700">Product Category</label>
    <Select
      style={{ width: '100%' }}
      placeholder="Choose a category"
      value={props.setCategory[0]}
      onChange={handleCategory}
      size="large"
      className="rounded-lg"
    >
      {categories.map((cat, i) => (
        <Option key={i} value={cat}>{cat}</Option>
      ))}
    </Select>
  </div>

  {/* Price */}
  <div style={{marginBlock:"8px"}} className="space-y-1">
    <label className="block text-sm font-semibold text-gray-700">Price ($)</label>
    <Input
      type="number"
      value={props.price[0]}
      onChange={(e) => props.price[1](e.target.value)}
      placeholder="Enter price"
      size="large"
      className="rounded-lg"
    />
  </div>

  {/* Product Condition */}
  <div style={{marginBlock:"8px"}} className="space-y-2">
  <label style={{ fontWeight: 600, color: "#374151", fontSize: "14px" }}>
    Product Condition
  </label>

  <Radio.Group
    onChange={handleConditionChange}
    value={productCondition}
    style={{ display: "flex" }}
  >
    {["Second Hand", "Slightly Used", "New"].map((value) => {
      const isSelected = productCondition === value;
      return (
        <Radio.Button
          key={value}
          value={value}
          style={{
           
            padding: "8px 18px",
            border: isSelected ? "1px solid #9333ea" : "1px solid #e5e7eb",
            backgroundColor: isSelected ? "#f5f3ff" : "#fff",
            color: isSelected ? "#9333ea" : "#374151",
            fontWeight: isSelected ? "500" : "400",
            
            cursor: "pointer",
            transition: "all 0.25s ease",
            fontSize: "14px",
            textAlign: "center",
            minWidth: "120px",
            lineHeight:"1rem",
            textTransform: "capitalize",
          }}
        >
          {value}
        </Radio.Button>
      );
    })}
  </Radio.Group>
  </div>

  {/* Premium Ad */}
  <div style={{marginBlock:"8px"}} className="space-y-2">
  <Checkbox 
      checked={props.premium[0]} 
      onChange={(e) => props.premium[1](e.target.checked)}
      className="text-gray-700 font-medium"
    >
      Promote as Premium Ad
    </Checkbox>

    {props.premium[0] && (
      <Input 
        placeholder="Add your website URL (Optional)" 
        size="large" 
        value={props.website_url}
        onChange={(e)=> props.setWebsite_url(e.target.value)}
        className="rounded-lg transition-all duration-300 ease-in-out"
      />
    )}
  </div>
</div>

      )}

      <div style={{marginTop:"25px"}} className="flex justify-between items-start mt-4 ">
        <TextArea
          rows={2}
          value={props.cap}
          onChange={(e) => props.setCaption(e.target.value)}
          placeholder="Add product description here..."
          style={{ width: '60%', resize: 'none' }}
        />

        <div  className="flex gap-2">
          <Button className="mr-1" onClick={() => slide(currentSlide === 0 ? 1 : 0)}>
            {currentSlide === 0 ? 'Next' : 'Previous'}
          </Button>
          <Button type="primary" disabled={props.cap==="" || props.imagePreview===null  || props.price[0]===""} style={{background:"var(--purple)"}} onClick={props.send} className="bg-purple-500 hover:bg-purple-600">
            {props.postLoader ? <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div> : "Post"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddProductCard;
