export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const downloadBlobFile = (file: any, filename: string) => {
	const url = window.URL.createObjectURL(new Blob([file]));
	const link = document.createElement('a');
	link.href = url;
	link.setAttribute('download', filename);
	document.body.appendChild(link);
	link.click();
	if (link && link.parentNode) link.parentNode.removeChild(link);
};

export const debounce = (func: (args?: any) => any, wait = 300) => {
	let timeout: any;

	return function executedFunction(...args: any[]) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};

		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};
