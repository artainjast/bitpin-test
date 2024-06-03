import { ComponentProps, ElementType, ReactElement } from 'react';

export type ValidTags = keyof JSX.IntrinsicElements;

export interface BoxProps<T extends ValidTags = 'div'> {
  tag?: T;
  customRef?: ComponentProps<T>['ref'];
  ref?: never;
}

export function Box<T extends ValidTags = 'div'>({
  className,
  tag,
  customRef,
  ...props
}: BoxProps<T> & JSX.IntrinsicElements[T]): ReactElement {
  const Tag = tag as ElementType;
    return <Tag {...props} ref={customRef} className={className}></Tag>;
}
