import { render, screen, fireEvent } from '@testing-library/react'
import ProductCard from '../product-card'

const mockProduct = {
  id: '1',
  name: 'Diamond Ring',
  price: 999,
  image: '/images/products/ring-1.jpg',
  category: 'Rings',
  slug: 'diamond-ring',
}

describe('ProductCard', () => {
  const mockHandlers = {
    onAddToCart: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} {...mockHandlers} />)

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument()
    expect(screen.getByText(`$${mockProduct.price.toLocaleString()}`)).toBeInTheDocument()
  })

  it('calls onAddToCart when add to cart button is clicked', () => {
    render(<ProductCard product={mockProduct} {...mockHandlers} />)

    const addToCartButton = screen.getByRole('button', { name: /add to cart/i })
    fireEvent.click(addToCartButton)

    expect(mockHandlers.onAddToCart).toHaveBeenCalledTimes(1)
  })

  it('toggles like state when heart button is clicked', () => {
    render(<ProductCard product={mockProduct} {...mockHandlers} />)

    const heartButton = screen.getByRole('button', { name: /wishlist/i })
    fireEvent.click(heartButton)

    const heartIcon = screen.getByTestId('heart-icon')
    expect(heartIcon).toHaveClass('fill-red-500', 'text-red-500')

    fireEvent.click(heartButton)
    expect(heartIcon).not.toHaveClass('fill-red-500', 'text-red-500')
  })

  it('shows action buttons on hover', () => {
    render(<ProductCard product={mockProduct} {...mockHandlers} />)

    const productCard = screen.getByTestId('product-card')
    fireEvent.mouseEnter(productCard)

    const quickAddButton = screen.getByRole('button', { name: /quick add to cart/i })
    expect(quickAddButton).toBeVisible()

    fireEvent.mouseLeave(productCard)
    expect(quickAddButton).not.toBeVisible()
  })
}) 