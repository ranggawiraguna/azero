import React from 'react';
import { Box, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import DesignOption from 'components/elements/DesignOption';

const TransitionComponent = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function DialogAddNewDesign({ open, onClose, actionButtonUpload, actionButtonEditor }) {
  return (
    <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={onClose} TransitionComponent={TransitionComponent} fullWidth>
      <DialogTitle>
        <Grid container sx={{ position: 'relative', marginTop: 2, marginBottom: 1 }} justifyContent="center" alignItems="center">
          <Typography variant="h3" component="h3">
            Tambah Desain
          </Typography>
          <IconButton sx={{ position: 'absolute', right: 0, top: -12 }} color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ paddingTop: 1 }}>
          <DesignOption
            actionButtonUpload={(_) => {
              onClose();
              actionButtonUpload(_);
            }}
            actionButtonEditor={() => {
              onClose();
              actionButtonEditor();
            }}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
