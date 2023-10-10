import classNames from 'classnames';
import { useEffect } from 'react';
import styles from './GradientBackground.module.css';
import cn from 'classnames';

export function GradientBackground({ variant, className }: { variant: 'large' | 'small'; className?: string }) {
    const classes = classNames(
        {
            [styles.colorBackground]: variant === 'large',
            [styles.colorBackgroundBottom]: variant === 'small',
        },
        className
    );

    return <div className={cn(classes, styles.unblur, styles.rainbox_bg)} />;
}