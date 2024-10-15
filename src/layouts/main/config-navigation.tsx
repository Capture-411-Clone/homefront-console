// routes
import { paths } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
import { NavItemProps } from 'src/components/nav-section';

// ----------------------------------------------------------------------

export const navConfig = [
  {
    title: 'Home',
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    path: paths.home,
  },
  {
    title: 'How It Works',
    icon: <Iconify icon="material-symbols:work" />,
    path: paths.howItWorks,
  },
  {
    title: 'Get Paid',
    icon: <Iconify icon="material-symbols:paid" />,
    path: paths.getPaid,
  },
  {
    title: 'Contact Us',
    icon: <Iconify icon="fluent:contact-card-48-filled" />,
    path: paths.contactUs,
  },
  {
    title: 'FAQs',
    icon: <Iconify icon="wpf:faq" />,
    path: paths.faqs,
  },
  {
    title: 'Calculators',
    icon: <Iconify icon="bi:calculator" />,
    path: paths.calculators.root,
    children: [
      {
        subheader: '',
        items: [
          {
            title: 'Capture Cost',
            path: paths.calculators.captureCost,
          },
          {
            title: 'Passive Revenue',
            path: paths.calculators.passiveRevenue,
          },
        ],
      },
    ],
  },
];
