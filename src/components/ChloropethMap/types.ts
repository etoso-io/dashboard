export type CountryData = {
  countryName: string;
  countryId: number;
  count: number;
};

export type GeoCoords = {
  lat: number;
  lon: number;
};

export type ModbarButtons = {
  zoomIn: Element;
  zoomOut: Element;
  resetView: Element;
};

export type IndexedCountries = Record<string, CountryData>;
