import { DeleteOutlined } from '@ant-design/icons'
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Chip } from "@mui/material";


const TrackingSub = (props) => {
  const columns = [
    {
      field: "_id",
      headerName: "Order ID",
      width: 150,
    },
    {
      field: "description",
      headerName: "Description",
      width: 160,
      renderCell: () => <span>Unclassified</span>,
    },
    {
      field: "loadingDate",
      headerName: "Loading Date",
      width: 150,
      renderCell: (params) =>
        params.row?.shipmentId?.loadingDate
          ? new Date(params.row.shipmentId.loadingDate).toLocaleDateString()
          : "N/A",
    },
    {
      field: "cbmRate",
      headerName: "CBM Rate",
      width: 120,
      renderCell: (params) =>
        params.row?.shipmentId?.cbmRate
          ? "$" + params.row?.shipmentId?.cbmRate
          : "N/A",
    },
    {
      field: "eta",
      headerName: "Eta",
      width: 140,
      renderCell: (params) =>
        params.row?.shipmentId?.eta
          ? new Date(params.row.shipmentId.eta).toLocaleDateString()
          : "N/A",
    },
    {
      field: "country",
      headerName: "Country",
      width: 130,
      renderCell: (params) =>
        params.row?.shipmentId?.country || "N/A",
    },
    {
      field: "port",
      headerName: "Port",
      width: 130,
      renderCell: (params) =>
        params.row?.shipmentId?.port || "N/A",
    },
    {
      field: "Status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "Completed" ? "success" : "primary"}
          size="small"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 240,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mr: 1, backgroundColor: "purple" }}
            onClick={() => {
              props.setSelectedOrder(params.row);
              props.handleOpen();
            }}
          >
            View Details
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() =>
              props.deleteOrder(params.row._id, params.row.customer_id)
            }
          >
            <DeleteOutlined />
          </Button>
        </>
      ),
    },
  ];

  

  return (
    <>
      <section
        className="flex gap-3 w-[95%] items-center overflow-x-auto py-2 px-1 backdrop-blur-sm rounded-xl bg-white/80 shadow-sm"
        style={{ marginInline: "auto", marginTop: "16px", paddingInline: "2.5%" }}
      >
        <p className="text-sm font-semibold text-gray-700 whitespace-nowrap">
          Filter activities
        </p>

        {["All", "Delivered", "in-Transit", "Pending", "Cancelled"].map(
          (status) => (
            <button
              key={status}
              onClick={() => props.filterOrders(status)}
              className={`transition-all duration-200 border rounded-full px-4 py-1 text-sm font-medium whitespace-nowrap 
            ${
              props.selectedFilter === status
                ? "bg-purple-600 text-white border-purple-700 shadow-md"
                : "bg-white text-gray-700 border-gray-300 hover:bg-purple-100"
            }`}
            >
              {status === "in-Transit" ? "In Transit" : status}
            </button>
          )
        )}
      </section>

      <div
        className="bg-white w-[95%] shadow-md rounded-lg p-6"
        style={{ marginInline: "auto", marginTop: "12px" }}
      >
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Your Recent Shipments
        </h3>

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={props.orders}
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={3}
            rowsPerPageOptions={[3]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </div>
      </div>
    </>
  );
};

export default TrackingSub;
