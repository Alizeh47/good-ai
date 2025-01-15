import { render, screen, fireEvent } from '@testing-library/react'
import ProductCard from '../product-card'

const mockProduct = {
  id: '1',
  name: 'Diamond Ring',
  price: 999,
  image: '/images/products/ring-1.jpg',
  category: 'Rings',
  isNew: true,
}

describe('ProductCard', () => {
  const mockHandlers = {
    onQuickView: jest.fn(),
    onAddToCart: jest.fn(),
    onToggleWishlist: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders product information correctly', () => {
    render(<ProductCard {...mockProduct} {...mockHandlers} />)

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument()
    expect(screen.getByText(`$${mockProduct.price.toLocaleString()}`)).toBeInTheDocument()
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('calls onQuickView when quick view button is clicked', () => {
    render(<ProductCard {...mockProduct} {...mockHandlers} />)

    const quickViewButton = screen.getByRole('button', { name: /quick view/i })
    fireEvent.click(quickViewButton)

    expect(mockHandlers.onQuickView).toHaveBeenCalledTimes(1)
  })

  it('calls onAddToCart when add to cart button is clicked', () => {
    render(<ProductCard {...mockProduct} {...mockHandlers} />)

    const addToCartButton = screen.getByRole('button', { name: /add to cart/i })
    fireEvent.click(addToCartButton)

    expect(mockHandlers.onAddToCart).toHaveBeenCalledTimes(1)
  })

  it('calls onToggleWishlist when wishlist button is clicked', () => {
    render(<ProductCard {...mockProduct} {...mockHandlers} />)

    const wishlistButton = screen.getByRole('button', { name: /wishlist/i })
    fireEvent.click(wishlistButton)

    expect(mockHandlers.onToggleWishlist).toHaveBeenCalledTimes(1)
  })

  it('applies isWishlisted styles when product is wishlisted', () => {
    render(<ProductCard {...mockProduct} {...mockHandlers} isWishlisted />)

    const wishlistIcon = screen.getByTestId('wishlist-icon')
    expect(wishlistIcon).toHaveClass('fill-red-500', 'stroke-red-500')
  })

  it('applies hover styles when product is hovered', () => {
    render(<ProductCard {...mockProduct} {...mockHandlers} />)

    const productCard = screen.getByTestId('product-card')
    fireEvent.mouseEnter(productCard)

    const actionButtons = screen.getAllByRole('button')
    actionButtons.forEach((button) => {
      expect(button).toBeVisible()
    })

    fireEvent.mouseLeave(productCard)
    actionButtons.forEach((button) => {
      expect(button).not.toBeVisible()
    })
  })
}) 