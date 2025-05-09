import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div style={{fontSize:"14.5px"}} className="min-h-screen  bg-gray-100 flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl bg-purple-100 border border-purple-300 shadow-md rounded-lg p-8">
        <h1 style={{marginBlock:"24px"}} className="text-3xl font-bold text-center text-purple-600 mb-6">
          Privacy Policy
        </h1>
        <p style={{marginBlock:"16px"}} className="text-gray-800 mb-4">
          SF Ghana Logistics is committed to protecting your privacy. This Privacy
          Policy outlines how we collect, use, and safeguard your information.
        </p>

        <div className="space-y-6">
          <section>
            <h2 style={{marginBlock:"8px"}} className="text-xl font-semibold text-gray-800 mb-2">
              1. Information We Collect
            </h2>
            <p className="text-gray-600">
              We may collect personal information such as your name, email
              address, phone number, and shipping details when you interact with
              our services. Additionally, we collect non-personal data such as
              browser type, device information, and IP address to enhance our
              website experience.
            </p>
          </section>

          <section>
            <h2 style={{marginBlock:"8px"}} className="text-xl font-semibold text-gray-800 mb-2">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-800 font-semibold">
              The information we collect is used to:
            </p>
            <ul className="list-disc list-inside text-gray-800">
              <li>Provide and manage logistics services.</li>
              <li>Track shipments and update you on their status.</li>
              <li>Improve our website and services.</li>
              <li>Communicate with you regarding inquiries or support.</li>
              <li>Ensure compliance with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 style={{marginBlock:"8px"}} className="text-xl font-semibold text-gray-800 mb-2">
              3. Information Sharing
            </h2>
            <p className="text-gray-800">
              We do not sell or rent your personal information to third parties.
              However, we may share your information with:
            </p>
            <ul className="list-disc list-inside text-gray-800">
              <li>Shipping partners to fulfill delivery services.</li>
              <li>
                Third-party service providers who assist in improving our
                operations.
              </li>
              <li>Government or legal entities if required by law.</li>
            </ul>
          </section>

          <section>
            <h2 style={{marginBlock:"8px"}} className="text-xl font-semibold text-gray-800 mb-2">
              4. Data Security
            </h2>
            <p className="text-gray-600">
              We implement robust security measures to protect your information
              from unauthorized access, alteration, or disclosure. While we
              strive to safeguard your data, no method of transmission over the
              internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 style={{marginBlock:"8px"}} className="text-xl font-semibold text-gray-800 mb-2">
              5. Your Rights
            </h2>
            <p className="text-gray-600">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Access, update, or delete your personal information.</li>
              <li>Opt-out of marketing communications.</li>
              <li>
                Request details about how your information is being processed.
              </li>
            </ul>
          </section>

          <section>
            <h2 style={{marginBlock:"8px"}} className="text-xl font-semibold text-gray-800 mb-2">
              6. Updates to This Policy
            </h2>
            <p className="text-gray-600">
              We may update this Privacy Policy periodically to reflect changes
              in our practices or legal requirements. We encourage you to review
              this policy regularly for the latest updates.
            </p>
          </section>

          <section>
            <h2 style={{marginBlock:"8px"}} className="text-xl font-semibold text-gray-800 mb-2">
              7. Contact Us
            </h2>
            <p className="text-gray-600">
              If you have any questions or concerns about this Privacy Policy,
              please contact us:
            </p>
            <ul className="list-none text-gray-600">
              <li>Email: sfghanalogistic24@gmail.com</li>
              <li>Phone: +233201623251</li>
              <li>Address: Kwei Okyerema St, Dzorwulu Accra</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
