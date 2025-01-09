import React, { FC, useMemo, useState } from 'react';
import cls from './styles.module.css';
import Plot from 'react-plotly.js';
import { CountryData, GeoCoords } from './types';
import { CONTAINER_ID, DEFAULT_GEO_COORDS, DEFAULT_INDEXED_COUTRIES } from './constants';
import geojson from './world-administrative-boundaries.json';
import { MapControls } from '../MapControls/MapControls';

type Props = {
  countryData: CountryData[];
  indexedCountries?: Record<string, CountryData>;
  hasControls?: boolean;
  onCountryClick: (data: CountryData) => void;
  resetSelectedCountry: () => void;
};

const handleClickModbarBtn = (name: string) => () => {
  const btn = document.querySelector(`[data-title="${name}"]`);
  if (btn) {
    const e = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    btn.dispatchEvent(e);
  }
};

export function ChloropethMap({
  countryData,
  onCountryClick,
  resetSelectedCountry,
  indexedCountries = DEFAULT_INDEXED_COUTRIES,
  hasControls = true,
}: Props) {
  const [center, setCenter] = useState<GeoCoords>(DEFAULT_GEO_COORDS);
  const [zoom, setZoom] = useState<number>(1);

  const countryMapWithData = useMemo(() => {
    const res = { ...indexedCountries };
    for (const data of countryData) {
      res[data.countryName] = data;
    }
    return res;
  }, [countryData, indexedCountries]);

  const fullCountryListWithData = useMemo(
    () => Object.values(countryMapWithData),
    [countryMapWithData],
  );

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target as HTMLElement).classList.contains('modebar-btn')) {
      resetSelectedCountry();
    }
  };

  const onResetMap = () => {
    setCenter(DEFAULT_GEO_COORDS);
    setZoom(1);
  };

  return (
    <div className={cls.map}>
      <div id={CONTAINER_ID} className={cls.wrapper} onClick={handleContainerClick}>
        <Plot
          onRelayout={(e) => {
            if (e['map.center']) {
              setCenter(e['map.center']);
            }
            if (e['map.zoom']) {
              setZoom(e['map.zoom']);
            }
          }}
          onHover={(event) => {
            const tooltipsToRemove = document.querySelectorAll('.__customTooltip');
            for (const t of tooltipsToRemove) {
              t.remove();
            }

            const point = event.points[0];
            const container = document.getElementById('ctnr');

            if (point && container) {
              const rect = container.getBoundingClientRect();
              const x = event.event.originalEvent.clientX - rect.left - 40;
              const y = event.event.originalEvent.clientY - rect.top - 55;
              const name = point.location;
              const value = Math.round(Math.pow(10, point.z));

              const tooltip = document.createElement('div');
              tooltip.classList.add(cls.tooltip);
              tooltip.classList.add('__customTooltip');
              tooltip.innerHTML = `<span>${name}</span> ${
                value > 0 ? `<span>${value}</span>` : ''
              }`;
              tooltip.style.left = `${x}px`;

              tooltip.style.top = `${y}px`;
              container?.appendChild(tooltip);
            }
          }}
          onUnhover={() => {
            const tooltipsToRemove = document.querySelectorAll('.__customTooltip');
            for (const t of tooltipsToRemove) {
              t.remove();
            }
          }}
          config={{
            doubleClick: false,
            scrollZoom: true,
          }}
          onClick={(e) => {
            const point = e.points[0];
            if (point) {
              const data = countryMapWithData[point.location];
              if (data && data.countryId) {
                onCountryClick(data);
              }
            }
          }}
          layout={{
            showlegend: false,
            map: {
              style: 'carto-positron',
              center: center,
              zoom: zoom,
            },
            width: 1200,
            height: 788,
            margin: {
              l: 0,
              r: 0,
              t: 0,
              b: 0,
            },
          }}
          data={[
            {
              type: 'choroplethmap' as 'choropleth',
              geojson: geojson,
              featureidkey: 'properties.name',
              locationmode: 'country names',
              hoverinfo: 'none',
              showscale: false,
              colorscale: [
                [0, '#fbf8f3'],
                [0.05, '#d2cfda'],
                [0.2, '#a39db2'],
                [0.4, '#958ea6'],
                [0.6, '#736889'],
                [0.8, '#4d406a'],
                [0.9, '#3e2f5c'],
                [1, '#2E1E4F'],
              ],
              z: fullCountryListWithData.map((c) => Math.log10(c.count)),
              locations: fullCountryListWithData.map((c) => c.countryName),
              ids: fullCountryListWithData.map((c) => String(c.countryId)),
              zmin: 0,
              marker: {
                showscale: false,
                line: {
                  color: '#eddcdd',
                  width: 1,
                },
              },
            },
          ]}
        />
      </div>
      {hasControls && (
        <MapControls
          className={cls.mapControls}
          onResetMap={onResetMap}
          onZoomIn={handleClickModbarBtn('Zoom in')}
          onZoomOut={handleClickModbarBtn('Zoom out')}
        />
      )}
    </div>
  );
}

export type ChloropethMapComponent = FC<Props>;
