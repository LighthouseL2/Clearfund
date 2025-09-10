import React, { useState } from "react";

const FAQAccordion = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto divide-y divide-gray-300">
      {faqs.map((faq, index) => (
        <div key={index} className="py-4">
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex justify-between items-center text-left focus:outline-none"
          >
            <span className="text-lg font-medium">{faq.question}</span>
            <span
              className={`relative w-5 h-5 transition-transform duration-300 ease-in-out ${
                openIndex === index ? "rotate-180" : "rotate-0"
              }`}
            >
              {/* Horizontal bar */}
              <span className="absolute top-1/2 left-0 w-5 h-0.5 bg-black transform -translate-y-1/2" />
              {/* Vertical bar */}
              <span
                className={`absolute top-0 left-1/2 h-5 w-0.5 bg-black transform -translate-x-1/2 transition-opacity duration-300 ease-in-out ${
                  openIndex === index ? "opacity-0" : "opacity-100"
                }`}
              />
            </span>
          </button>
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              openIndex === index
                ? "max-h-40 opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-2"
            }`}
          >
            <p className="mt-2 text-gray-600">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
