import React from "react";

const GalleryPage = () => {
  const galleryImages = [
    { src: "../images/Air.jpg", alt: "Cargo Ship" },
    { src: "../images/Groupage.jpg", alt: "Warehouse" },
    { src: "/images/Air2.jpg", alt: "Air Freight" },
    { src: "../images/Sea.jpg", alt: "Logistics Truck" },
    { src: "../images/procurement.jpg", alt: "Shipping Containers" },
    { src: "../images/img_3.jpg", alt: "Port View" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 style={{marginBlock:"30px"}} className="text-4xl font-bold text-center text-purple-600 mb-8">
          Gallery
        </h1>
        <p style={{marginBlock:"0 20px"}} className="text-gray-600 text-center mb-12">
          Explore the visuals of Andy Logistics' operations, showcasing our
          expertise in transportation, warehousing, and supply chain management.
        </p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-md group"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-56 object-cover transform group-hover:scale-105 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
