import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface IOpen {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  title: string,
  body: JSX.Element | string
}

const AlertDialog: React.FC<IOpen> = ({ open, setOpen, title, body }) => {

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ "> div > div": { background: "#fff9", backdropFilter: "blur(10px)" } }}
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{fontWeight:"300"}} id="alert-dialog-description">
            {body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleDisagree}>Disagree</Button> */}
          <Button onClick={()=> setOpen(false)} autoFocus>
            فهمیدم
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialog;
