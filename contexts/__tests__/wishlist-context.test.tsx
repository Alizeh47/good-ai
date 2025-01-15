import { render, screen, fireEvent } from '@testing-library/react'
import { WishlistProvider, useWishlist } from '../wishlist-context'

const mockProduct = {
  id: '1',
  name: 'Diamond Ring',
  price: 999,
  image: '/images/products/ring-1.jpg',
  category: 'Rings',
}

// Test component that uses the wishlist context
function TestComponent() {
  const { items, addItem, removeItem, isWishlisted, clearWishlist } = useWishlist()

  return (
    <div>
      <div data-testid="wishlist-count">{items.length}</div>
      <div data-testid="is-wishlisted">
        {isWishlisted(mockProduct.id).toString()}
      </div>
      <button onClick={() => addItem(mockProduct)}>Add to Wishlist</button>
      <button onClick={() => removeItem(mockProduct.id)}>
        Remove from Wishlist
      </button>
      <button onClick={clearWishlist}>Clear Wishlist</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}

describe('WishlistContext', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('provides initial empty wishlist state', () => {
    render(
      <WishlistProvider>
        <TestComponent />
      </WishlistProvider>
    )

    expect(screen.getByTestId('wishlist-count')).toHaveTextContent('0')
    expect(screen.getByTestId('is-wishlisted')).toHaveTextContent('false')
  })

  it('adds item to wishlist', () => {
    render(
      <WishlistProvider>
        <TestComponent />
      </WishlistProvider>
    )

    fireEvent.click(screen.getByText('Add to Wishlist'))

    expect(screen.getByTestId('wishlist-count')).toHaveTextContent('1')
    expect(screen.getByTestId('is-wishlisted')).toHaveTextContent('true')
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument()
  })

  it('removes item from wishlist', () => {
    render(
      <WishlistProvider>
        <TestComponent />
      </WishlistProvider>
    )

    fireEvent.click(screen.getByText('Add to Wishlist'))
    fireEvent.click(screen.getByText('Remove from Wishlist'))

    expect(screen.getByTestId('wishlist-count')).toHaveTextContent('0')
    expect(screen.getByTestId('is-wishlisted')).toHaveTextContent('false')
    expect(screen.queryByText(mockProduct.name)).not.toBeInTheDocument()
  })

  it('clears wishlist', () => {
    render(
      <WishlistProvider>
        <TestComponent />
      </WishlistProvider>
    )

    fireEvent.click(screen.getByText('Add to Wishlist'))
    fireEvent.click(screen.getByText('Clear Wishlist'))

    expect(screen.getByTestId('wishlist-count')).toHaveTextContent('0')
    expect(screen.getByTestId('is-wishlisted')).toHaveTextContent('false')
    expect(screen.queryByText(mockProduct.name)).not.toBeInTheDocument()
  })

  it('persists wishlist state in localStorage', () => {
    const { unmount } = render(
      <WishlistProvider>
        <TestComponent />
      </WishlistProvider>
    )

    fireEvent.click(screen.getByText('Add to Wishlist'))
    unmount()

    render(
      <WishlistProvider>
        <TestComponent />
      </WishlistProvider>
    )

    expect(screen.getByTestId('wishlist-count')).toHaveTextContent('1')
    expect(screen.getByTestId('is-wishlisted')).toHaveTextContent('true')
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument()
  })

  it('prevents duplicate items in wishlist', () => {
    render(
      <WishlistProvider>
        <TestComponent />
      </WishlistProvider>
    )

    fireEvent.click(screen.getByText('Add to Wishlist'))
    fireEvent.click(screen.getByText('Add to Wishlist'))

    expect(screen.getByTestId('wishlist-count')).toHaveTextContent('1')
    expect(screen.getAllByText(mockProduct.name)).toHaveLength(1)
  })
}) 