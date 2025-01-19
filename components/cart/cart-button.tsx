'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/use-cart-store';

export function CartButton() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total);

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative"
      aria-label="Shopping Cart"
    >
      <ShoppingCart className="h-5 w-5" />
      {items.length > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
          {items.length}
        </span>
      )}
    </Button>
  );
} 