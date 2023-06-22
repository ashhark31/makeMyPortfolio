import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Toolbar, Typography } from "@mui/material";
import { Layout } from "../layout";

const AdminDashboardPage = () => {
  return (
    <Layout>
        <Box component='main' sx={{ flexGrow:1, p:3 }}>
            <Toolbar />
            <Typography paragraph>
                Admin dashboard
            </Typography>
        </Box>
    </Layout>
  )
}

export default AdminDashboardPage