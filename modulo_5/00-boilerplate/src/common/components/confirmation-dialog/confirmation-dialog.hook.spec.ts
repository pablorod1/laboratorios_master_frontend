import { act, renderHook } from '@testing-library/react';
import { Lookup } from '#common/models';
import { useConfirmationDialog } from './confirmation-dialog.hook';

describe('common/components/confirmation-dialog/useConfirmationDialog', () => {
  it('should return default confirmation dialog state', () => {
    // Arrange & Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual({ id: '', name: '' });
  });

  it('should open dialog and store item to delete', () => {
    // Arrange
    const item: Lookup = {
      id: 'test id',
      name: 'test name',
    };

    const { result } = renderHook(() => useConfirmationDialog());

    // Act
    act(() => {
      result.current.onOpenDialog(item);
    });

    // Assert
    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual(item);
  });

  it('should close dialog without clearing item to delete', () => {
    // Arrange
    const item: Lookup = {
      id: 'test id',
      name: 'test name',
    };

    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(item);
    });

    // Act
    act(() => {
      result.current.onClose();
    });

    // Assert
    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual(item);
  });

  it('should clear item to delete when accepting', () => {
    // Arrange
    const item: Lookup = {
      id: 'test id',
      name: 'test name',
    };

    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(item);
    });

    // Act
    act(() => {
      result.current.onAccept();
    });

    // Assert
    expect(result.current.itemToDelete).toEqual({ id: '', name: '' });
    expect(result.current.isOpen).toBe(true);
  });
});
