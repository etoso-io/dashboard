import { ChloropethMap } from '../components/ChloropethMap/ChloropethMap';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Raw/ChloropethMap',
  component: ChloropethMap,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    onCountryClick: fn(),
    resetSelectedCountry: fn(),
    countryData: [
      {
        countryName: 'United States',
        countryId: 14,
        count: 3304,
      },
      {
        countryName: 'United Kingdom',
        countryId: 3,
        count: 1099,
      },
      {
        countryName: 'Canada',
        countryId: 15,
        count: 444,
      },
      {
        countryName: 'Switzerland',
        countryId: 13,
        count: 306,
      },
      {
        countryName: 'Finland',
        countryId: 93,
        count: 289,
      },
      {
        countryName: 'Sweden',
        countryId: 2,
        count: 287,
      },
      {
        countryName: 'Italy',
        countryId: 21,
        count: 286,
      },
      {
        countryName: 'Germany',
        countryId: 4,
        count: 267,
      },
      {
        countryName: 'Spain',
        countryId: 9,
        count: 208,
      },
      {
        countryName: 'Denmark',
        countryId: 10,
        count: 205,
      },
      {
        countryName: 'France',
        countryId: 16,
        count: 200,
      },
      {
        countryName: 'Netherlands',
        countryId: 1,
        count: 195,
      },
      {
        countryName: 'Austria',
        countryId: 7,
        count: 138,
      },
      {
        countryName: 'Australia',
        countryId: 25,
        count: 113,
      },
      {
        countryName: 'Belgium',
        countryId: 44,
        count: 109,
      },
      {
        countryName: 'South Korea',
        countryId: 20,
        count: 106,
      },
      {
        countryName: 'Norway',
        countryId: 17,
        count: 92,
      },
      {
        countryName: 'Japan',
        countryId: 22,
        count: 88,
      },
      {
        countryName: 'Greece',
        countryId: 5,
        count: 77,
      },
      {
        countryName: 'Ireland',
        countryId: 24,
        count: 70,
      },
      {
        countryName: 'Taiwan',
        countryId: 214,
        count: 70,
      },
      {
        countryName: 'Brazil',
        countryId: 18,
        count: 64,
      },
      {
        countryName: 'China',
        countryId: 65,
        count: 61,
      },
      {
        countryName: 'Turkey',
        countryId: 8,
        count: 56,
      },
      {
        countryName: 'Chile',
        countryId: 64,
        count: 56,
      },
      {
        countryName: 'Mexico',
        countryId: 151,
        count: 55,
      },
      {
        countryName: 'Czech Republic',
        countryId: 78,
        count: 37,
      },
      {
        countryName: 'Portugal',
        countryId: 12,
        count: 35,
      },
      {
        countryName: 'Luxembourg',
        countryId: 19,
        count: 34,
      },
      {
        countryName: 'Singapore',
        countryId: 202,
        count: 31,
      },
      {
        countryName: 'India',
        countryId: 6,
        count: 30,
      },
      {
        countryName: 'Israel',
        countryId: 120,
        count: 27,
      },
      {
        countryName: 'Malaysia',
        countryId: 142,
        count: 22,
      },
      {
        countryName: 'Hong Kong',
        countryId: 114,
        count: 22,
      },
      {
        countryName: 'Russia',
        countryId: 187,
        count: 21,
      },
      {
        countryName: 'Philippines',
        countryId: 181,
        count: 21,
      },
      {
        countryName: 'South Africa',
        countryId: 23,
        count: 19,
      },
      {
        countryName: 'Estonia',
        countryId: 88,
        count: 16,
      },
      {
        countryName: 'Argentina',
        countryId: 35,
        count: 15,
      },
      {
        countryName: 'Indonesia',
        countryId: 117,
        count: 15,
      },
      {
        countryName: 'Poland',
        countryId: 11,
        count: 15,
      },
      {
        countryName: 'Colombia',
        countryId: 68,
        count: 13,
      },
      {
        countryName: 'Cyprus',
        countryId: 77,
        count: 11,
      },
      {
        countryName: 'Bermuda',
        countryId: 47,
        count: 9,
      },
      {
        countryName: 'Sri Lanka',
        countryId: 208,
        count: 9,
      },
      {
        countryName: 'Lithuania',
        countryId: 137,
        count: 9,
      },
      {
        countryName: 'Thailand',
        countryId: 217,
        count: 9,
      },
      {
        countryName: 'Slovakia',
        countryId: 203,
        count: 8,
      },
      {
        countryName: 'Hungary',
        countryId: 115,
        count: 7,
      },
      {
        countryName: 'Latvia',
        countryId: 131,
        count: 6,
      },
      {
        countryName: 'Monaco',
        countryId: 154,
        count: 6,
      },
      {
        countryName: 'United Arab Emirates',
        countryId: 228,
        count: 6,
      },
      {
        countryName: 'Kazakhstan',
        countryId: 123,
        count: 5,
      },
      {
        countryName: 'Slovenia',
        countryId: 204,
        count: 4,
      },
      {
        countryName: 'Peru',
        countryId: 180,
        count: 4,
      },
      {
        countryName: 'Egypt',
        countryId: 84,
        count: 4,
      },
      {
        countryName: 'Qatar',
        countryId: 184,
        count: 3,
      },
      {
        countryName: 'Malta',
        countryId: 145,
        count: 3,
      },
      {
        countryName: 'Liechtenstein',
        countryId: 136,
        count: 3,
      },
      {
        countryName: 'New Zealand',
        countryId: 166,
        count: 3,
      },
      {
        countryName: 'Puerto Rico',
        countryId: 183,
        count: 3,
      },
      {
        countryName: 'Bulgaria',
        countryId: 55,
        count: 3,
      },
      {
        countryName: 'Brunei',
        countryId: 54,
        count: 3,
      },
      {
        countryName: 'Isle Of Man',
        countryId: 242,
        count: 2,
      },
      {
        countryName: 'Kuwait',
        countryId: 128,
        count: 2,
      },
      {
        countryName: 'Bangladesh',
        countryId: 41,
        count: 1,
      },
      {
        countryName: 'Ecuador',
        countryId: 83,
        count: 1,
      },
      {
        countryName: 'Trinidad & Tobago',
        countryId: 221,
        count: 1,
      },
      {
        countryName: 'Jersey',
        countryId: 243,
        count: 1,
      },
      {
        countryName: 'Panama',
        countryId: 177,
        count: 1,
      },
      {
        countryName: 'Uruguay',
        countryId: 230,
        count: 1,
      },
      {
        countryName: 'Bahrain',
        countryId: 40,
        count: 1,
      },
      {
        countryName: 'Romania',
        countryId: 186,
        count: 1,
      },
      {
        countryName: 'Iceland',
        countryId: 116,
        count: 1,
      },
    ],
  },
} satisfies Meta<typeof ChloropethMap>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Raw: Story = {
  args: {},
};
