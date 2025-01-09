import { StandardsChart } from '../components/StandardsChart/StandardsChart';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Raw/StandardsChart',
  component: StandardsChart,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    onBarClick: fn(),
    selectedIds: [],
    standardsData: [
      {
        year: 2024,
        values: [
          {
            standardName: 'GRI',
            standardFullName: 'Global Reporting Initiative',
            standardId: 3,
            count: 16,
          },
          {
            standardName: 'TCFD',
            standardFullName: 'Task Force on Climate-related Financial Disclosures',
            standardId: 4,
            count: 11,
          },
          {
            standardName: 'SASB',
            standardFullName: 'Sustainability Accounting Standards Board',
            standardId: 20,
            count: 10,
          },
          {
            standardName: 'SDG',
            standardFullName: 'Sustainable Development Goals',
            standardId: 22,
            count: 7,
          },
          {
            standardName: 'ISSB',
            standardFullName: 'International Sustainability Standards Board',
            standardId: 34,
            count: 6,
          },
          {
            standardName: 'SECR',
            standardFullName: 'Streamlined Energy and Carbon Reporting',
            standardId: 8,
            count: 4,
          },
          {
            standardName: 'EUTax',
            standardFullName: 'EU Taxonomy',
            standardId: 25,
            count: 3,
          },
          {
            standardName: 'TCA',
            standardFullName: 'Companies Act 2006',
            standardId: 6,
            count: 3,
          },
          {
            standardName: 'ESRS',
            standardFullName: 'European Sustainability Reporting Standards',
            standardId: 33,
            count: 2,
          },
          {
            standardName: 'TNFD',
            standardFullName: 'The Taskforce on Nature-related Financial Disclosures',
            standardId: 26,
            count: 2,
          },
          {
            standardName: 'MSA',
            standardFullName: 'Modern Slavery Act',
            standardId: 5,
            count: 1,
          },
        ],
      },
      {
        year: 2023,
        values: [
          {
            standardName: 'SDG',
            standardFullName: 'Sustainable Development Goals',
            standardId: 22,
            count: 1058,
          },
          {
            standardName: 'TCFD',
            standardFullName: 'Task Force on Climate-related Financial Disclosures',
            standardId: 4,
            count: 1030,
          },
          {
            standardName: 'GRI',
            standardFullName: 'Global Reporting Initiative',
            standardId: 3,
            count: 1015,
          },
          {
            standardName: 'SASB',
            standardFullName: 'Sustainability Accounting Standards Board',
            standardId: 20,
            count: 933,
          },
          {
            standardName: 'ISSB',
            standardFullName: 'International Sustainability Standards Board',
            standardId: 34,
            count: 667,
          },
          {
            standardName: 'EUTax',
            standardFullName: 'EU Taxonomy',
            standardId: 25,
            count: 341,
          },
          {
            standardName: 'MSA',
            standardFullName: 'Modern Slavery Act',
            standardId: 5,
            count: 253,
          },
          {
            standardName: 'ESRS',
            standardFullName: 'European Sustainability Reporting Standards',
            standardId: 33,
            count: 229,
          },
          {
            standardName: 'SECR',
            standardFullName: 'Streamlined Energy and Carbon Reporting',
            standardId: 8,
            count: 176,
          },
          {
            standardName: 'TNFD',
            standardFullName: 'The Taskforce on Nature-related Financial Disclosures',
            standardId: 26,
            count: 162,
          },
          {
            standardName: 'TCA',
            standardFullName: 'Companies Act 2006',
            standardId: 6,
            count: 153,
          },
        ],
      },
      {
        year: 2022,
        values: [
          {
            standardName: 'SASB',
            standardFullName: 'Sustainability Accounting Standards Board',
            standardId: 20,
            count: 1864,
          },
          {
            standardName: 'GRI',
            standardFullName: 'Global Reporting Initiative',
            standardId: 3,
            count: 1812,
          },
          {
            standardName: 'SDG',
            standardFullName: 'Sustainable Development Goals',
            standardId: 22,
            count: 1744,
          },
          {
            standardName: 'TCFD',
            standardFullName: 'Task Force on Climate-related Financial Disclosures',
            standardId: 4,
            count: 1690,
          },
          {
            standardName: 'ISSB',
            standardFullName: 'International Sustainability Standards Board',
            standardId: 34,
            count: 808,
          },
          {
            standardName: 'EUTax',
            standardFullName: 'EU Taxonomy',
            standardId: 25,
            count: 445,
          },
          {
            standardName: 'MSA',
            standardFullName: 'Modern Slavery Act',
            standardId: 5,
            count: 295,
          },
          {
            standardName: 'SECR',
            standardFullName: 'Streamlined Energy and Carbon Reporting',
            standardId: 8,
            count: 175,
          },
          {
            standardName: 'TNFD',
            standardFullName: 'The Taskforce on Nature-related Financial Disclosures',
            standardId: 26,
            count: 145,
          },
          {
            standardName: 'TCA',
            standardFullName: 'Companies Act 2006',
            standardId: 6,
            count: 144,
          },
          {
            standardName: 'ESRS',
            standardFullName: 'European Sustainability Reporting Standards',
            standardId: 33,
            count: 103,
          },
        ],
      },
      {
        year: 2021,
        values: [
          {
            standardName: 'SASB',
            standardFullName: 'Sustainability Accounting Standards Board',
            standardId: 20,
            count: 399,
          },
          {
            standardName: 'SDG',
            standardFullName: 'Sustainable Development Goals',
            standardId: 22,
            count: 382,
          },
          {
            standardName: 'GRI',
            standardFullName: 'Global Reporting Initiative',
            standardId: 3,
            count: 369,
          },
          {
            standardName: 'TCFD',
            standardFullName: 'Task Force on Climate-related Financial Disclosures',
            standardId: 4,
            count: 334,
          },
          {
            standardName: 'EUTax',
            standardFullName: 'EU Taxonomy',
            standardId: 25,
            count: 2,
          },
          {
            standardName: 'MSA',
            standardFullName: 'Modern Slavery Act',
            standardId: 5,
            count: 2,
          },
          {
            standardName: 'SECR',
            standardFullName: 'Streamlined Energy and Carbon Reporting',
            standardId: 8,
            count: 1,
          },
          {
            standardName: 'ISSB',
            standardFullName: 'International Sustainability Standards Board',
            standardId: 34,
            count: 1,
          },
        ],
      },
    ],
  },
} satisfies Meta<typeof StandardsChart>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Raw: Story = {
  args: {},
};
