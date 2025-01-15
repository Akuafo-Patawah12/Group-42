import React, { useState } from "react";

const FAQPage = () => {
  const faqs = [
    {
      question: "What services does Andy Logistics offer?",
      answer:
        "Andy Logistics specializes in sea freight, air freight, warehousing, and supply chain management services tailored to your needs.",
    },
    {
      question: "How can I track my shipment?",
      answer:
        "You can track your shipment using the 'Track Shipment' feature on our website. Simply enter your tracking ID to get real-time updates.",
    },
    {
      question: "What is the estimated delivery time for shipments?",
      answer:
        "Delivery times depend on the destination and type of service chosen. For more accurate estimates, contact our support team or check your shipment details.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach our customer support team via email at support@andylogistics.com or by calling +1 (123) 456-7890.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping services across multiple destinations worldwide.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-gray-800 font-medium">
                  {faq.question}
                </span>
                <span className="text-blue-600">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>
              {activeIndex === index && (
                <div className="p-4 bg-white text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
