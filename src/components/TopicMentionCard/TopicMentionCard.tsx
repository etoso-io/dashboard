import React, { HTMLAttributes } from 'react';
import cls from './styles.module.css';
import cn from 'classnames';

type Props = {
  name: string;
  count: number;
  isSelected?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export function TopicMentionCard({ count, name, isSelected, className, ...props }: Props) {
  return (
    <div className={cls.tooltipWrapper}>
      <div className={cn(cls.card, className)} data-selected={isSelected} {...props}>
        {name} · {count}
      </div>
      <div className={cls.tooltip}>{name}</div>
    </div>
  );
}
