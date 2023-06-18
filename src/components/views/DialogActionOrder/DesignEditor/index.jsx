import React from 'react';
import { Dialog } from '@mui/material';
import Slide from '@mui/material/Slide';
import DesignEditor from 'components/elements/DesignEditor';

const TransitionComponent = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function DialogDesignEditor({ open, onClose }) {
  return (
    <Dialog disableBackdropClick disableEscapeKeyDown fullScreen open={open} onClose={onClose} TransitionComponent={TransitionComponent}>
      <DesignEditor onClose={onClose} />
    </Dialog>
  );
}
