import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import cls from './styles.module.css';
import cn from 'classnames';

type Props = PropsWithChildren & HTMLAttributes<HTMLDivElement>;

export const GridContainer = ({ children, className, ...props }: Props) => (
  <div className={cn(cls.container, className)} {...props}>
    {children}
  </div>
);

export type GridContainerComponent = FC<Props>;
