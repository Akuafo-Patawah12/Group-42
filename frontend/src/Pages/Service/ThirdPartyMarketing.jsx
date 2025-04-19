import {
  ShoppingCart,
  PackageSearch,
  ShieldCheck,
  Truck,
  BadgeCheck,
  Store,
  Users,
} from "lucide-react";

export default function ThirdPartyMarketing() {
  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-100 to-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Smart Sourcing with Our Third-Party Marketplace
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover trusted suppliers and connect directly—no middlemen, no transaction fees.
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-medium transition">
            Browse Suppliers
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            {
              icon: <Truck className="h-8 w-8 text-purple-600 mx-auto mb-4" />,
              title: "Logistics Support",
              desc: "Integrated freight services for seamless order fulfillment.",
            },
            {
              icon: <BadgeCheck className="h-8 w-8 text-purple-600 mx-auto mb-4" />,
              title: "Verified Suppliers",
              desc: "We list only credible and screened vendors for your peace of mind.",
            },
            {
              icon: <Users className="h-8 w-8 text-purple-600 mx-auto mb-4" />,
              title: "Direct Connections",
              desc: "Engage directly with sellers for custom deals and negotiations.",
            },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
              {item.icon}
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-6 bg-purple-50">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold">Popular Categories</h2>
          <p className="text-gray-600 mt-2">
            Explore categories and find suppliers that match your needs.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[Store, PackageSearch, ShoppingCart, Truck].map((Icon, i) => (
            <div
              key={i}
              className="bg-white rounded-full h-24 w-24 flex items-center justify-center mx-auto shadow hover:shadow-lg transition"
            >
              <Icon className="h-8 w-8 text-purple-600" />
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-purple-600 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Trusted Network</h2>
        <p className="text-lg mb-6">List your products or connect with vetted sellers across industries.</p>
        <button className="bg-white text-purple-600 px-6 py-3 rounded-full font-medium hover:bg-purple-100 transition">
          Become a Partner
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-8">
        <p className="text-sm">© {new Date().getFullYear()} Your Marketplace. All rights reserved.</p>
      </footer>
    </div>
  );
}
