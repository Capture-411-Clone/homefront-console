// @mui
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// components
import { Stack } from '@mui/system';
import Iconify from 'src/components/iconify';
import { Box, Divider } from '@mui/material';
import { FAQType } from './data/faqs';

// ----------------------------------------------------------------------

type FaqsListProps = {
  FAQs: FAQType[];
};

export default function FaqsList(porps: FaqsListProps) {
  const { FAQs } = porps;

  return (
    <Box minHeight={700}>
      {FAQs.map((accordion) => (
        <Stack>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {accordion.category.label}
          </Typography>
          {accordion.items.length ? (
            accordion.items.map((item) => (
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
            ))
          ) : (
            <Typography sx={{ textAlign: 'center' }}>No FAQs found</Typography>
          )}
          <Divider color="primary" sx={{ mb: 2, mt: 1 }} />
        </Stack>
      ))}
    </Box>
  );
}
