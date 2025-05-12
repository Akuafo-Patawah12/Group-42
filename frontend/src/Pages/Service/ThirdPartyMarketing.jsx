import {
  ShoppingCart,
  PackageSearch,
  ShieldCheck,
  Truck,
  Rocket,
  BadgeCheck,
  Store,
  Users,
  TrendingUp,
  PieChart,
  Megaphone,
  Target,
  Globe,
  Mail,
} from "lucide-react";

export default function ThirdPartyMarketing() {
  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Hero */}
      <section className="flex relative bg-gradient-to-br from-purple-100 to-white py-20 px-6 text-center flex-col  md:flex-row">
        <div className="absolute top-4 right-5 z-10"><Rocket size={40} className="text-purple-300"/></div>
        <div className="absolute top-4 left-5 z-10"><TrendingUp className="w-8 h-8 text-purple-600" /></div>
        <div className="absolute top-4 left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 z-10"><PieChart className="w-4 h-4 text-purple-400" /></div>
        <div className="absolute bottom-4 right-8 z-10"><Target size={20} className="text-purple-400"/></div>
        <div className="absolute bottom-20 left-10 z-10"><Globe size={30} className="text-purple-400"/></div>
        <div className="absolute top-4 left-1/2 top-[30%] -translate-x-[70%] -translate-y-1/2 z-10"><Mail size={20} className="text-purple-400"/></div>
        
        <div style={{marginInline:"auto"}} className="w-full ">
          <h1 style={{marginBottom:"16px"}} className="text-4xl md:text-6xl font-bold mb-4">
            Smart Sourcing with Our Third-Party <span className="text-purple-500">Marketplace</span>
          </h1>
          <p style={{marginBlock:"40px"}} className="text-lg text-gray-600 mb-8">
            Discover trusted suppliers and connect directly—no middlemen, no transaction fees.
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-medium transition">
            Browse Suppliers
          </button>
        </div>


        <div>
          <img style={{margin:"40px auto"}} src="/images/empty-cart.svg" alt="marketplace_hero" className="w-4/5 md:w-full"/>
        </div>
      </section>

      {/* Features */}
      <section style={{marginInline:"auto"}} className="py-16 px-6 max-w-6xl mx-auto">

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
              icon: <Users className="h-8 w-8 text-purple-600  " />,
              title: "Direct Connections",
              desc: "Engage directly with sellers for custom deals and negotiations.",
            },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
              <section style={{margin:"16px auto",width:"fit-content"}}>{item.icon}</section>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-6 bg-purple-50">
        <div style={{margin:"48px auto"}} className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold">Popular Categories</h2>
          <p style={{marginBlock:".5rem"}} className="text-gray-600 font-medium">
            Explore categories and find suppliers that match your needs.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 p-6 bg-white rounded-xl shadow-md">
  <div>
  <h5 className="text-sm font-medium">Accessories</h5>
  <img
    src="/images/accessories.jpg"
    alt="Air Freight"
    className="w-40 h-40 object-contain rounded-2xl hover:scale-105 transition-transform"
  />
  </div>
  <div>
  <h5 className="text-sm font-medium">Clothings</h5>
  <img
    src="/images/clothings.jpg"
    alt="Sea Freight"
    className="w-40 h-40 object-contain rounded-2xl hover:scale-105 transition-transform"
  />
  </div>
  <div>
  <h5 className="text-sm font-medium">Jewellries</h5>
  <img
    src="/images/jewellry.jpg"
    alt="Land Freight"
    className="w-40 h-40 object-contain rounded-lg hover:scale-105 transition-transform"
  />
  </div>
  <div>
  <h5 className="text-sm font-medium">Home Appliances</h5>
  <img
    src="/images/appliances.jpg"
    alt="Marketplace"
    className="w-40 h-40 object-contain rounded-lg hover:scale-105 transition-transform"
  />
  </div>
</div>


<div style={{margin:"30px auto"}} className="relative max-w-4xl mx-auto">
  <div className="grid grid-cols-4 gap-8 relative z-10">
    {[Store, PackageSearch, ShoppingCart, Truck].map((Icon, i) => (
      <div key={i} className="relative flex items-center justify-center">
        {/* Icon container */}
        <div className="bg-white rounded-full h-[50px] w-[50px] flex items-center justify-center shadow hover:shadow-lg transition z-10">
          <Icon className="h-6 w-6 text-purple-600" />
        </div>

        {/* Line with arrow for all but the last */}
        {i < 3 && (
          <>
            {/* Line */}
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-12 h-1 bg-purple-600"></div>

            {/* Arrowhead */}
            <div className="absolute left-[calc(100%+48px)] top-1/2 transform -translate-y-1/2">
              <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-t-transparent border-b-transparent border-l-purple-600"></div>
            </div>
          </>
        )}
      </div>
    ))}
  </div>
</div>


      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-purple-600 text-white text-center">
        <h2 style={{marginBlock:"16px"}} className="text-3xl md:text-4xl font-bold mb-4">Join Our Trusted Network</h2>
        <p style={{marginBlock:"24px"}} className="text-lg mb-6">List your products or connect with vetted sellers across industries.</p>
        <button className="bg-white text-purple-600 px-6 py-3 rounded-full font-medium hover:bg-purple-100 transition">
          Become a Partner
        </button>
      </section>

      
    </div>
  );
}
