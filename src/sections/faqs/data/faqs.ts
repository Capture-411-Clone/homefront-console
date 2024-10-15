export type CategoryType = {
  label: string;
  icon: string;
};

export type FAQItemType = {
  heading: string;
  detail: string;
  page?: 'home' | 'getPaid';
};

export type FAQType = {
  category: CategoryType;
  items: FAQItemType[];
};

export const FAQs: FAQType[] = [
  {
    category: {
      label: 'Getting Started',
      icon: '/assets/icons/faqs/ic_getting_started.svg',
    },
    items: [
      {
        heading: 'Are Federal Government employees allowed to contribute?',
        detail:
          'No. Federal Government employees are not allowed to profit from our site. If a government agency would like to contribute to our site with a business account (profits go back to the government), please use the Contact Us section to start the conversation. While we make no promises, we will do everything in our power to work with you.',
        page: 'getPaid',
      },
      {
        heading:
          'If I want to be a contributor, what solicitation documents should I submit first?',
        detail:
          'Solicitation documents that are 3-4 years old are the most sought after because recompetes of those contracts are usually within one year away. Also, focus on task orders with vehicles that are expiring (OASIS, PACTS II, CIO SP3, etc.) because when new companies on ramp to the follow-on vehicle they will need your contributions as a good starting point in pipeline development.',
      },
      {
        heading:
          'What if I cannot find what I’m looking for in the Capture 411 database? Can I request solicitation documents?',
        detail:
          'Yes! Our Request Zone allows you to fill out a form so that contributors can filter through requests and fulfill any opportunity requests they may have. This is a win-win; you will receive a notification when the solicitation documents you need are now available for purchase and the contributor will have a quick sale.',
      },
      {
        heading: 'What if I need help, have further questions, or want to give feedback?',
        detail: 'Please use our Contact Us page for any questions, concerns, feedback, or issues.',
      },
      {
        heading: 'Is this really pay as you go?',
        detail:
          'Yes! Once you register for an account you will see the growing database of legacy RFPs and other solicitation documents. If you find one you need, you can purchase it without ongoing subscription fees.',
        page: 'home',
      },
      {
        heading: 'Will I find classified solicitation documents in the database?',
        detail:
          'No. There is no “Controlled Unclassified Information” (CUI) or classified information allowed in the database.',
        page: 'home',
      },
    ],
  },
  {
    category: {
      label: 'Beta',
      icon: '/assets/icons/faqs/ic_beta.svg',
    },
    items: [
      {
        heading: 'What do you mean by Beta?',
        detail:
          'The Beta Phase is Capture 411’s time to collect as many Federal Government solicitation documents as possible to ensure the database is full of valuable information for business development and capture professionals. The Beta Phase will only last until the business development community reaches 100% progress in filling the database. 100% progress does not mean we have collected all legacy solicitation documents. 100% progress means contributors have reached the number of solicitation documents we believe will create real value for our users.',
      },
      {
        heading: 'I’ve registered for an account, but I cannot see the Opportunity List?',
        detail:
          'While in our Beta phase you will see a progress bar instead of the Opportunity List. Once the business development community gets the progress bar to 100%, we will unveil the Opportunity List database so you can buy the legacy solicitation documents you need for a successful bid.',
      },
      {
        heading: 'Can I request solicitation documents while Capture 411 is in the Beta phase?',
        detail:
          'Yes! Make as many requests as you would like. Requests will help contributors see where they need to focus their efforts.',
      },
    ],
  },
  {
    category: {
      label: 'Account Management',
      icon: '/assets/icons/faqs/ic_account_management.svg',
    },
    items: [
      {
        heading: 'Can I sign my business up for an account or just myself?',
        detail:
          'Yes! In fact, we highly encourage businesses to sign up for an account to contribute solicitation documents and have payments go directly to your company. A business account also allows purchases to be centralized in one place. We are working on a linked account system in the future.',
      },
      {
        heading: 'How do I know my contribution was uploaded?',
        detail:
          'You will have a separate dashboard showing all your contributions so you can keep track.',
        page: 'getPaid',
      },
    ],
  },
  {
    category: {
      label: 'Purchases and Refunds',
      icon: '/assets/icons/faqs/ic_purchases_and_refunds.svg',
    },
    items: [
      {
        heading: 'Why don’t the documents I purchased match the opportunity I bought?',
        detail:
          'By relying on the business development community to make contributions, human error is inevitable. But don’t worry, just contact us and we will investigate the issue and promptly send you a refund. If we find a contributor uploading incorrect documents more than twice, we will send them a notice. If the problem persists, we will use our discretion and consider banning them from Capture 411.',
      },
      {
        heading: 'What if I bought an opportunity and it’s augmented after I made my purchase?',
        detail:
          'Check your “My Pipeline” area and you will see the additional documents added to your account at no additional cost.',
      },
      {
        heading: 'My documents are not downloading after I’ve paid. What do I do?',
        detail:
          'Drop us a line using Contact Us and use “Download Problem” as your subject line. We will put a priority on solving your problem and get you the documents as quick as possible.',
      },
      {
        heading: 'Am I allowed to share the information I buy with other companies?',
        detail:
          'No. Outside of teaming partners where teaming agreements are in place and legal, you are not allowed to share the information you purchase from Capture 411.',
        page: 'home',
      },
    ],
  },
  {
    category: {
      label: 'Contributions',
      icon: '/assets/icons/faqs/ic_contributions.svg',
    },
    items: [
      {
        heading: 'Are my contributions anonymous?',
        detail:
          'Yes. Other users cannot see who has contributed or purchased opportunities. Capture 411 is required to collect certain information to make sure we can pay contributors, but your information is never shared.',
        page: 'getPaid',
      },
      {
        page: 'getPaid',
        heading: 'Can someone overwrite my contribution?',
        detail: `Our A.I. will prevent duplicate entries into the database. However, there are circumstances where another contributor can augment your contribution. This means you are sharing the profit with another contributor.\n
Example of duplicate entry (no augmentation): Another contributor submits the same opportunity and exact documents as another contributor. In this case we will not augment the first opportunity because no new information was added.\n
        
Example of an augmented entry: Another contributor submits the same opportunity and has additional valuable documentation for that opportunity. We want the Federal Government Business Development community to reap the full benefits from Capture 411, so we encourage augmenting opportunities. More documents equal more sales.\n   
        
It pays to upload a complete package, so you keep the first mover advantage and get paid 100%!\n
        
Document – Weighted Value\n
SOW/PWS – 40%\n
Pricing – 25%\n 
Q & A – 10%\n
Instructions – 10%\n
RFP/RFQ – 5%\n 
Amendments – 5%\n
Other – 5%\n 
Total – 100%\n

Not every solicitation package comes with each of the documents weighted in the table. If the opportunity does not have an issued Instructions document or Other,´ the weight of those items is spread across the available documents.\n 

Example:\n
Document – Weighted Value\n
SOW/PWS – 47%\n
Pricing – 29% \n
Q & A – 12%\n
RFP/RFQ – 6%\n 
Amendments – 6%\n
Total – 100%\n
\n
\n
Using the example above here’s how payment works on a $400 commission:\n
Contributor 1 – Payment\n
SOW/PWS – $188\n
Pricing – $116\n
RFP/RFQ – $24\n
Total – $328\n

Contributor 2 – Payment\n
Q & A – $48\n
Amendments – $24\n
Total – $72\n

It warrants repeating: It pays to upload a complete package, so you keep the first mover advantage and get paid 100%!\n

        `,
      },
      {
        page: 'home',
        heading: 'How do I get paid as a contributor?',
        detail:
          'When you become a contributor and a buyer purchases one of your contributions, you will have a dashboard showing all your sales and history of payments. Capture 411 payments to contributors are quarterly. We use Stripe as our payment provider to ensure the security of your information and money.',
      },
      {
        heading: 'When do I get paid for my sales?',
        detail: `Capture 411 pays contributors on a quarterly schedule. Contributors can keep track of sales in the Reports Dashboard.\n
Month You Receive Payment - Sales Months You’re Paid For\n
May – January, February, March\n
August – April, May, June\n
November – July, August, September\n
February – October, November, December\n
`,
      },
    ],
  },
  {
    category: {
      label: 'Troubleshooting',
      icon: '/assets/icons/faqs/ic_ai.svg',
    },
    items: [
      {
        heading: 'How come the form is not filled out by the A.I. when I’m contributing?',
        detail:
          'Our A.I. reads RFP/RFQs. If you do not have the RFP/RFQ uploaded our A.I. will not help you with the contribution form.',
      },
    ],
  },
  {
    category: {
      label: 'Bans and Restrictions',
      icon: '/assets/icons/faqs/ic_bans_and_restrictions.svg',
    },
    items: [
      {
        heading: 'Is proprietary information available in the Capture 411 database?',
        detail:
          'No. If a contributor uploads proprietary information (technical proposals, pricing proposals, etc.) once reported, we immediately remove the information and ban that user from Capture 411. In addition, we will inform any company that is damaged by this information and fully cooperate with any legal action they may take. In short, it’s not cool, don’t even think about it.',
      },
    ],
  },
];
