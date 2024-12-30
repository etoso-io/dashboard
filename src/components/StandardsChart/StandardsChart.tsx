import { PlotHoverEvent, PlotMouseEvent } from 'plotly.js';
import { StandardData, StandardWithYear } from './types';
import { useMemo, useCallback, useRef, useState, CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import Plot from 'react-plotly.js';
import cls from './styles.module.css';

type Props = {
  standardsData: StandardWithYear[];
  onBarClick: (data: StandardData) => void;
  selectedIds: number[];
};

const barColors: Record<string, string> = {
  GRI: '#6C3683',
  TCFD: '#11B3BA',
  SDG: '#0B7074',
  SASB: '#003F42',
};

const otherColor = '#442C74';

const removeTransformedLabels = (node: HTMLElement) => {
  const plotLabelsInside = node.querySelectorAll('.overplot .bartext.bartext-inside');
  for (const label of plotLabelsInside) {
    const transform = label.getAttribute('transform');
    if (transform?.includes('rotate') || transform?.includes('scale')) {
      label.remove();
    }
  }

  const plotLabelsOutside = node.querySelectorAll('.overplot .bartext.bartext-outside');
  for (const label of plotLabelsOutside) {
    label.remove();
  }
};

const appendLabels = (node: HTMLElement) => {
  const customLabelsToRemove = node.querySelectorAll('.__customStandardLabel');
  for (const el of customLabelsToRemove) {
    el.remove();
  }

  const ticks = Array.from(node.querySelectorAll('.ytick'));
  for (const t of ticks) {
    const svgTextNode = t.childNodes[0] as Element;
    const p = document.createElement('p');

    p.classList.add('__customStandardLabel');
    p.classList.add(cls.label);

    const labelMaxWidth = 102;
    const fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');

    fo.setAttribute('width', String(labelMaxWidth));
    fo.setAttribute('height', '34');
    fo.setAttribute('transform', svgTextNode.getAttribute('transform') ?? '');

    const text = document.createTextNode(svgTextNode.getAttribute('data-unformatted') as string);

    p.appendChild(text);
    fo.appendChild(p);
    t.appendChild(fo);
    fo.setAttribute('y', `-${p.clientHeight / 2}`);
  }
};

export function StandardsChart({ onBarClick, selectedIds, standardsData }: Props) {
  const standardsByYear: Record<string, StandardData[]> = useMemo(() => {
    return standardsData.reduce((acc, data) => ({ ...acc, [data.year]: data.values }), {});
  }, [standardsData]);

  const getOgData = useCallback(
    (e: PlotHoverEvent | PlotMouseEvent) => {
      const point = e.points[0];
      if (point) {
        const standard = point.data.name;
        const year = point.label as string;
        const data = standardsByYear[year].find((s) => s.standardName === standard);
        return data;
      }
    },
    [standardsByYear],
  );

  const yearlyTotal: Record<string, number> = Object.entries(standardsByYear).reduce(
    (acc, [year, values]) => {
      acc[year] = values.reduce((sum, val) => sum + val.count, 0);
      return acc;
    },
    {} as Record<string, number>,
  );

  const flatList = Object.keys(standardsByYear).flatMap((year) => {
    return standardsByYear[year].map((d) => ({ year, ...d }));
  });

  const standards = useMemo(() => {
    const res: Record<string, number> = {};
    for (const l of flatList) {
      if (!res[l.standardName]) {
        res[l.standardName] = l.standardId;
      }
    }

    return res;
  }, [flatList]);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [tooltipData, setTooltipData] = useState<{
    name: string;
    color: string;
    count: number;
    show: boolean;
    x: number;
    y: number;
  }>({ show: false, name: '', x: 0, y: 0, color: '', count: 0 });

  return (
    <div ref={wrapperRef}>
      {tooltipData.show &&
        createPortal(
          <div
            className={cls.tooltip}
            style={{ top: `${tooltipData.y - 20}px`, left: `${tooltipData.x}px` }}
          >
            <div
              className={cls.tooltipStandardData}
              style={{ '--background-color': tooltipData.color ?? otherColor } as CSSProperties}
            >
              <div></div> <p>{tooltipData.name}</p>
            </div>
            <span>
              {tooltipData.count} Report{tooltipData.count > 1 ? 's' : ''}
            </span>
          </div>,
          document.body,
        )}
      <Plot
        className={cls.plot}
        config={{
          displayModeBar: false,
        }}
        onClick={(e) => {
          const ogData = getOgData(e);
          if (ogData) {
            onBarClick(ogData);
          }
        }}
        onHover={(e) => {
          const ogData = getOgData(e);
          if (ogData && wrapperRef.current) {
            const mouseEvent = e.event as unknown as MouseEvent;
            setTooltipData({
              show: true,
              color: barColors[ogData.standardName],
              count: ogData.count,
              name: ogData.standardName,
              x: mouseEvent.clientX + window.scrollX,
              y: mouseEvent.clientY + window.scrollY,
            });
          }
        }}
        onUnhover={() => {
          setTooltipData({ color: '', count: 0, name: '', show: false, x: 0, y: 0 });
        }}
        onInitialized={(_, node) => {
          appendLabels(node);
          removeTransformedLabels(node);
        }}
        onUpdate={(_, node) => {
          appendLabels(node);
          removeTransformedLabels(node);
        }}
        layout={{
          width: 483,
          height:
            180 +
            230 *
              (Object.keys(standardsByYear).length < 4
                ? Object.keys(standardsByYear).length / 4
                : 1),
          barcornerradius: 4,
          plot_bgcolor: 'transparent',
          paper_bgcolor: 'transparent',
          showlegend: false,
          barmode: 'stack',
          margin: {
            l: 112,
          },
          xaxis: {
            visible: false,
            fixedrange: true,
          },
          yaxis: {
            showgrid: false,
            fixedrange: true,
            tickmode: 'array',
            type: 'category',
            tickvals: [...new Set(flatList.map((l) => l.year))],
          },
        }}
        data={Object.keys(standards).map((s) => ({
          y: flatList.map((l) => l.year),
          x: flatList.map((l) => (s === l.standardName ? l.count / yearlyTotal[l.year] : 0)),
          insidetextfont: {
            color: '#FFFFFF',
            size: 12,
            family: 'Inter',
          },
          hoverinfo: 'none',
          type: 'bar',
          orientation: 'h',
          name: s,
          text: s,
          insidetextanchor: 'start',
          marker: {
            color: barColors[s] ?? otherColor,
            line: {
              color: 'white',
              width: 2,
            },
            opacity: !selectedIds.length || selectedIds.includes(standards[s]) ? 1 : 0.3,
          },
        }))}
      />
    </div>
  );
}
