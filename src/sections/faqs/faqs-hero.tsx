import { m, MotionProps } from 'framer-motion';
// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box, { BoxProps } from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
// theme
// components
import Iconify from 'src/components/iconify';
import { MotionContainer, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

type FaqsHeroProps = {
  searchHandler: (text: string) => void;
  searchText: string;
};

export default function FaqsHero(props: FaqsHeroProps) {
  const { searchHandler, searchText } = props;

  return (
    <Box
      sx={{
        py: { xs: 4, md: 4 },
        position: 'relative',
      }}
    >
      <Container component={MotionContainer}>
        <Box
          sx={{
            height: 200,
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          <div>
            <TextAnimate text="How" sx={{ color: 'primary.main' }} variants={varFade().inRight} />
            <br />

            <Stack
              spacing={1}
              display="inline-flex"
              direction="row"
              sx={{ color: 'secondary.main' }}
            >
              <TextAnimate text="can" />
              <TextAnimate text="we" />
              <TextAnimate text="help" />
              <TextAnimate text="you?" />
            </Stack>
          </div>

          <m.div variants={varFade().in}>
            <TextField
              value={searchText}
              fullWidth
              onChange={(e) => searchHandler(e.target.value)}
              placeholder="Search support..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mt: 5,
                maxWidth: 360,
                [`& .${outlinedInputClasses.root}`]: {
                  bgcolor: 'common.white',
                },
                [`& .${outlinedInputClasses.input}`]: {
                  typography: 'subtitle1',
                },
              }}
            />
          </m.div>
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

type TextAnimateProps = BoxProps &
  MotionProps & {
    text: string;
  };

function TextAnimate({ text, variants, sx, ...other }: TextAnimateProps) {
  return (
    <Box
      component={m.div}
      sx={{
        typography: 'h2',
        overflow: 'hidden',
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      {text.split('').map((letter, index) => (
        <m.span key={index} variants={variants || varFade().inUp}>
          {letter}
        </m.span>
      ))}
    </Box>
  );
}
