import { render, screen, fireEvent, act } from '@testing-library/react'
import { SearchProvider, useSearch } from '../search-context'

// Test component that uses the search context
function TestComponent() {
  const {
    query,
    setQuery,
    results,
    recentSearches,
    suggestions,
    isLoading,
    clearRecentSearches,
  } = useSearch()

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        data-testid="search-input"
      />
      <div data-testid="loading-state">{isLoading ? 'Loading...' : ''}</div>
      <div data-testid="results-count">{results.length}</div>
      <div data-testid="suggestions-count">{suggestions.length}</div>
      <div data-testid="recent-searches-count">{recentSearches.length}</div>
      <button onClick={clearRecentSearches}>Clear Recent</button>
      <ul>
        {results.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion}>{suggestion}</li>
        ))}
      </ul>
      <ul>
        {recentSearches.map((search) => (
          <li key={search}>{search}</li>
        ))}
      </ul>
    </div>
  )
}

describe('SearchContext', () => {
  beforeEach(() => {
    window.localStorage.clear()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('provides initial empty search state', () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    )

    expect(screen.getByTestId('search-input')).toHaveValue('')
    expect(screen.getByTestId('results-count')).toHaveTextContent('0')
    expect(screen.getByTestId('suggestions-count')).toHaveTextContent('0')
    expect(screen.getByTestId('recent-searches-count')).toHaveTextContent('0')
  })

  it('updates search query and shows loading state', async () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    )

    const input = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: 'ring' } })

    expect(screen.getByTestId('loading-state')).toHaveTextContent('Loading...')

    await act(async () => {
      jest.advanceTimersByTime(300)
    })

    expect(screen.getByTestId('loading-state')).toHaveTextContent('')
    expect(screen.getByTestId('results-count')).not.toHaveTextContent('0')
  })

  it('shows suggestions when query matches', async () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    )

    const input = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: 'ring' } })

    await act(async () => {
      jest.advanceTimersByTime(300)
    })

    expect(screen.getByTestId('suggestions-count')).not.toHaveTextContent('0')
    expect(screen.getByText('Diamond Ring')).toBeInTheDocument()
    expect(screen.getByText('Wedding Rings')).toBeInTheDocument()
  })

  it('stores recent searches in localStorage', async () => {
    const { unmount } = render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    )

    const input = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: 'ring' } })

    await act(async () => {
      jest.advanceTimersByTime(300)
    })

    unmount()

    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    )

    expect(screen.getByTestId('recent-searches-count')).toHaveTextContent('1')
    expect(screen.getByText('ring')).toBeInTheDocument()
  })

  it('clears recent searches', async () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    )

    const input = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: 'ring' } })

    await act(async () => {
      jest.advanceTimersByTime(300)
    })

    fireEvent.click(screen.getByText('Clear Recent'))

    expect(screen.getByTestId('recent-searches-count')).toHaveTextContent('0')
  })

  it('limits recent searches to maximum allowed', async () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    )

    const input = screen.getByTestId('search-input')
    const searches = ['ring', 'necklace', 'bracelet', 'earring', 'pendant', 'chain']

    for (const search of searches) {
      fireEvent.change(input, { target: { value: search } })
      await act(async () => {
        jest.advanceTimersByTime(300)
      })
    }

    expect(screen.getByTestId('recent-searches-count')).toHaveTextContent('5')
    expect(screen.queryByText('ring')).not.toBeInTheDocument()
  })
}) 