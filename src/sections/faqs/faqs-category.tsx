import { m } from 'framer-motion';
// @mui
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ListItemButton from '@mui/material/ListItemButton';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import { MotionViewport, varFade } from 'src/components/animate';
import { CategoryType } from './data/faqs';

// ----------------------------------------------------------------------

type FaqsCategoryProps = {
  categorySelectHandler: (title: string) => void;
  selectedCategory: string;
  categories: CategoryType[];
};

export default function FaqsCategory(props: FaqsCategoryProps) {
  const { categorySelectHandler, selectedCategory, categories } = props;

  const mdUp = useResponsive('up', 'md');

  const nav = useBoolean();

  if (!mdUp) {
    return (
      <>
        <AppBar position="absolute">
          <Toolbar>
            <Button startIcon={<Iconify icon="solar:list-bold" />} onClick={nav.onTrue}>
              Categories
            </Button>
          </Toolbar>
          <Divider />
        </AppBar>

        <Drawer open={nav.value} onClose={nav.onFalse}>
          <Box display="flex" sx={{ p: 1 }}>
            {categories.map((category) => (
              <CardMobile
                selected={category.label === selectedCategory}
                key={category.label}
                category={category}
                onClick={() => categorySelectHandler(category.label)}
              />
            ))}
          </Box>
        </Drawer>
      </>
    );
  }

  return (
    <Box
      component={MotionViewport}
      gap={3}
      display="grid"
      gridTemplateColumns={{
        md: 'repeat(6, 1fr)',
        lg: 'repeat(8, 1fr)',
      }}
    >
      {categories.map((category) => (
        <m.div key={category.label} variants={varFade().in}>
          <CardDesktop
            selected={category.label === selectedCategory}
            onClick={() => categorySelectHandler(category.label)}
            category={category}
          />
        </m.div>
      ))}
    </Box>
  );
}

// ----------------------------------------------------------------------

type CardDesktopProps = {
  onClick?: VoidFunction;
  selected: boolean;
  category: {
    label: string;
    icon: string;
  };
};

function CardDesktop({ category, onClick, selected }: CardDesktopProps) {
  const { label, icon } = category;

  return (
    <Paper
      onClick={onClick}
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: selected ? 'background.neutral' : 'unset',
        cursor: 'pointer',
        textAlign: 'center',
        '&:hover': {
          bgcolor: selected ? 'background.neutral' : 'background.neutral',
          boxShadow: (theme) => theme.customShadows.z20,
        },
      }}
    >
      <Image
        disabledEffect
        alt={icon}
        src={icon}
        sx={{ mb: 2, width: 30, height: 30, mx: 'auto' }}
      />

      <TextMaxLine variant="subtitle2" persistent>
        {label}
      </TextMaxLine>
    </Paper>
  );
}

// ----------------------------------------------------------------------

function CardMobile({ category, onClick, selected }: CardDesktopProps) {
  const { label, icon } = category;

  return (
    <ListItemButton
      onClick={onClick}
      key={label}
      sx={{
        py: 2,
        maxWidth: 140,
        borderRadius: 1,
        textAlign: 'center',
        alignItems: 'center',
        typography: 'subtitle2',
        flexDirection: 'column',
        justifyContent: 'center',
        bgcolor: selected ? 'background.neutral' : 'background.paper',
      }}
    >
      <Image alt={icon} src={icon} sx={{ width: 48, height: 48, mb: 1 }} />

      {category.label}
    </ListItemButton>
  );
}
