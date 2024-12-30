import { sortBy } from '@/utils/sortBy';
import { IndustryData } from './types';
import { CSSProperties, useCallback, useMemo } from 'react';
import { PlotHoverEvent, PlotMouseEvent } from 'plotly.js';
import { CONTAINER_ID, CUSTOM_LABEL_WIDTH } from './constants';
import cls from './styles.module.css';
import Plot from 'react-plotly.js';

type Props = {
  industryData: IndustryData[];
  onBarClick: (data: IndustryData) => void;
  shownIndustries?: number;
};

const appendLabels = (node: HTMLElement) => {
  const customLabelsToRemove = node.querySelectorAll('.__customIndustryLabel');
  for (const el of customLabelsToRemove) {
    el.remove();
  }

  const ticks = Array.from(node.querySelectorAll('.ytick'));
  for (const t of ticks) {
    const svgTextNode = t.childNodes[0] as Element;
    const p = document.createElement('p');

    p.classList.add('__customIndustryLabel');
    p.classList.add(cls.labelText);
    p.classList.add(cls.hidden);

    const fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');

    fo.setAttribute('width', String(CUSTOM_LABEL_WIDTH));
    fo.setAttribute('height', '28');
    fo.setAttribute('transform', svgTextNode.getAttribute('transform') ?? '');

    const labelValue = svgTextNode.getAttribute('data-unformatted') ?? '';
    p.setAttribute('data-unformatted', labelValue);

    fo.appendChild(p);
    t.appendChild(fo);
    const text = document.createTextNode(labelValue);
    p.appendChild(text);
    const shiftP = p.clientHeight > 28 ? 28 : p.clientHeight;

    fo.setAttribute('y', `-${shiftP / 2}`);
  }
};

const getTruncatedText = (labelNode: Element, lineClamp: number) => {
  const textNode = labelNode.childNodes[0];
  const range = document.createRange();
  const lines = [];

  range.setStart(textNode, 0);

  let prevBottom = range.getBoundingClientRect().bottom;
  const textContent = textNode.textContent ?? '';
  let current = 1;
  let lastFound = 0;
  let bottom = 0;

  while (current <= textContent.length) {
    range.setStart(textNode, current);
    if (current < textContent.length - 1) {
      range.setEnd(textNode, current + 1);
    }

    bottom = range.getBoundingClientRect().bottom;
    if (bottom > prevBottom) {
      lines.push(textContent.substring(current, lastFound));
      prevBottom = bottom;
      lastFound = current;
    }

    current++;
  }

  lines.push(textContent.substring(lastFound));
  const firstTwoLinesAsText =
    lines
      .slice(0, lineClamp)
      .join('')
      .slice(0, -lineClamp - 1) + '...';

  return firstTwoLinesAsText;
};

const appendFakeLabel = (node: HTMLElement) => {
  const customLabelsToRemove = document.querySelectorAll('.__customFakeIndustryLabel.tooltipBase');
  for (const el of customLabelsToRemove) {
    el.remove();
  }
  const plotContainer = document.getElementById(CONTAINER_ID);
  const customLabels = node.querySelectorAll('.__customIndustryLabel');
  const lastCustomLabel = customLabels[customLabels.length - 1];
  const lastLabelBox = lastCustomLabel.getBoundingClientRect();
  let topNegativeOffset = lastLabelBox?.top ?? 0;
  if (lastLabelBox.height < 28) {
    topNegativeOffset -= 6;
  }

  if (plotContainer) {
    for (const l of customLabels) {
      const labelBox = l.getBoundingClientRect();
      const unformattedTextContent = l.getAttribute('data-unformatted') ?? '';
      const textContentForP =
        labelBox.height > 28 ? getTruncatedText(l, 2) : unformattedTextContent;
      const fakeP = document.createElement('p');
      const fakePContainer = document.createElement('div');
      fakePContainer.classList.add('__customFakeIndustryLabel');
      fakePContainer.classList.add(cls.tooltipBase);
      fakePContainer.classList.add(cls.labelText);
      fakePContainer.appendChild(fakeP);

      plotContainer.appendChild(fakePContainer);
      fakeP.appendChild(document.createTextNode(textContentForP));

      fakePContainer.style.top = `${labelBox.top + 2 - topNegativeOffset}px`;

      const labelTooltip = document.createElement('div');
      labelTooltip.classList.add(cls.labelTooltip);
      labelTooltip.appendChild(document.createTextNode(unformattedTextContent));
      fakePContainer.appendChild(labelTooltip);
    }
  }
};

export function IndustriesChart({ industryData, onBarClick, shownIndustries = 10 }: Props) {
  const sortedIndustryData: IndustryData[] = useMemo(
    () => sortBy(industryData, 'count'),
    [industryData],
  );
  const names = useMemo(
    () => sortedIndustryData.map(({ industryName }) => industryName),
    [sortedIndustryData],
  );
  const counts = useMemo(() => sortedIndustryData.map(({ count }) => count), [sortedIndustryData]);

  const getOgData = useCallback(
    (e: PlotHoverEvent | PlotMouseEvent) => {
      const point = e.points[0];

      if (point) {
        const count = point.value as number;
        const industry = point.label as string;
        return sortedIndustryData.find((i) => i.count === count && i.industryName === industry);
      }
    },
    [sortedIndustryData],
  );

  const height = useMemo(() => {
    return 180 + 451 * (counts.length / shownIndustries);
  }, [counts]);

  const width = useMemo(() => {
    return 0.79;
  }, [shownIndustries]);

  return (
    <div
      className={cls.container}
      id={CONTAINER_ID}
      style={{ '--custom-label-width': `${CUSTOM_LABEL_WIDTH}px` } as CSSProperties}
    >
      <Plot
        className={cls.plot}
        onClick={(e) => {
          const ogData = getOgData(e);
          if (ogData) {
            onBarClick(ogData);
          }
        }}
        onInitialized={(_, node) => {
          appendLabels(node);
          appendFakeLabel(node);
        }}
        onUpdate={(_, node) => {
          appendLabels(node);
          appendFakeLabel(node);
        }}
        config={{
          displayModeBar: false,
        }}
        layout={{
          width: 368,
          height,
          plot_bgcolor: 'transparent',
          paper_bgcolor: 'transparent',
          barcornerradius: 4,
          barmode: 'group',
          margin: {
            l: 112,
          },
          showlegend: false,
          xaxis: {
            visible: false,
            fixedrange: true,
          },
          yaxis: {
            showgrid: false,
            fixedrange: true,
            dtick: 1,
          },
        }}
        data={[
          {
            textangle: 0,
            hoverinfo: 'none',
            marker: {
              color: '#11B3BA',
            },
            type: 'bar',
            orientation: 'h',
            width,
            x: counts,
            base: 0,
            y: names,
            text: counts.map((c) => String(c)),
            insidetextanchor: 'start',
            outsidetextfont: {
              color: '#2a204ds',
              size: 12,
              family: 'Inter',
            },
            insidetextfont: {
              color: '#FFFFFF',
              size: 12,
              family: 'Inter',
            },
          },
        ]}
      />
    </div>
  );
}
