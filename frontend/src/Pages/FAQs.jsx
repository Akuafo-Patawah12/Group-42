import React, { useState } from "react";

const FAQPage = () => {
  const faqs = [
    
    {
      question: "How can I track my shipment?",
      answer:
        "You can track your shipment using the 'Track Shipment' feature on our website. Simply enter your tracking ID to get real-time updates.",
    },
    
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach our customer support team via email at sfghanalogistics@gmail.com or by calling +233201623251.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping services across multiple destinations worldwide.",
    },
    {
    question: "How do I ship goods from China to Ghana?",
    answer: "Shipping from China to Ghana is simple with SF Ghana Logistics! We offer air freight for fast delivery and sea freight for cost-effective bulk shipping. Contact us for a quote today!"
    },
    {
    question: "What shipping methods do you offer?",
    answer: "We offer a range of services including sea freight, air freight , RMB  exchange services, door-to-door delivery, container booking and clearance, and  free procurement and sourcing training."
    },
    {
    question: "How much does it cost to ship from China to Ghana?",
    answer: "The cost depends on the shipment size, weight, and method. Reach out to us for a free quote!"
    },
    {
    question: "What is the estimated shipping time from China to Ghana?",
    answer: "The shipping time depends on the method used. Sea freight typically takes 25-40 days, while air freight is much faster, averaging 5-10 days. Factors like customs clearance and seasonal demand can also affect delivery times."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-4">
        <h1 style={{marginBlock:"16px"}} className="text-3xl font-bold text-center text-purple-600 ">
          Frequently Asked Questions
        </h1>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-gray-800 text-sm font-medium">
                  {faq.question}
                </span>
                <span className="text-purple-600">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>
              {activeIndex === index && (
                <div className="p-4 bg-white text-sm text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
