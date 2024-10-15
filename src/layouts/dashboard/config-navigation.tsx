import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// locales
import { useLocales } from 'src/locales';
// components
import SvgColor from 'src/components/svg-color';
import { useAuthContext } from 'src/auth/hooks';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  home: <Iconify icon="solar:home-2-bold-duotone" />,
  howItWorks: <Iconify icon="material-symbols:work" />,
  getPaid: <Iconify icon="material-symbols:paid" />,
  contactUs: <Iconify icon="fluent:contact-card-48-filled" />,
  faqs: <Iconify icon="wpf:faq" />,
  user: <Iconify icon="fa6-solid:user-group" />,
  plans: <Iconify icon="carbon:pricing-tailored" />,
  portalSession: <Iconify icon="et:global" />,
  calculator: <Iconify icon="bi:calculator" />,
  entityHunter: <Iconify icon="bi:bullseye" />,
  department: icon('ic_department'),
  opportunity: icon('ic_opportunity'),
  requestZone: icon('ic_request_zone'),
  contract: icon('ic_contract'),
  banking: icon('ic_ticket'),
  analytics: icon('ic_analytics'),
  market: icon('ic_market'),
  offices: icon('ic_offices'),
  agency: icon('ic_agency'),
  fiscal: icon('ic_fiscal'),
  aside: icon('ic_aside'),
  naics: icon('ic_naics'),
  ecommerce: icon('ic_ecommerce'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useLocales();

  const { permissions } = useAuthContext();

  const data = useMemo(() => {
    const originalItems = [
      {
        subheader: t('Overview'),
        body: [
          {
            title: t('Reports'),
            path: paths.dashboard.general.finance,
            icon: ICONS.ecommerce,
            condition: true,
          },
        ],
      },
      {
        subheader: permissions?.CanAccessUser ? t('Admin') : '',
        body: [
          {
            title: t('User'),
            path: paths.dashboard.user.root,
            icon: ICONS.user,
            condition: permissions?.CanAccessUser,
            children: [
              {
                title: t('New User'),
                path: paths.dashboard.user.new,
                condition: permissions?.CanAccessUser,
              },
              {
                title: t('User List'),
                path: paths.dashboard.user.root,
                condition: permissions?.CanAccessUser,
              },
              {
                title: t('Staff Report'),
                path: paths.dashboard.user.staffReport,
                condition: permissions?.CanAccessUser,
              },
            ],
          },
        ],
      },
      {
        subheader: t('Financial'),
        body: [
          {
            title: t('Orders List'),
            path: paths.dashboard.orders,
            icon: ICONS.analytics,
            condition: permissions?.CanAccessUser,
          },
          // {
          //   title: t('Plans'),
          //   path: paths.dashboard.plans.root,
          //   icon: ICONS.plans,
          //   condition: permissions?.CanAccessOpportunity || permissions?.CanCreateOpportunity,
          // },
          // {
          //   title: t('Payment Portal'),
          //   path: paths.dashboard.stripe.portalSession,
          //   icon: ICONS.portalSession,
          //   condition: permissions?.CanAccessOpportunity || permissions?.CanCreateOpportunity,
          // },
        ],
      },
      {
        subheader: t('AI Models'),
        body: [
          {
            title: t('Entity Hunter'),
            path: paths.dashboard.entityHunter.root,
            icon: ICONS.entityHunter,
            condition: permissions?.CanCreateUser,
            children: [
              {
                title: t('Train & Data Mining'),
                path: paths.dashboard.entityHunter.train,
                condition: permissions?.CanCreateUser,
                active: true,
              },
            ],
          },
        ],
      },
      {
        subheader: t('management'),
        body: [
          {
            title: t('Opportunity'),
            path: paths.dashboard.opportunity.root,
            icon: ICONS.opportunity,
            condition: permissions?.CanAccessOpportunity || permissions?.CanCreateOpportunity,
            children: [
              {
                title: t('New Contribution'),
                path: paths.dashboard.opportunity.new,
                condition: permissions?.CanCreateOpportunity,
                active: true,
              },
              {
                title: t('Request Zone'),
                path: paths.dashboard.opportunity.newRequest,
                condition: permissions?.CanCreateOpportunity,
              },
              {
                title: t('Opportunity List'),
                path: paths.dashboard.opportunity.buyList,
                condition: permissions?.CanAccessOpportunity,
              },
            ],
          },
          {
            title: t('NAICS'),
            path: paths.dashboard.Naics.root,
            icon: ICONS.naics,
            condition: permissions?.CanAccessNaics,
            children: [
              {
                title: t('New NAICS'),
                path: paths.dashboard.Naics.new,
                condition: permissions?.CanCreateNaics,
              },
              {
                title: t('NAICS List'),
                path: paths.dashboard.Naics.root,
                condition: permissions?.CanAccessNaics,
              },
            ],
          },
          {
            title: t('Market'),
            path: paths.dashboard.market,
            icon: ICONS.market,
            condition: permissions?.CanAccessMarket,
            children: [
              {
                title: t('Markets List'),
                path: paths.dashboard.market,
                condition: permissions?.CanAccessMarket,
              },
            ],
          },
          {
            title: t('Department'),
            path: paths.dashboard.department.root,
            icon: ICONS.department,
            condition: permissions?.CanAccessDepartment,
            children: [
              {
                title: t('New Department'),
                path: paths.dashboard.department.new,
                condition: permissions?.CanCreateDepartment,
              },
              {
                title: t('Department List'),
                path: paths.dashboard.department.root,
                condition: permissions?.CanAccessDepartment,
              },
            ],
          },
          {
            title: t('Agency'),
            path: paths.dashboard.agency.root,
            icon: ICONS.agency,
            condition: permissions?.CanAccessAgency,
            children: [
              {
                title: t('New Agency'),
                path: paths.dashboard.agency.new,
                condition: permissions?.CanCreateAgency,
              },
              {
                title: t('Agency List'),
                path: paths.dashboard.agency.root,
                condition: permissions?.CanAccessAgency,
              },
            ],
          },
          {
            title: t('Offices'),
            path: paths.dashboard.offices.root,
            icon: ICONS.offices,
            condition: permissions?.CanAccessOffice || permissions?.CanCreateOffice,
            children: [
              {
                title: t('New Office'),
                path: paths.dashboard.offices.new,
                condition: permissions?.CanCreateOffice,
              },
              {
                title: t('Offices List'),
                path: paths.dashboard.offices.root,
                condition: permissions?.CanAccessOffice,
              },
            ],
          },
          {
            title: t('Contract Vehicle'),
            path: paths.dashboard.contractVehicle.root,
            icon: ICONS.contract,
            condition: permissions?.CanAccessContractVehicle,
            children: [
              {
                title: t('New Contract Vehicle'),
                path: paths.dashboard.contractVehicle.new,
                condition: permissions?.CanCreateContractVehicle,
              },
              {
                title: t('Contract Vehicle List'),
                path: paths.dashboard.contractVehicle.root,
                condition: permissions?.CanAccessContractVehicle,
              },
            ],
          },
          {
            title: t('Set Aside'),
            path: paths.dashboard.set_aside.root,
            icon: ICONS.aside,
            condition: permissions?.CanAccessSetAside,
            children: [
              {
                title: t('New Set Aside'),
                path: paths.dashboard.set_aside.new,
                condition: permissions?.CanCreateSetAside,
              },
              {
                title: t('Set Aside List'),
                path: paths.dashboard.set_aside.root,
                condition: permissions?.CanAccessSetAside,
              },
            ],
          },
          {
            title: t('Year Issued'),
            path: paths.dashboard.fiscal_year.root,
            icon: ICONS.fiscal,
            condition: permissions?.CanAccessFiscalYear,
            children: [
              {
                title: t('New Year'),
                path: paths.dashboard.fiscal_year.new,
                condition: permissions?.CanCreateFiscalYear,
              },
              {
                title: t('Year List'),
                path: paths.dashboard.fiscal_year.root,
                condition: permissions?.CanAccessFiscalYear,
              },
            ],
          },
        ],
      },
      {
        subheader: t('Site'),
        body: [
          {
            title: 'Calculators',
            path: paths.calculators.root,
            icon: ICONS.calculator,
            condition: true,
            children: [
              {
                title: 'Passive Revenue',
                path: paths.calculators.passiveRevenue,
                condition: true,
              },
              {
                title: 'Capture Cost',
                path: paths.calculators.captureCost,
                condition: true,
              },
            ],
          },
          {
            title: t('Home'),
            path: paths.home,
            icon: ICONS.home,
            condition: true,
          },
          {
            title: t('How it Works'),
            path: paths.howItWorks,
            icon: ICONS.howItWorks,
            condition: true,
          },
          {
            title: t('Get Paid'),
            path: paths.getPaid,
            icon: ICONS.getPaid,
            condition: true,
          },
          {
            title: t('Contact Us'),
            path: paths.contactUs,
            icon: ICONS.contactUs,
            condition: true,
          },
          {
            title: 'FAQs',
            path: paths.faqs,
            icon: ICONS.faqs,
            condition: true,
          },
        ],
      },
    ];

    // remove condition key from children and items
    return originalItems.map((item) => {
      const { body } = item;
      const bodyItems = body
        .filter((bdItem) => bdItem.condition)
        .map((bodyItem: any) => {
          const { children, condition: cond, ...res } = bodyItem;
          return {
            ...res,
            children: children
              ?.filter((ch: any) => ch.condition)
              .map((child: any) => {
                const { condition, ...rest } = child;
                return rest;
              }),
          };
        });

      return {
        subheader: item.subheader,
        items: bodyItems,
      };
    });
  }, [
    permissions?.CanAccessAgency,
    permissions?.CanAccessDepartment,
    permissions?.CanAccessFiscalYear,
    permissions?.CanAccessMarket,
    permissions?.CanAccessNaics,
    permissions?.CanAccessOffice,
    permissions?.CanAccessOpportunity,
    permissions?.CanAccessSetAside,
    permissions?.CanCreateAgency,
    permissions?.CanCreateDepartment,
    permissions?.CanCreateFiscalYear,
    permissions?.CanCreateNaics,
    permissions?.CanCreateOffice,
    permissions?.CanCreateOpportunity,
    permissions?.CanCreateSetAside,
    permissions?.CanCreateContractVehicle,
    permissions?.CanAccessContractVehicle,
    permissions?.CanAccessUser,
    permissions?.CanCreateUser,
    t,
  ]);

  return data;
}
