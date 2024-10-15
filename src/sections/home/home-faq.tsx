import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  // Box,
  Button,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import React, { useCallback, useEffect } from 'react';
import Iconify from 'src/components/iconify';
import { paths } from 'src/routes/paths';
import { FAQItemType, FAQs } from 'src/sections/faqs/data/faqs';

export default function HomeFaq() {
  const [homeFAQs, setHomeFAQs] = React.useState<FAQItemType[]>([]);
  const router = useRouter();

  const handleContactUs = useCallback(() => {
    router.push(paths.contact);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let items: FAQItemType[] = [];
    FAQs.forEach((faq) => {
      items = items.concat(faq.items.filter((item) => item.page === 'home'));
    });

    setHomeFAQs(items);
  }, []);

  return (
    <Stack sx={{ py: 15, position: 'relative' }} alignItems="center">
      <Container maxWidth="md">
        <Stack alignContent="center" sx={{ mb: 10 }}>
          <Typography variant="h2" sx={{ textAlign: 'center' }} color="info.darker">
            Frequently Asked Questions
          </Typography>
        </Stack>
        {homeFAQs.map((item) => (
          <Stack key={item.heading}>
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
        <Stack
          sx={{
            width: { md: 760 },
            mt: 10,
            mx: 'auto',
            border: (theme) => `1px dashed ${theme.palette.divider}`,
            p: 8,
            borderRadius: 3,
          }}
          alignItems="center"
          spacing={3}
        >
          <Typography
            variant="h3"
            color="info.darker"
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          >
            Still Have Questions?
          </Typography>
          {/* <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          >
            Please describe your case to receive the most accurate advice.
          </Typography> */}
          <Button variant="contained" color="primary" size="large" onClick={handleContactUs}>
            Contact Us
          </Button>
        </Stack>
      </Container>
    </Stack>
  );
}
