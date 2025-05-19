import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import { SearchBar } from '../components/SearchBar'

describe('SearchBar component', () => {
  it('renders with the given value and placeholder', () => {
    const onChange = vi.fn()
    render(<SearchBar value="initial" onChange={onChange} />)

    const input = screen.getByPlaceholderText('Search GitHub users...') as HTMLInputElement
    expect(input).toBeInTheDocument()
    expect(input.value).toBe('initial')
  })

  it('calls onChange with the new value when the user types', () => {
    const onChange = vi.fn()
    render(<SearchBar value="" onChange={onChange} />)

    const input = screen.getByPlaceholderText('Search GitHub users...') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'octocat' } })

    // expect that our handler was called with the new string
    expect(onChange).toHaveBeenCalledOnce()
    expect(onChange).toHaveBeenCalledWith('octocat')
  })
})