import { useState } from "react";
import "./LogisticsReport.css";
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  DialogTitle,
  IconButton,
  Grid,
  CircularProgress,
  Button,
 
} from "@mui/material";
import {X, Check, Copy } from "lucide-react"; // or use MUI icons



const LogisticsReport = ({ order, onClose, visible, loading3 }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(order.tracking_no || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  if (!order) return null;

  return (
    <Dialog
  open={visible}
  onClose={onClose}
  fullWidth
  maxWidth="sm"
  PaperProps={{
    sx: {
      borderRadius: "12px",
      backgroundColor: "#f9f5ff",
      boxShadow: "0 8px 24px rgba(159, 122, 234, 0.1)",
      maxHeight: "85vh",
      display: "flex",
      flexDirection: "column",
    },
  }}
>
  {/* Fixed Header */}
  <DialogTitle
    sx={{
      px: 3,
      py: 2,
      position: "sticky",
      top: 0,
      backgroundColor: "#f9f5ff",
      borderBottom: "1px solid #ede9fe",
      zIndex: 2,
      textAlign: "center",
    }}
  >
    <Typography variant="h6" fontWeight={700} color="#6b46c1">
      Shipment Details
    </Typography>
    <IconButton
      onClick={onClose}
      size="small"
      sx={{
        position: "absolute",
        right: 16,
        top: 16,
        color: "#6b46c1",
      }}
    >
      <X size={20} />
    </IconButton>
  </DialogTitle>

  {/* Scrollable Content */}
  <DialogContent sx={{ px: 3, py: 2, overflowY: "auto" }}>
    {loading3 ? (
      <Box textAlign="center" py={4}>
        <CircularProgress size={32} sx={{ color: "#6b46c1" }} />
        <Typography mt={2} color="#6b46c1">
          Loading shipment details...
        </Typography>
      </Box>
    ) : (
      <>
        {/* Descriptions style */}
        <Grid container spacing={1} style={{display:"flex", flexDirection:"column",paddingTop:"10px"}}>
          {[
            {
              label: "Tracking No:",
              value: order.tracking_no || "N/A",
              isCopy: true,
            },
            { label: "Status:", value: order.Status || "Pending" },
            { label: "CBM", value: order.cbm || "N/A" },
            { label: "Port", value: order?.shipmentId?.port || "N/A" },
            { label: "Country:", value: order?.shipmentId?.country || "N/A" },
            { label: "Quantity:", value: order.qty || "Unknown" },
            {
              label: "Total Amount:",
              value:
                order.cbm && order.shipmentId?.cbmRate
                  ? `$${(Number(order.cbm) * Number(order.shipmentId.cbmRate)).toFixed(2)}`
                  : "N/A",
            },
            {
              label: "Updated At:",
              value: new Date(order.updatedAt).toLocaleString(),
            },
          ].map((item, index) => (
            <Grid item xs={12} key={index} >
              <Box
                className="border-l-2 border-purple-400"
                sx={{
                  display: "flex",
                 
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#ede9fe",
                  color: "#444",
                  fontWeight: 600,
                  borderRadius: 1,
                  p: 1.5,
                }}
              >
                <Typography >{item.label}</Typography>
                <Box
                  sx={{
                    backgroundColor: "#f3e8ff",
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  {item.isCopy ? (
                    <Box
                      onClick={handleCopy}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        color: copied ? "green" : "#6b46c1",
                      }}
                    >
                      <Typography variant="body2">{item.value}</Typography>
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                      <Typography variant="caption" ml={0.5}>
                        {copied ? "Copied" : ""}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography variant="body2">{item.value}</Typography>
                  )}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Footer Button */}
        <Box textAlign="right" mt={4}>
          <Button
            onClick={onClose}
            variant="contained"
            size="large"
            sx={{
              borderRadius: "8px",
              background: "linear-gradient(to right, #9f7aea, #d6bcfa)",
              boxShadow: "0 4px 14px rgba(159, 122, 234, 0.4)",
              color: "#fff",
              fontWeight: 600,
              px: 4,
              textTransform: "none",
            }}
          >
            Close
          </Button>
        </Box>
      </>
    )}
  </DialogContent>
</Dialog>

  );
};

export default LogisticsReport;
