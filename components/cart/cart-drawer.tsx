'use client';

import * as React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { CartButton } from '@/components/cart/cart-button';
import { useCartStore } from '@/store/use-cart-store';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/components/cart/cart-item';
import { ScrollArea } from '@/components/ui/scroll-area';

export function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <CartButton />
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-1">
          <SheetTitle>Cart ({items.length})</SheetTitle>
        </SheetHeader>
        {items.length > 0 ? (
          <>
            <ScrollArea className="flex-1 pr-6">
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            </ScrollArea>
            <div className="space-y-4 pr-6">
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <Button className="w-full" onClick={() => setIsOpen(false)}>
                Continue to Checkout
              </Button>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-2">
            <span className="text-lg font-medium">Your cart is empty</span>
            <Button
              variant="link"
              className="text-sm text-muted-foreground"
              onClick={() => setIsOpen(false)}
            >
              Continue shopping
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
} 