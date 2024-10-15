'use client';

// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
//
import { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import FaqsHero from '../faqs-hero';
import FaqsList from '../faqs-list';
import FaqsCategory from '../faqs-category';

import { FAQs, FAQType } from '../data/faqs';
// ----------------------------------------------------------------------

export default function FaqsView() {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const [filteredFAQs, setFilteredFAQs] = useState<FAQType[]>(FAQs);

  const categories = FAQs.map((faq: FAQType) => faq.category);

  const handleSearch = (text: string) => {
    console.log(text);
    setSearchText(text);
  };

  const handleSelectCategory = (label: string) => {
    if (selectedCategory === label) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(label);
    }
  };

  const clearFilters = () => {
    setSearchText('');
    setSelectedCategory('');
  };

  useEffect(() => {
    let _faqs = FAQs.filter((faq: FAQType) => {
      if (selectedCategory) {
        return faq.category.label === selectedCategory;
      }

      return true;
    });

    _faqs = _faqs.map((faq: FAQType) => {
      const _items = faq.items.filter((item) => {
        if (searchText) {
          return (
            item.heading.toLowerCase().includes(searchText.toLowerCase()) ||
            item.detail.toLowerCase().includes(searchText.toLowerCase())
          );
        }

        return true;
      });

      return {
        ...faq,
        items: _items,
      };
    });

    // filter categories with no items
    _faqs = _faqs.filter((faq: FAQType) => faq.items.length > 0);

    setFilteredFAQs(_faqs);
  }, [selectedCategory, searchText]);

  return (
    <>
      <FaqsHero searchHandler={handleSearch} searchText={searchText} />

      <Container
        sx={{
          pb: 10,
          pt: 2,
          position: 'relative',
        }}
      >
        <FaqsCategory
          categories={categories}
          categorySelectHandler={handleSelectCategory}
          selectedCategory={selectedCategory}
        />

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography
            variant="h3"
            sx={{
              my: { xs: 5, md: 10 },
            }}
          >
            Frequently asked questions
          </Typography>
          {(searchText || selectedCategory) && (
            <Button
              sx={{ width: 200 }}
              size="large"
              color="primary"
              variant="outlined"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          )}
        </Stack>
        <FaqsList FAQs={filteredFAQs} />
      </Container>
    </>
  );
}
