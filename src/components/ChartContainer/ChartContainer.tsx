import React, { FC, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import cls from './styles.module.css';
import cn from 'classnames';

type Props = {
  name: string;
  top?: number;
  minHeight?: number;
  showEmptyPlaceholder?: boolean;
  Placeholder: ReactNode;
} & PropsWithChildren &
  HTMLAttributes<HTMLDivElement>;

export function ChartContainer({
  name,
  top,
  children,
  minHeight,
  showEmptyPlaceholder = false,
  Placeholder,
  className,
  ...props
}: Props) {
  return (
    <div
      className={cn(cls.container, className)}
      style={{ minHeight: `${minHeight}px` }}
      {...props}
    >
      <div className={cls.heading}>
        <h5>{name}</h5>
        {top && <span>&nbsp;· Top {top}</span>}
      </div>
      {!showEmptyPlaceholder ? children : Placeholder}
    </div>
  );
}

export type ChartContainerComponent = FC<Props>;
