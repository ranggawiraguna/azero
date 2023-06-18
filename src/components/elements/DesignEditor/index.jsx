import React, { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import grapesjs from 'grapesjs';
import CloseIcon from '@mui/icons-material/Close';
import 'grapesjs/dist/css/grapes.min.css';
import plugin from 'grapesjs-preset-newsletter';

export default function DesignEditor({ onClose }) {
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    setEditor(
      grapesjs.init({
        height: '100vh',
        width: '100vw',
        container: '#desain_editor',
        plugins: [plugin]
      })
    );
  }, []);

  useEffect(() => {
    if (editor != null) {
      editor.Panels.removePanel('devices-c');
    }
  }, [editor]);

  return (
    <Box sx={{ position: 'relative' }}>
      <Box id="desain_editor"></Box>
      <IconButton sx={{ position: 'absolute', zIndex: 10000, top: 0, left: 0 }} onClick={onClose}>
        <CloseIcon sx={{ color: 'white' }} />
      </IconButton>
    </Box>
  );
}
