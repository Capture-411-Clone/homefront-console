// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
import { usePathname, useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
// components
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === '/';

  const handleLinkedin = () => {
    router.push('https://www.linkedin.com/company/capture-411/');
  };

  const simpleFooter = (
    <Box
      component="footer"
      sx={{
        py: 5,
        textAlign: 'center',
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Container>
        <Logo sx={{ mb: 1, mx: 'auto' }} />

        <Typography variant="caption" component="div">
          © All rights reserved
          <br /> made by
          <Link href="https://minimals.cc/"> minimals.cc </Link>
        </Typography>
      </Container>
    </Box>
  );

  const mainFooter = (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Divider />

      <Container
        sx={{
          pt: 10,
          pb: 5,
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        <Stack justifyContent="center" alignItems="center">
          <Logo sx={{ height: 50, width: 118 }} />
          <Stack direction="row" spacing={2} alignItems="center" sx={{ color: 'text.secondary' }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
            >
              <Link key="Home" component={RouterLink} href="/" color="inherit" variant="body2">
                Home
              </Link>
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
            >
              <Link
                key="Home"
                component={RouterLink}
                href={paths.contact}
                color="inherit"
                variant="body2"
              >
                Contact Us
              </Link>
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 10 }}>
          <Typography variant="body2">© 2023. All rights reserved</Typography>
          <Typography variant="body2">Provisional Patent Pending</Typography>
          <Box width="175px" textAlign="right">
            <IconButton onClick={handleLinkedin}>
              <Iconify icon="eva:linkedin-fill" color="#007ebb" />
            </IconButton>
          </Box>
        </Stack>
      </Container>
    </Box>
  );

  return mainFooter;
}
