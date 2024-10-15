// utils
import { _id } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  home: '/',
  howItWorks: '/how-it-works',
  getPaid: '/get-paid',
  contactUs: '/contact-us',
  comingSoon: '/coming-soon',
  pricing: '/pricing',
  payment: '/payment',
  contact: '/contact-us',
  calculators: {
    root: '/calculators',
    captureCost: '/calculators/capture-cost',
    passiveRevenue: '/calculators/passive-revenue',
  },
  faqs: '/faqs',
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
  auth: {
    policy: `${ROOTS.AUTH}/privacy-policy`,
    login: `${ROOTS.AUTH}/login`,
    register: `${ROOTS.AUTH}/register`,
    verify: `${ROOTS.AUTH}/verify`,
    resetPassword: `${ROOTS.AUTH}/reset-password`,
    changePassword: `${ROOTS.AUTH}/change-password`,
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    entityHunter: {
      root: `${ROOTS.DASHBOARD}/ai-models/entity-hunter`,
      train: `${ROOTS.DASHBOARD}/ai-models/entity-hunter/train`,
    },
    category: {
      root: `${ROOTS.DASHBOARD}/category`,
      new: `${ROOTS.DASHBOARD}/category/new`,
      edit: (id: number) => `${ROOTS.DASHBOARD}/category/${id}/edit`,
    },
    department: {
      root: `${ROOTS.DASHBOARD}/department`,
      new: `${ROOTS.DASHBOARD}/department/new`,
      edit: (id: number) => `${ROOTS.DASHBOARD}/department/${id}/edit`,
    },
    opportunity: {
      root: `${ROOTS.DASHBOARD}/opportunity`,
      buyList: `${ROOTS.DASHBOARD}/opportunity?tab=1`,
      requestedList: `${ROOTS.DASHBOARD}/opportunity?tab=2`,
      myWishes: `${ROOTS.DASHBOARD}/opportunity?tab=3`,
      myPipeline: `${ROOTS.DASHBOARD}/opportunity?tab=4`,
      myContributions: `${ROOTS.DASHBOARD}/opportunity?tab=5`,
      newRequest: `${ROOTS.DASHBOARD}/opportunity/new-request`,
      new: `${ROOTS.DASHBOARD}/opportunity/new`,
      edit: (id: number) => `${ROOTS.DASHBOARD}/opportunity/${id}/edit`,
      editForDuplicate: (id: number) => `${ROOTS.DASHBOARD}/opportunity/${id}/edit?duplicate=true`,
    },
    fiscal_year: {
      root: `${ROOTS.DASHBOARD}/fiscal-year`,
      new: `${ROOTS.DASHBOARD}/fiscal-year/new`,
      edit: (id: number) => `${ROOTS.DASHBOARD}/fiscal-year/${id}/edit`,
    },
    set_aside: {
      root: `${ROOTS.DASHBOARD}/set-aside`,
      new: `${ROOTS.DASHBOARD}/set-aside/new`,
      edit: (id: number) => `${ROOTS.DASHBOARD}/set-aside/${id}/edit`,
    },
    Naics: {
      root: `${ROOTS.DASHBOARD}/naics`,
      new: `${ROOTS.DASHBOARD}/naics/new`,
      edit: (id: number) => `${ROOTS.DASHBOARD}/naics/${id}/edit`,
    },
    contractVehicle: {
      root: `${ROOTS.DASHBOARD}/contract-vehicles`,
      new: `${ROOTS.DASHBOARD}/contract-vehicles/new`,
      edit: (id: number) => `${ROOTS.DASHBOARD}/contract-vehicles/${id}/edit`,
    },
    plans: {
      root: `${ROOTS.DASHBOARD}/plans`,
      list: `${ROOTS.DASHBOARD}/plans/list`,
    },
    stripe: {
      portalSession: `${ROOTS.DASHBOARD}/plan/portal-session`,
    },
    general: {
      finance: `${ROOTS.DASHBOARD}/finance`,
      analytics: `${ROOTS.DASHBOARD}/analytics`,
    },
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      new: `${ROOTS.DASHBOARD}/user/new`,
      account: `${ROOTS.DASHBOARD}/user/account`,
      staffReport: `${ROOTS.DASHBOARD}/user/staff-report`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
    },
    invoice: {
      root: `${ROOTS.DASHBOARD}/invoice`,
      new: `${ROOTS.DASHBOARD}/invoice/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/invoice/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/invoice/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}/edit`,
      },
    },
    market: `${ROOTS.DASHBOARD}/market`,
    offices: {
      root: `${ROOTS.DASHBOARD}/offices`,
      new: `${ROOTS.DASHBOARD}/offices/new`,
      edit: (id: number) => `${ROOTS.DASHBOARD}/offices/${id}/edit`,
    },
    agency: {
      root: `${ROOTS.DASHBOARD}/agency`,
      new: `${ROOTS.DASHBOARD}/agency/new`,
      edit: (id: number) => `${ROOTS.DASHBOARD}/agency/${id}/edit`,
    },
    orders: `${ROOTS.DASHBOARD}/orders`,
  },
};
