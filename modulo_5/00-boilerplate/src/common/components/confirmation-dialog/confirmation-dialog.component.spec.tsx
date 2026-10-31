import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('common/components/confirmation-dialog/ConfirmationDialogComponent', () => {
  it('should render title, content and action labels when dialog is open', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: vi.fn(),
      onClose: vi.fn(),
      title: 'test title',
      labels: {
        closeButton: 'test close',
        acceptButton: 'test accept',
      },
      children: <span>test content</span>,
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText('test content')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: props.labels.closeButton })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: props.labels.acceptButton })
    ).toBeInTheDocument();
  });

  it('should not render dialog content when dialog is closed', () => {
    // Arrange
    const props = {
      isOpen: false,
      onAccept: vi.fn(),
      onClose: vi.fn(),
      title: 'test title',
      labels: {
        closeButton: 'test close',
        acceptButton: 'test accept',
      },
      children: <span>test content</span>,
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('test content')).not.toBeInTheDocument();
  });

  it('should call onClose when clicking close button', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: vi.fn(),
      onClose: vi.fn(),
      title: 'test title',
      labels: {
        closeButton: 'test close',
        acceptButton: 'test accept',
      },
      children: <span>test content</span>,
    };

    render(<ConfirmationDialogComponent {...props} />);

    // Act
    fireEvent.click(screen.getByRole('button', { name: props.labels.closeButton }));

    // Assert
    expect(props.onClose).toHaveBeenCalledTimes(1);
    expect(props.onAccept).not.toHaveBeenCalled();
  });

  it('should call onAccept and onClose when clicking accept button', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: vi.fn(),
      onClose: vi.fn(),
      title: 'test title',
      labels: {
        closeButton: 'test close',
        acceptButton: 'test accept',
      },
      children: <span>test content</span>,
    };

    render(<ConfirmationDialogComponent {...props} />);

    // Act
    fireEvent.click(screen.getByRole('button', { name: props.labels.acceptButton }));

    // Assert
    expect(props.onAccept).toHaveBeenCalledTimes(1);
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });
});
