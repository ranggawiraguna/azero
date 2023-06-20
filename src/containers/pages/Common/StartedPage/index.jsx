import { Box, Button, CardMedia, Grid, Typography } from '@mui/material';
import LogoCircle from 'assets/images/logo/CircleLogo.png';
import IconLocationMap from 'assets/images/icon/LocationMap.png';
import ToolbarStarted from 'components/elements/ToolbarStarted';
import PageRoot from './styled';
import { BoxTransition } from 'components/elements/MotionTransitions';
import { Fragment } from 'react';
import IconServiceOne from 'assets/images/icon/ServiceOne.png';
import IconServiceTwo from 'assets/images/icon/ServiceTwo.png';
import IconServiceThree from 'assets/images/icon/ServiceThree.png';
import IconServiceFour from 'assets/images/icon/ServiceFour.png';
import IconServiceFive from 'assets/images/icon/ServiceFive.png';
import IconInstagram from 'assets/images/icon/IconInstagram.png';
import IconWhatsApp from 'assets/images/icon/IconWhatsApp.png';
import IconGmail from 'assets/images/icon/IconGmail.png';
import { useLocation } from 'react-router';
import { faker } from '@faker-js/faker';
import { stringCapitalize } from 'utils/other/Services';

export default function StartedPage() {
  const listService = [
    {
      title: 'Profesional',
      icon: IconServiceOne
    },
    {
      title: 'Cloud Save',
      icon: IconServiceTwo
    },
    {
      title: 'Berkualitas',
      icon: IconServiceThree
    },
    {
      title: 'Tepat Waktu',
      icon: IconServiceFour
    },
    {
      title: 'Terpercaya',
      icon: IconServiceFive
    }
  ];
  const listContact = [
    {
      title: 'WhatsApp',
      description: '0888 0000 9999',
      icon: IconWhatsApp
    },
    {
      title: 'Instagram',
      description: '@ardplayer',
      icon: IconInstagram
    },
    {
      title: 'Gmail',
      description: 'bxqwu_@gmail.com',
      icon: IconGmail
    }
  ];

  const location = useLocation();

  return (
    <PageRoot>
      <Box className="content section-one">
        <ToolbarStarted
          buttons={[
            {
              text: 'Daftar',
              link: '/daftar',
              color: ''
            },
            {
              text: 'Login',
              link: '/masuk'
            }
          ]}
        />

        {(() => {
          switch (location.pathname) {
            case '/profile':
              return (
                <Fragment>
                  <Box className="box-content">
                    <BoxTransition variant="fade">
                      <Typography variant="h1" component="h1">
                        Azero Creative
                      </Typography>
                      <Typography variant="p" component="p">
                        Jasa Desain Grafis 3D Professional, Terpercaya, dan Berkualitas
                      </Typography>
                    </BoxTransition>
                    <BoxTransition variant="fadeZoomRotate">
                      <CardMedia component="img" src={LogoCircle} />
                    </BoxTransition>
                  </Box>
                </Fragment>
              );

            case '/beranda':
              return (
                <Fragment>
                  <Box className="box-content">
                    <BoxTransition variant="fade">
                      <Typography variant="h1" component="h1">
                        Azero Creative
                      </Typography>
                      <Typography variant="p" component="p">
                        Jasa Desain Grafis 3D Professional, Terpercaya, dan Berkualitas
                      </Typography>
                      <Box className="map-desc">
                        <CardMedia component="img" src={IconLocationMap} />
                        <Typography variant="p" component="p">
                          Jalan Merpati 1 No.7 RT.003 RW.015, Kel. Menteng Dalam, Jakarta Selatan.
                        </Typography>
                      </Box>
                    </BoxTransition>
                    <BoxTransition variant="fadeZoomRotate">
                      <CardMedia component="img" src={LogoCircle} />
                    </BoxTransition>
                  </Box>
                  <BoxTransition variant="fade">
                    <Button
                      onClick={() => {
                        window.open('https://goo.gl/maps/CRd85HX32rvNL6Sg7', '_blank');
                      }}
                      variant="contained"
                    >
                      Lihat Google Maps
                    </Button>
                    <br />
                    <br />
                    <br />
                    <Typography variant="h3" component="h3" fontSize={{ xs: 14, md: 20 }} sx={{ textAlign: 'center' }}>
                      Mengapa Kami ?
                    </Typography>
                    <BoxTransition variant="fade">
                      <Box sx={{ flex: 1, boxSizing: 'border-box', display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                        {listService.map((_, __) => (
                          <Box
                            key={`service-${__}`}
                            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                          >
                            <Box sx={{ padding: 5 }}>
                              <CardMedia component="img" src={_.icon} sx={{ height: { xs: '20vw', md: '7vw' } }} />
                            </Box>
                            <Typography component="h3" variant="h3" sx={{ paddingBottom: 1 }}>
                              {_.title}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </BoxTransition>
                    <br />
                    <br />
                    <br />
                    <br />
                  </BoxTransition>
                </Fragment>
              );

            case '/portofolio':
              return (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <br />
                  <br />
                  <Typography variant="h3" component="h3" fontSize={20}>
                    Beberapa Project Desain Gambar 3D Yang Pernah Kami Kerjakan
                  </Typography>
                  <Grid container spacing={5} sx={{ padding: '80px' }}>
                    {Array.from(Array(4).keys()).map(() => (
                      <Grid item xs={12} md={3}>
                        <Box
                          sx={{
                            backgroundColor: 'lightgrey',
                            aspectRatio: '1/1',
                            width: '100%',
                            borderRadius: 1,
                            backgroundImage: `url(${faker.image.image(null, null, true)})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover'
                          }}
                        ></Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              );

            case '/product':
              return (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <br />
                  <br />
                  <Typography variant="h3" component="h3" fontSize={20}>
                    Daftar Harga Produk Jasa Desain Gambar 3D
                  </Typography>
                  <Grid container spacing={5} sx={{ padding: { xs: '40px 20px', sm: '80px' }, alignItems: 'stretch' }}>
                    {Array.from(Array(4).keys()).map(() => (
                      <Grid item xs={12} lg={6}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            backgroundColor: 'rgba(255,255,255,0.5)',
                            borderRadius: 3,
                            border: '3px solid rgba(0,0,0,0.1)',
                            width: '100%',
                            height: '100%'
                          }}
                        >
                          <Grid container columnSpacing={1} sx={{ padding: 2 }}>
                            <Grid item xs={8} sm={9}>
                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingRight: 4 }}>
                                <Typography variant="h4" sx={{ marginBottom: 1 }}>
                                  Harga Desain
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 'normal' }}>
                                  Rp. 100.000 s/d Rp. 200.000
                                </Typography>
                                <br />
                                <Typography variant="h4" sx={{ marginBottom: 1 }}>
                                  Benefit
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 'normal' }}>
                                  {stringCapitalize(faker.lorem.words(30))}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={4} sm={3}>
                              <Box sx={{ width: '100%', aspectRatio: '1/1', borderRadius: 1, backgroundColor: 'lightgrey' }} />
                              <br />
                              <Typography variant="h4" sx={{ textAlign: 'center' }}>
                                Example <br /> Design
                              </Typography>
                            </Grid>
                          </Grid>
                          <Box sx={{ padding: '10px', width: '100%' }}>
                            <Button variant="contained" sx={{ width: '100%' }}>
                              Lihat Selengkapnya
                            </Button>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              );

            case '/contact':
              return (
                <Box className="content section-four">
                  <BoxTransition variant="fade">
                    <Typography variant="h3" component="h3" fontSize={{ xs: 14, md: 20 }}>
                      ANDA TERTARIK DENGAN JASA KAMI ? SEGERA HUBUNGI KAMI !
                    </Typography>
                    <br />
                    <br />
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                        rowGap: { xs: 5, md: 1 },
                        columnGap: { xs: 5, md: 10 },
                        padding: { xs: '0 20px', md: '100px 50px' }
                      }}
                    >
                      {listContact.map((_, __) => (
                        <Box
                          key={__}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                          }}
                        >
                          <CardMedia
                            component="img"
                            src={_.icon}
                            sx={{ height: { xs: '40px', md: '70px' }, width: { xs: '40px', md: '70px' } }}
                          />
                          <Box>
                            <Typography
                              variant="h3"
                              component="h3"
                              sx={{ marginBottom: '5px', textAlign: 'start', fontSize: { xs: 16, md: 20 } }}
                            >
                              {_.title}
                            </Typography>
                            <Typography
                              variant="h3"
                              component="h3"
                              sx={{ fontWeight: 'normal', textAlign: 'start', fontSize: { xs: 16, md: 20 } }}
                            >
                              {_.description}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </BoxTransition>
                </Box>
              );

            default:
              return <></>;
          }
        })()}
      </Box>
    </PageRoot>
  );
}
