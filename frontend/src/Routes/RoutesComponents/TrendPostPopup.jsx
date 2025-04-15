import React, { useState, useRef } from 'react';
import { Modal, Button, Select, Input, Radio, Checkbox, message } from 'antd';
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import {Upload,Image as ImageIcon} from "lucide-react"

const { TextArea } = Input;
const { Option } = Select;

const TrendPostPopup = (props) => {
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

  const handleCategoryChange = (value) => {
    props.selectCat[1](value);
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
      title={<span className="font-bold text-xl ">Add Product</span>}
      closeIcon={<CloseOutlined />}
    >
      {currentSlide === 0 ? (
        <div>
        <div onDrag={props.handleDragOver} onDrop={props.handleDrop} onClick={() => document.getElementById("fileInput").click()} className="w-full h-48 border-2 border-dashed border-purple-500 flex justify-center items-center rounded-lg mb-4 overflow-hidden">
        <img
          ref={props.picRef}
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
        <div className="space-y-4 px-4 py-4 max-h-[300px] rounded-xl overflow-auto border border-stone-200">
          <div>
            <label>Product Category</label>
            <Select
              style={{ width: '100%' }}
              placeholder="Choose a category"
              value={props.selectCat[0]}
              onChange={handleCategoryChange}
            >
              {categories.map((cat, i) => <Option key={i} value={cat}>{cat}</Option>)}
            </Select>
          </div>

          <div>
            <label>Price ($)</label>
            <Input
              type="number"
              value={props.price[0]}
              onChange={(e) => props.price[1](e.target.value)}
              placeholder="Enter price"
            />
          </div>

          <div>
            <label>Select Product Condition</label>
            <Radio.Group onChange={handleConditionChange} value={productCondition}>
              <Radio value="Second Hand">Second Hand</Radio>
              <Radio value="Slightly Used">Slightly Used</Radio>
              <Radio value="New">New</Radio>
            </Radio.Group>
          </div>

          <div>
            <Checkbox 
              checked={props.premium[0]} 
              onChange={(e) => props.premium[1](e.target.checked)}
            >
              Promote as Premium Ad
            </Checkbox>
            <Input placeholder="Add your website URL (Optional)" className="mt-2" />
          </div>
        </div>
      )}

      <div className="flex justify-between items-start mt-4 ">
        <TextArea
          rows={2}
          value={props.cap}
          onChange={(e) => props.setCaption(e.target.value)}
          placeholder="Add product description here..."
          style={{ width: '60%', resize: 'none' }}
        />

        <div className="space-y-2">
          <Button className="mr-1" onClick={() => slide(currentSlide === 0 ? 1 : 0)}>
            {currentSlide === 0 ? 'Add Feature' : 'Back'}
          </Button>
          <Button type="primary" onClick={props.send} className="bg-purple-500 hover:bg-purple-600">
            Post
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TrendPostPopup;
