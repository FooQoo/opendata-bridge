'use client';

import { Divider } from '@nextui-org/react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ ...props }, ref) => <Divider />);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
