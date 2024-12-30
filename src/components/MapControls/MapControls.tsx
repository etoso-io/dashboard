import { HTMLAttributes } from 'react';
import Home from '@/components/MapControls/assets/map-home.svg?react';
import Plus from './assets/map-zoom-in.svg?react';
import Minus from './assets/map-zoom-out.svg?react';
import cls from './styles.module.css';
import cn from 'classnames';

type Props = {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetMap: () => void;
} & HTMLAttributes<HTMLDivElement>;

export function MapControls({ onResetMap, onZoomIn, onZoomOut, className, ...props }: Props) {
  return (
    <div className={cn(cls.controls, className)} {...props}>
      <div className={cls.buttons}>
        <button className={cn(cls.controlBtn, cls.left)} type={'button'} onClick={onZoomOut}>
          <Minus />
        </button>
        <button className={cn(cls.controlBtn, cls.right)} type={'button'} onClick={onZoomIn}>
          <Plus />
        </button>
      </div>
      <button className={cls.controlBtn} type={'button'} onClick={onResetMap}>
        <Home />
      </button>
    </div>
  );
}
