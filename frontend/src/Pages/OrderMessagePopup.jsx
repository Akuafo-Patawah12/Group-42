import { SendOutlined } from '@ant-design/icons'

import { PlusCircle, X } from "lucide-react";

const OrderMessagePopup = (props) => {
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!props.cbm) return;
    props.onSave();
    props.setCbm("");
    props.setQty("")
    props.setOpen(false);
  };

  

   
    
  return (
    <>
    {props.openCBM&&
       <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm relative shadow-xl">
            <button
              onClick={() => props.setOpenCBM(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h2 className="text-md font-semibold mb-4 text-purple-700">
              Enter CBM & CTN Value
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="number"
                step="0.001"
                value={props.cbm}
                onChange={(e) => props.setCbm(e.target.value)}
                placeholder="CBM e.g. 2.135"
                style={{marginBlock:"10px"}}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <input
                type="number"
                step="0.001"
                value={props.qty}
                onChange={(e) => props.setQty(e.target.value)}
                placeholder="CTN e.g. 2.135"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <button
                type="submit"
                style={{marginBlock:"20px 0"}}
                className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      }
    </>
  )
}

export default OrderMessagePopup