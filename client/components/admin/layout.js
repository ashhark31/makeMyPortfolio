import { Box, CssBaseline } from "@mui/material"
import Sidebar from "./sidebar";

export const Layout = ({children}) => {
  return (
    <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Sidebar />
        {children}
    </Box>
  );
}
