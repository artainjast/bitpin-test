import clsx from 'clsx';
import { Box, BoxProps, ValidTags } from './Box';
import { ReactElement } from 'react';

type Props<T extends ValidTags = 'p'> = {
  align?: 'text-left' | 'text-center' | 'text-right';
} & BoxProps<T> &
  JSX.IntrinsicElements[T];

export function Typography<T extends ValidTags = 'p'>({
  color,
  align,
  className,
  tag,
  children,
  ...props
}: Props<T>): ReactElement {
  const boxTag = tag || ('p' as T);
  return (
    <Box<T>
      tag={boxTag}
      className={clsx(align, className)}
      {...props}
    >
      {children}
    </Box>
  );
}
