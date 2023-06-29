import { Box, Button, FormControl, Grid, InputLabel, OutlinedInput, Rating, Typography } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { moneyFormatter, stringCapitalize } from 'utils/other/Services';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from 'config/firebase';
import { useParams } from 'react-router';
import { defaultProductImage } from 'utils/other/EnvironmentValues';
import ProductDiscussion from 'containers/templates/ProductDiscussion';
import ShoppingCart from '@mui/icons-material/AddShoppingCartRounded';
import { blue } from '@mui/material/colors';
import EastIcon from '@mui/icons-material/East';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState({
    id: '',
    name: '',
    price: 0,
    description: '',
    images: [defaultProductImage, defaultProductImage, defaultProductImage],
    minimalOrder: '',
    models: [],
    sizes: [],
    rating: []
  });

  const [imageSelected, setImageSelected] = useState(0);
  const [packSelected, setPackSelected] = useState();
  const [alertDescription, setAlertDescription] = useState({
    isOpen: false,
    type: 'info',
    text: '',
    transitionName: 'slideUp'
  });

  const showAlertToast = (type, text) =>
    setAlertDescription({
      ...alertDescription,
      isOpen: true,
      type: type,
      text: text
    });

  useEffect(() => {
    const listenerProduct = onSnapshot(doc(db, 'products', params.id), (snapshot) => {
      if (snapshot.exists()) {
        setProduct({
          id: snapshot.id,
          ...snapshot.data(),
          images: Array.from(Array(3).keys()).map((_, __) => (snapshot.data().images ?? [])[__] ?? defaultProductImage)
        });
      } else {
        setProduct(null);
      }
    });

    return () => {
      listenerProduct();
    };
  }, [params.id]);

  return (
    <Fragment>
      <Grid container spacing={{ xs: 0, sm: 2 }} sx={{ paddingTop: { xs: '20px', sm: 0 } }}>
        <Grid item xs={12} sm={5}>
          <Box sx={{ minHeight: 'calc(100vh - 130px)' }}>
            <Box sx={{ width: '100%', position: 'relative' }}>
              <Box
                sx={{
                  aspectRatio: '1/1',
                  borderRadius: 3,
                  width: 'calc(100% - 50px)',
                  backgroundColor: 'lightgrey',
                  margin: '0 auto',
                  border: '2px solid white',
                  outline: '2px solid white',
                  backgroundImage: `url(${product.images[imageSelected]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <Box
                onClick={() => setImageSelected((imageSelected + (imageSelected > 0 ? 0 : 3) - 1) % 3)}
                sx={{
                  position: 'absolute',
                  aspectRatio: '1/1',
                  width: 50,
                  backgroundColor: 'white',
                  boxShadow: '1px 2px 2px 0 rgba(0,0,0,0.1)',
                  borderRadius: 1000,
                  top: '50%',
                  left: 0,
                  cursor: 'pointer',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: 1
                }}
              >
                <ArrowBackIosIcon />
              </Box>
              <Box
                onClick={() => setImageSelected((imageSelected + 1) % 3)}
                sx={{
                  position: 'absolute',
                  aspectRatio: '1/1',
                  width: 50,
                  cursor: 'pointer',
                  backgroundColor: 'white',
                  boxShadow: '1px 2px 2px 0 rgba(0,0,0,0.1)',
                  borderRadius: 1000,
                  top: '50%',
                  right: 0,
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: 0.3
                }}
              >
                <ArrowForwardIosIcon />
              </Box>
            </Box>
            <Box sx={{ padding: '0 25px', marginTop: 2, display: 'flex', gap: 2 }}>
              {product.images.map((_, __) => (
                <Box
                  key={__}
                  onClick={() => setImageSelected(__)}
                  sx={{
                    ...{
                      borderRadius: 3,
                      flex: 1,
                      aspectRatio: '1/1',
                      width: '100%',
                      cursor: 'pointer',
                      backgroundColor: 'lightgrey',
                      backgroundImage: `url(${product.images[__]})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    },
                    ...(imageSelected === __
                      ? { opacity: 1, border: '2px solid white', outline: '2px solid white' }
                      : { opacity: 0.5, border: '2px solid rgba(255,255,255,0.5)', outline: '2px solid rgba(255,255,255,0.5)' })
                  }}
                />
              ))}
            </Box>
            <Box sx={{ padding: '0 25px', marginTop: 3.5 }}>
              <Box
                sx={{
                  width: '100%',
                  borderRadius: 3,
                  backgroundColor: 'white',
                  border: '2px solid rgba(0,0,0,0.1)',
                  outline: '2px solid rgba(0,0,0,0.1)',
                  padding: 1
                }}
              >
                <Typography variant="h4">Penilaian Produk</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Box display={{ flex: 1 }}>
                    <Rating name="read-only" value={product.rating?.reduce((a, b) => a + b.rateValue, 0) ?? 0} precision={0.1} readOnly />
                    <Typography
                      variant="h5"
                      sx={{ marginLeft: product.rating?.length > 0 ? { sm: 0.5 } : {}, marginTop: product.rating?.length > 0 ? 1 : 0 }}
                    >
                      Keterangan :
                      {(() => {
                        if (product.rating?.length > 0) {
                          if ((product.rating?.reduce((a, b) => a + b.rateValue, 0) ?? 0) <= 1) {
                            return 'Sangat Kurang';
                          } else if ((product.rating?.reduce((a, b) => a + b.rateValue, 0) ?? 0) <= 2) {
                            return 'Kurang';
                          } else if ((product.rating?.reduce((a, b) => a + b.rateValue, 0) ?? 0) <= 3) {
                            return 'Cukup';
                          } else if ((product.rating?.reduce((a, b) => a + b.rateValue, 0) ?? 0) <= 4) {
                            return 'Baik';
                          } else {
                            return 'Sangat Baik';
                          }
                        } else {
                          return 'Belum Ada';
                        }
                      })()}
                    </Typography>
                  </Box>
                  <Typography variant="h1" sx={{ padding: 1, fontSize: 42 }}>
                    {product.rating?.reduce((a, b) => a + b.rateValue, 0) ?? 0}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Box sx={{ minHeight: 'calc(100vh - 130px)', padding: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h1" sx={{ marginBottom: 1 }}>
              {stringCapitalize(product.name)}
            </Typography>
            {packSelected ? (
              <>
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'space-between' }}>
                  <Typography variant="h3" sx={{ marginBottom: 1, marginTop: 2 }}>
                    Paket Dipilih
                  </Typography>
                  <Button variant="text" onClick={() => setPackSelected(null)}>
                    Ubah Paket
                  </Button>
                </Box>
                <Box
                  sx={{
                    minHeight: 100,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    width: '100%',
                    border: '2px solid rgba(0,0,0,0.2)',
                    borderRadius: 2,
                    padding: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Typography variant="h4">Paket {packSelected}</Typography>
                  <Typography variant="h4" sx={{ marginBottom: 2, color: 'rgba(0,0,0,0.5)' }}>
                    {moneyFormatter(Math.floor(Math.random() * 100000) + 100000)}
                  </Typography>
                  <Typography variant="h4">Benefit :</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'normal' }}>
                    Revisi 1x, Proses 9-10 hari, File Master FBX, Color Guide, Export JPG / PNG / PDF
                  </Typography>
                </Box>
              </>
            ) : (
              <></>
            )}
            <Box sx={{ height: '1px', width: '100%', backgroundColor: 'lightgrey', marginTop: 2, marginBottom: 2 }} />
            {packSelected ? (
              <>
              <Typography variant="h3" sx={{ marginBottom: 3, marginTop: 2 }}>
                    Formulir Pesanan
                  </Typography>
                <FormControl variant="outlined" className="input">
                  <InputLabel htmlFor="InputNamLengkap">Nama Lengkap</InputLabel>
                  <OutlinedInput
                    id="InputNamaLengkap"
                    type="text"
                    label="Nama Lengkap"
                    placeholder="Masukkan Nama Lengkap"
                    autoComplete="off"
                  />
                </FormControl>
                <br/>
                <FormControl variant="outlined" className="input">
                  <InputLabel htmlFor="InputEmail">Email</InputLabel>
                  <OutlinedInput
                    id="InputEmail"
                    type="email"
                    label="Email"
                    placeholder="Email"
                    autoComplete="off"
                  />
                </FormControl>
                <br/>
                <FormControl variant="outlined" className="input">
                  <InputLabel htmlFor="InputTelepon">No. Telepon</InputLabel>
                  <OutlinedInput
                    id="InputTelepon"
                    type="text"
                    label="No. Telepon"
                    placeholder="text"
                    autoComplete="off"
                  />
                </FormControl>
                <br/>
                <FormControl variant="outlined" className="input">
                  <InputLabel htmlFor="InputWarna">Warna</InputLabel>
                  <OutlinedInput
                    id="InputWarna"
                    type="text"
                    label="Warna"
                    placeholder="text"
                    autoComplete="off"
                  />
                </FormControl>
                <br/>
                <FormControl variant="outlined" className="input">
                  <InputLabel htmlFor="InputJumlah">Jumlah</InputLabel>
                  <OutlinedInput
                    id="InputJumlah"
                    type="text"
                    label="Jumlah"
                    placeholder="text"
                    autoComplete="off"
                  />
                </FormControl>
                <br/>
                <FormControl variant="outlined" className="input">
                  <InputLabel htmlFor="InputReferensiDesain">Referensi Desain</InputLabel>
                  <OutlinedInput
                    id="InputReferensiDesain"
                    type="text"
                    label="Referensi Desain"
                    placeholder="text"
                    autoComplete="off"
                  />
                </FormControl>
                <br/>
                <FormControl variant="outlined" className="input">
                  <InputLabel htmlFor="InputCatatan">Catatan</InputLabel>
                  <OutlinedInput
                    id="InputCatatan"
                    type="text"
                    label="Catatan"
                    placeholder="text"
                    autoComplete="off"
                  />
                </FormControl>
                <Box sx={{ flex: 1 }} />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'stretch',
                    justifyContent: { sx: 'center', sm: 'flex-end' },
                    gap: { xs: 2, xm: 5 },
                    marginTop: 2
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{ display: 'flex', gap: '10px', padding: '10px 25px' }}
                    onClick={() => {
                      //
                    }}
                  >
                    <ShoppingCart />
                    <Typography variant="h4" color={blue[500]}>
                      Masukkan Ke Keranjang
                    </Typography>
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ display: 'flex', gap: '10px', padding: '10px 25px' }}
                    onClick={() => {
                      //
                    }}
                  >
                    <Typography variant="h4" sx={{ color: 'white' }}>
                      Pesan Produk
                    </Typography>
                    <EastIcon />
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Typography variant="h3" sx={{ marginBottom: 2 }}>
                  Pilihan Paket
                </Typography>
                {['Terjangkau', 'Standar', 'Ultimate'].map((_) => (
                  <>
                    <Box
                      sx={{
                        minHeight: 100,
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        width: '100%',
                        border: '2px solid rgba(0,0,0,0.2)',
                        borderRadius: 2,
                        padding: 1,
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <Typography variant="h4">Paket {_}</Typography>
                      <Typography variant="h4" sx={{ marginBottom: 2, color: 'rgba(0,0,0,0.5)' }}>
                        {moneyFormatter(Math.floor(Math.random() * 100000) + 100000)}
                      </Typography>
                      <Typography variant="h4">Benefit :</Typography>
                      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: 'normal' }}>
                        Revisi 1x, Proses 9-10 hari, File Master FBX, Color Guide, Export JPG / PNG / PDF
                      </Typography>
                      <Button sx={{ alignSelf: 'flex-end' }} variant="contained" onClick={() => setPackSelected(_)}>
                        Pilih Paket
                      </Button>
                    </Box>
                    <br />
                  </>
                ))}
              </>
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ padding: { xs: 1, md: 4 }, paddingTop: { xs: 3, md: 2 }, paddingBottom: 0 }}>
            <ProductDiscussion productId={product.id} showAlert={showAlertToast} />
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
}
