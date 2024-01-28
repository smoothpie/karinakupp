// Regular html <a /> tag, but that works properly with NextJS.

import React, { AnchorHTMLAttributes, forwardRef, ForwardedRef } from 'react';
import Link, { LinkProps } from 'next/link';
import pick from 'lodash/pick';

type ExtAProps = AnchorHTMLAttributes<HTMLAnchorElement>;
type AProps = ExtAProps & LinkProps;

// eslint-disable-next-line react/display-name
export const ExtA = forwardRef((props: ExtAProps, ref: ForwardedRef<HTMLAnchorElement>) => {
  return (
    <a
      ref={ref}
      {...pick(props, ['href', 'target', 'children', 'className', 'style', 'tabIndex', 'rel', 'aria-label'])}
      onClick={(e) => {
        if (props.onClick) {
          props.onClick(e);
        }
      }} />
  );
});

export const A = (props: AProps) => {
  return (
    <Link
      href={props.href || '#'}
      scroll={props.scroll}
      as={props.as}
      locale={props.locale}
      prefetch={props.prefetch}
      shallow={props.shallow}
      replace={props.replace}
      passHref={props.passHref}
    >
      {props.children}
    </Link>
  );
}

export default A;