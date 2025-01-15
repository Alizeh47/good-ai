import { render, screen, fireEvent, act } from '@testing-library/react'
import { CartProvider, useCart } from '../cart-context'

const mockProduct = {
  id: '1',
  name: 'Diamond Ring',
  price: 999,
  image: '/images/products/ring-1.jpg',
}

// Test component that uses the cart context
function TestComponent() {
  const { items, addItem, removeItem, updateQuantity, clearCart } = useCart()

  return (
    <div>
      <div data-testid="cart-count">{items.length}</div>
      <div data-testid="total-items">
        {items.reduce((total, item) => total + item.quantity, 0)}
      </div>
      <div data-testid="subtotal">
        {items.reduce((total, item) => total + item.price * item.quantity, 0)}
      </div>
      <button onClick={() => addItem(mockProduct)}>Add Item</button>
      <button onClick={() => removeItem(mockProduct.id)}>Remove Item</button>
      <button onClick={() => updateQuantity(mockProduct.id, 2)}>
        Update Quantity
      </button>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  )
}

describe('CartContext', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('provides initial empty cart state', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
    expect(screen.getByTestId('total-items')).toHaveTextContent('0')
    expect(screen.getByTestId('subtotal')).toHaveTextContent('0')
  })

  it('adds item to cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    fireEvent.click(screen.getByText('Add Item'))

    expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
    expect(screen.getByTestId('total-items')).toHaveTextContent('1')
    expect(screen.getByTestId('subtotal')).toHaveTextContent('999')
  })

  it('removes item from cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    fireEvent.click(screen.getByText('Add Item'))
    fireEvent.click(screen.getByText('Remove Item'))

    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
    expect(screen.getByTestId('total-items')).toHaveTextContent('0')
    expect(screen.getByTestId('subtotal')).toHaveTextContent('0')
  })

  it('updates item quantity', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    fireEvent.click(screen.getByText('Add Item'))
    fireEvent.click(screen.getByText('Update Quantity'))

    expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
    expect(screen.getByTestId('total-items')).toHaveTextContent('2')
    expect(screen.getByTestId('subtotal')).toHaveTextContent('1998')
  })

  it('clears cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    fireEvent.click(screen.getByText('Add Item'))
    fireEvent.click(screen.getByText('Clear Cart'))

    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
    expect(screen.getByTestId('total-items')).toHaveTextContent('0')
    expect(screen.getByTestId('subtotal')).toHaveTextContent('0')
  })

  it('persists cart state in localStorage', () => {
    const { unmount } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    fireEvent.click(screen.getByText('Add Item'))
    unmount()

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
    expect(screen.getByTestId('total-items')).toHaveTextContent('1')
    expect(screen.getByTestId('subtotal')).toHaveTextContent('999')
  })

  it('increments quantity when adding same item', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    fireEvent.click(screen.getByText('Add Item'))
    fireEvent.click(screen.getByText('Add Item'))

    expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
    expect(screen.getByTestId('total-items')).toHaveTextContent('2')
    expect(screen.getByTestId('subtotal')).toHaveTextContent('1998')
  })

  it('removes item when quantity is set to 0', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    fireEvent.click(screen.getByText('Add Item'))
    act(() => {
      const { updateQuantity } = useCart()
      updateQuantity(mockProduct.id, 0)
    })

    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
    expect(screen.getByTestId('total-items')).toHaveTextContent('0')
    expect(screen.getByTestId('subtotal')).toHaveTextContent('0')
  })
}) 