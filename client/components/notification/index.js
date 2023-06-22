import CloseIcon from '@mui/icons-material/Close';
import { Alert, Snackbar } from "@mui/material"
import { Button } from "@nextui-org/react";
import { useState } from "react"

const Notification = ({type,message}) => {
    const [open, setOpen] = useState(true);
    const [vertical, horizontal] = ['top', 'right'];

  return (
    <Snackbar
        open={open}
        anchorOrigin={{vertical,horizontal}}
        autoHideDuration={3000}
        onClose={()=>setOpen(false)}
    >
        <Alert
            severity={type}
            variant="filled"
            action={
                <Button
                    color="inherit"
                    size="small"
                    style={{background: 'transparent'}}
                    onClick={()=>setOpen(false)}
                >
                    <CloseIcon />
                </Button>
            }
        >
            <h1 style={{fontSize:'15px', fontWeight:'bold'}}>
                {type}
            </h1>
            <p>{message}</p>
        </Alert>
    </Snackbar>
  )
}

export default Notification