import { renderHook, act } from 'test/utils';
import useModal from '@/hooks/useModal';

describe('useModal test', () => {
	test('open and close', () => {
		const { result } = renderHook(() => useModal());
		expect(result.current.isOpen).toBe(false);
		act(() => result.current.openModal());
		expect(result.current.isOpen).toBe(true);
		act(() => result.current.closeModal());
		expect(result.current.isOpen).toBe(false);
	});

	test('initial open', () => {
		const { result } = renderHook(() => useModal(true));
		expect(result.current.isOpen).toBe(true);
	});

	test('open modal with an item', () => {
		const { result } = renderHook(() => useModal());
		const item = { id: 1, name: 'test' };
		expect(result.current.isOpen).toBe(false);
		act(() => result.current.openModal(item));
		expect(result.current.isOpen).toBe(true);
		expect(result.current.item).toEqual(item);
	});
});
