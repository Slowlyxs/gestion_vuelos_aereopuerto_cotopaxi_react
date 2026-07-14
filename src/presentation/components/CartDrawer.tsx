// src/presentation/components/CartDrawer.tsx
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, X } from 'lucide-react'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/presentation/components/ui/sheet'
import { Button } from '@/presentation/components/ui/button'
import { Separator } from '@/presentation/components/ui/separator'
import { ScrollArea } from '@/presentation/components/ui/scroll-area'

import { useCartStore } from '@/presentation/store/cart.store'
import { formatPrice } from '@/presentation/utils/formatters'

export function CartDrawer() {
  const navigate = useNavigate()

  const isOpen = useCartStore((s) => s.isOpen)
  const closeCart = useCartStore((s) => s.closeCart)
  const items = useCartStore((s) => s.items)
  const itemCount = useCartStore((s) => s.itemCount())
  const subtotal = useCartStore((s) => s.subtotal())
  const isEmpty = useCartStore((s) => s.isEmpty())

  function handleGoToCart() {
    closeCart()
    navigate('/cart')
  }

  function handleCheckout() {
    closeCart()
    navigate('/orders/new')
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-sm">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Carrito{' '}
            {itemCount > 0 && (
              <span className="text-sm font-normal text-muted-foreground">({itemCount})</span>
            )}
          </SheetTitle>
        </SheetHeader>

        {isEmpty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">Tu carrito está vacío.</p>
            <Button variant="outline" onClick={closeCart} asChild>
              <Link to="/catalog" onClick={closeCart}>
                Ver catálogo
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Lista de ítems con scroll */}
            <ScrollArea className="flex-1 py-4">
              <ul className="space-y-4 pr-4">
                {items.map((item) => (
                  <li key={item.product.id} className="flex gap-3">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
                      {item.product.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <ShoppingCart className="h-6 w-6 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col justify-between text-sm">
                      <span className="line-clamp-2 font-medium leading-snug">
                        {item.product.name}
                      </span>
                      <div className="flex items-center justify-between text-muted-foreground">
                        <span>
                          {item.quantity} × {formatPrice(item.product.price)}
                        </span>
                        <span className="font-semibold text-foreground">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>

            <Separator />

            <div className="flex justify-between py-3 text-sm font-semibold">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <SheetFooter className="flex-col gap-2 sm:flex-col">
              <Button className="w-full" onClick={handleCheckout}>
                Ir al pago
              </Button>
              <Button variant="outline" className="w-full" onClick={handleGoToCart}>
                Ver carrito completo
              </Button>
              <Button variant="ghost" className="w-full gap-2" onClick={closeCart}>
                <X className="h-4 w-4" />
                Cerrar
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}