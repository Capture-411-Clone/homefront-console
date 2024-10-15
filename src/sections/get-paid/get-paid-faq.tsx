import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'src/routes/hooks';
import React, { useEffect } from 'react';
import Iconify from 'src/components/iconify';
import { paths } from 'src/routes/paths';
import { FAQItemType, FAQs } from '../faqs/data/faqs';

const ErrorText = styled('span')(({ theme }) => ({
  color: theme.palette.error.main,
}));

export default function GetPaidFaq() {
  const [getPaid, setGetPaidFAQs] = React.useState<FAQItemType[]>([]);

  const router = useRouter();

  const handleGetPaid = () => {
    router.push(paths.dashboard.opportunity.root);
  };

  useEffect(() => {
    let items: FAQItemType[] = [];
    FAQs.forEach((faq) => {
      items = items.concat(faq.items.filter((item) => item.page === 'getPaid'));
    });

    setGetPaidFAQs(items);
  }, []);

  return (
    <Stack sx={{ py: 15, mx: { md: 25 } }} alignItems="center">
      <Container maxWidth="md">
        <Stack alignContent="center" sx={{ mb: 10 }}>
          <Typography variant="h2" color="info.darker" sx={{ textAlign: 'center' }}>
            Contributor FAQs
          </Typography>
        </Stack>
        {getPaid.map((item) => (
          <Stack>
            <Accordion key={item.heading}>
              <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                <Typography variant="subtitle1">{item.heading}</Typography>
              </AccordionSummary>

              <AccordionDetails>
                {item.detail.split('\n').map((detail, index) => (
                  <Typography key={index} variant="body1" sx={{ mt: 1 }}>
                    {detail}
                  </Typography>
                ))}
              </AccordionDetails>
            </Accordion>
          </Stack>
        ))}
        <Stack justifyContent="center" alignItems="center" sx={{ mt: 18 }} spacing={5}>
          <Typography
            variant="h3"
            color="info.darker"
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          >
            Click the Button to Start <ErrorText>Get</ErrorText>ting <ErrorText>Paid</ErrorText>
          </Typography>
          <Button variant="contained" color="primary" size="large" onClick={handleGetPaid}>
            Get Paid
          </Button>
        </Stack>
      </Container>
    </Stack>
  );
}
