// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as Plotly from 'plotly.js';

declare module 'plotly.js' {
  interface PlotData {
    geojson: unknown;
    featureidkey: string;
    insidetextfont?: {
      color: string;
      size: number;
      family: string;
    };
    outsidetextfont?: {
      color: string;
      size: number;
      family: string;
    };
    base?: number;
  }

  interface PlotHoverEvent {
    event: {
      originalEvent: MouseEvent;
    };
  }

  interface PlotRelayoutEvent {
    event: {
      originalEvent: MouseEvent;
    };
    'map.center'?: { lat: number; lon: number };
    'map.zoom'?: number;
  }

  interface Layout {
    barcornerradius?: number;
    map: {
      center: { lat: number; lon: number };
      zoom: number;
      style: string;
    };
  }

  interface PlotDatum {
    value: number;
    label: string;
    z: number;
    id: string | number;
    location: string;
  }
}
