import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Youtube
} from "lucide-react";
import { toast } from "react-toastify";

const ContactPage = () => {
 const [name, setName] = React.useState("");
 const [email, setEmail] = React.useState("");
 const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
    const response= await fetch("http://localhost:4000/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message })
    })
    const data= await response.json()
    if(!response.ok){
      setError(data.error || "Something went wrong. Please try again.");
      return;
    }
    setName("");
    setEmail("");
    setMessage("");
    toast.success("Message sent successfully!");
  }catch(err){
    console.error("Error sending message:", err);
    setError("Failed to send message. Please try again later.");
  }
  }

  return (
    <div  className="bg-purple-100 pb-10 ">

        <div className='relative w-full'>
               <img src="/images/contact.jpg" alt="Contact Us" className="w-full   " />
                <section style={{position:"absolute",inset:"0",background:"rgb(0,0,0,0.3)",fontSize:"40px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}>
                        Contact Us
                </section>
            </div>

            <div style={{margin:"50px auto"}} className="container  p-6 max-w-[90%] bg-white shadow-xl border border-purple-300 rounded-2xl lg:max-w-3xl ">
  <h1 className="text-3xl font-bold text-center text-[var(--purple)] ">
    Contact SFG Logistics
  </h1>
 
    <div style={{marginTop:"10px"}} className="w-full h-[2px] bg-gradient-to-r from-white via-purple-300 to-white"></div>

  <p style={{marginBlock:"24px"}} className="text-center font-bold text-gray-600 mb-8">
    Reach out for inquiries or logistics support. We're here to help!
  </p>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Contact Form */}
    <div>
      <h2 style={{marginBlock:"16px"}} className="text-xl font-semibold text-gray-800 mb-4">Send Us a Message</h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <label style={{marginBlock:"4px"}} className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--purple)] text-sm"
          />
        </div>
        <div>
          <label style={{marginBlock:"10px"}} className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--purple)] text-sm"
          />
        </div>
        <div>
          <label style={{marginBlock:"10px"}} className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--purple)] text-sm"
            rows={4}
          ></textarea>
        </div>
        <button
          type="submit"
          style={{marginTop:"10px"}}
          className="w-full bg-[var(--purple)] text-white py-3 rounded-lg hover:bg-purple-700 transition text-sm font-semibold"
        >
          Send Message
        </button>
      </form>
    </div>

    {/* Contact Info */}
    <div>
      <h2 style={{marginBlock:"16px"}} className="text-xl font-semibold text-gray-800 mb-4">Contact Details</h2>
      <p style={{marginBlock:"24px"}} className="text-gray-600 text-sm mb-6">
        Prefer direct contact? Reach us with the info below:
      </p>
      <ul className="space-y-4 text-sm text-gray-700">
        <li style={{marginTop:"5px"}} className="flex items-center gap-3">
          <span className="p-2 rounded-full bg-gray-100 text-[var(--purple)]">
            <Phone size={18} />
          </span>
          <span>020 811 6360 / 053 948 0433</span>
        </li>
        <li style={{marginTop:"5px"}} className="flex items-center gap-3">
          <span className="p-2 rounded-full bg-gray-100 text-[var(--purple)]">
            <Mail size={18} />
          </span>
          <span>sfghanalogistics24@gmail.com</span>
        </li>
        <li style={{marginTop:"5px"}} className="flex items-center gap-3">
          <span className="p-2 rounded-full bg-gray-100 text-[var(--purple)]">
            <MapPin size={18} />
          </span>
          <span>George Bush Highway, Dzorwulu, Accra-Ghana</span>
        </li>
      </ul>

      <div style={{marginBlock:"24px"}} className="mt-6">
        <h3 style={{marginBlock:"12px"}} className="text-sm font-semibold text-gray-700 mb-2">Follow Us:</h3>
        <div className="flex gap-4">
          <a href="/" className="text-[var(--purple)] hover:text-purple-800 transition">
            <Facebook size={20} />
          </a>
          <a href="/" className="text-[var(--purple)] hover:text-purple-800 transition">
            <Twitter size={20} />
          </a>
          <a href="/" className="text-[var(--purple)] hover:text-purple-800 transition">
            <Youtube size={20} />
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default ContactPage;
