// i18n
import 'src/locales/i18n';

// scrollbar
import 'simplebar-react/dist/simplebar.min.css';

// editor
import 'react-quill/dist/quill.snow.css';

// carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------
import GoogleAnalytics from 'src/components/google-analitics/ga';

// locales
import { LocalizationProvider } from 'src/locales';
// theme
import ThemeProvider from 'src/theme';
import { primaryFont } from 'src/theme/typography';
// components
import ProgressBar from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
import { SettingsProvider, SettingsDrawer } from 'src/components/settings';
// sections
import { AuthProvider } from 'src/auth/jwt-context';
// auth
import ReduxProvider from './_providers/redux-provider';
import { TanStackProvider } from './_providers';
// ----------------------------------------------------------------------

export const metadata = {
  title: 'Capture411',
  description: 'bid intelligence made easy',
  keywords:
    'opportunity, bid, construction, intelligence, capture, 411, capture411, capture 411, capture-411, capture411.com, capture-411.com, capture411.net, capture-411.net, capture411.org, capture-411.org, capture411.info, capture-411.info, capture411.biz, capture-411.biz, capture411.us, capture-411.us, capture411.co, capture-411.co, capture411.io, capture-411.io, capture411.dev, capture-411.dev, capture411.tech, capture-411.tech, capture411.online, capture-411.online, capture411.site, capture-411.site, capture411.website, capture-411.website, capture411.store, capture-411.store, capture411.shop, capture-411.shop, capture411.club, capture-411.club, capture411.space, capture-411.space, capture411.xyz, capture-411.xyz, capture411.live, capture-411.live, capture411.world, capture-411.world, capture411.today, capture-411.today, capture411.today, capture-411.today',
  themeColor: '#000000',
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: [
    {
      rel: 'icon',
      url: '/favicon/favicon.ico',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon-32x32.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon/apple-touch-icon.png',
    },
  ],
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  const dev = process.env.NEXT_PUBLIC_ENV === 'development';

  return (
    <html lang="en" className={primaryFont.className}>
      <body>
        <ReduxProvider>
          <TanStackProvider>
            <AuthProvider>
              <LocalizationProvider>
                <SettingsProvider
                  defaultSettings={{
                    themeMode: 'light', // 'light' | 'dark'
                    themeDirection: 'ltr', //  'rtl' | 'ltr'
                    themeContrast: 'default', // 'default' | 'bold'
                    themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
                    themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                    themeStretch: false,
                  }}
                >
                  <ThemeProvider>
                    <MotionLazy>
                      <SnackbarProvider>
                        <SettingsDrawer />
                        <ProgressBar />
                        {!dev && <GoogleAnalytics />}
                        <>{children}</>
                      </SnackbarProvider>
                    </MotionLazy>
                  </ThemeProvider>
                </SettingsProvider>
              </LocalizationProvider>
            </AuthProvider>
          </TanStackProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
