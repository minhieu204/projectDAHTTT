import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import AdminBreadcrumbs from "~/components/admin/AdminBreadcrumbs/AdminBreadcrumbs";
import AppBar from "~/components/admin/AppBar/AppBar";
import SideBar from "~/components/admin/SideBar/SideBar";
import { useEffect } from "react";

function AdminPage() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      const token = localStorage.getItem("accessToken");
      const userStr = localStorage.getItem("user");
      const user = JSON.parse(userStr);
      const id = user._id;
      if (!token) return;
      navigator.sendBeacon(`http://localhost:8017/v1/user/logout/${id}`, null);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <SideBar />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: (theme) => theme.admin.focusColor,
        }}
      >
        <Box sx={{ flex: "0 0 72px" }}>
          <AppBar />
        </Box>
        <Box sx={{ flex: "1", overflow: "auto" }}>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", mr: 6, mt: 4 }}
          >
            <AdminBreadcrumbs />
          </Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default AdminPage;
