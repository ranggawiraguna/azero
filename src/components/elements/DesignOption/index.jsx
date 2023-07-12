import { Box, Button, Typography } from '@mui/material';
import { Fragment } from 'react';
import InputFileComponent from '../InputImage';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

export default function DesignOption({actionButtonUpload, actionButtonEditor}) {
  return (
    <Fragment>
      <Box
        sx={{
          backgroundColor: 'white',
          outline: '2px solid rgba(0,0,0,0.1)',
          borderRadius: 2
        }}
      >
        <InputFileComponent onChange={actionButtonUpload}>
          <Button
            sx={{ display: 'flex', justifyContent: 'center', gap: 1, alignItems: 'center', padding: 1, marginBottom: 1 }}
            variant="raised"
            component="span"
          >
            <AddPhotoAlternateIcon sx={{ fontSize: 24 }} />
            <Typography variant="h5" sx={{ color: 'grey' }}>
              Upload Gambar Desain
            </Typography>
          </Button>
        </InputFileComponent>
      </Box>
      <Button
        variant="contained"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          width: '100%',
          borderRadius: 2,
          padding: 1,
          backgroundColor: '#404040',
          '&:hover': {
            backgroundColor: 'black'
          }
        }}
        onClick={actionButtonEditor}
      >
        <BookmarkAddIcon sx={{ fontSize: 24 }} />
        <Typography variant="h5" sx={{ color: 'white' }}>
          Pilih Template Desain
        </Typography>
      </Button>
    </Fragment>
  );
}
