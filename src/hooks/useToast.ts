import { toastStore } from '@/store/toast';
import shallow from 'zustand/shallow';

const useToast = () => {
	const toast = toastStore(
		store => ({
			info: store.info,
			success: store.success,
			warning: store.warning,
			danger: store.danger
		}),
		shallow
	);

	return { toast };
};

export default useToast;
