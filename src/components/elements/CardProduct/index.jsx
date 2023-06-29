import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { stringCapitalize } from 'utils/other/Services';
import { useNavigate } from 'react-router';
import { Box, Button } from '@mui/material';
import { defaultProductImage } from 'utils/other/EnvironmentValues';

export default function ProductCard({ product = {}, ...props }) {
  const navigate = useNavigate();

  return (
    <Card {...props} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box>
        <CardMedia component="img" image={product.images[0] ?? defaultProductImage} />
      </Box>
      <CardContent sx={{ paddingBottom: 0, marginBottom: 0, flex: 1 }}>
        <Typography variant="h3" sx={{ marginBottom: 1 }}>
          {stringCapitalize(product.name)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ display: 'flex', gap: 2 }}>
        <Button
          onClick={() => {
            navigate(`/customer/product/${product.id}`);
          }}
          variant="contained"
          sx={{ flex: 1 }}
        >
          Lihat Detail
        </Button>
      </CardActions>
    </Card>
  );
}
