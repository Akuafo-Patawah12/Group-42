import React from 'react';

const UserProfile = () => {
  // Example user data (replace with actual props or API data)
  const user = {
    name: 'John Simons',
    email: 'john@example.com',
    phone: '+1234567890',
    role: 'Logistics Manager',
    company: 'HGF Freight Co.',
    avatar: 'https://i.pravatar.cc/150?img=3',
    joined: 'Jan 10, 2024',
    shipments: 124,
    pending: 7,
    completed: 117,
  };

  return (
    <div style={{paddingTop:"100px"}}
      className='layout-shift  w-full bg-stone-100 lg:w-[80%] '>
      <div className="bg-white shadow-xl rounded-2xl p-6 md:flex items-center gap-8">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-32 h-32 rounded-full object-cover border-4 border-stone-200"
        />
        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-stone-600">{user.role} at {user.company}</p>
          <div className="text-sm text-stone-500">
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Joined: {user.joined}</p>
          </div>
        </div>
        <button className="mt-4 md:mt-0 bg-stone-800 text-white px-4 py-2 rounded-xl hover:bg-stone-700 transition">
          Edit Profile
        </button>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-stone-100 p-6 rounded-xl text-center shadow-sm">
          <p className="text-3xl font-bold">{user.shipments}</p>
          <p className="text-sm text-stone-500">Total Shipments</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-xl text-center shadow-sm">
          <p className="text-3xl font-bold">{user.pending}</p>
          <p className="text-sm text-yellow-600">Pending</p>
        </div>
        <div className="bg-green-100 p-6 rounded-xl text-center shadow-sm">
          <p className="text-3xl font-bold">{user.completed}</p>
          <p className="text-sm text-green-600">Completed</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
