import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { usePromiseTracker } from 'react-promise-tracker';
import { SpinnerComponent } from './spinner.component';

vi.mock('react-promise-tracker', () => ({
  usePromiseTracker: vi.fn(),
}));

describe('common/components/spinner/SpinnerComponent', () => {
  it('should not render loader when there are no pending promises', () => {
    // Arrange
    vi.mocked(usePromiseTracker).mockReturnValue({
      promiseInProgress: false,
    } as any);

    // Act
    render(<SpinnerComponent />);

    // Assert
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('should render loader when there are pending promises', () => {
    // Arrange
    vi.mocked(usePromiseTracker).mockReturnValue({
      promiseInProgress: true,
    } as any);

    // Act
    render(<SpinnerComponent />);

    // Assert
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });
});
