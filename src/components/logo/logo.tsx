import { forwardRef } from 'react';
// @mui
import Link from '@mui/material/Link';
import Box, { BoxProps } from '@mui/material/Box';
// routes
import { RouterLink } from 'src/routes/components';
import Image from '../image/image';

// ----------------------------------------------------------------------

interface LogoProps extends BoxProps {
  disabledLink?: boolean;
  isLoading?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, isLoading = false, sx, ...other }, ref) => {
    // OR using local (public folder)
    // -------------------------------------------------------
    // const logo = (
    //   <Box
    //     component="img"
    //     src="/logo/logo_single.svg" => your path
    //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
    //   />
    // );

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 117,
          height: 41,
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      >
        {isLoading ? (
          <Image src="/logo/SVG/Capture411_128.svg" sx={{ width: '100%', height: '100%' }} />
        ) : (
          <Image src="/logo/Capture411_Original.svg" sx={{ width: '100%', height: '100%' }} />
        )}
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
