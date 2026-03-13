export async function resizeImage(file: File, maxWidth = 1800): Promise<File> {
	return new Promise((resolve, reject) => {
		const url = URL.createObjectURL(file);
		const img = new Image();

		img.onload = () => {
			URL.revokeObjectURL(url);

			if (img.width <= maxWidth) {
				resolve(file);
				return;
			}

			const ratio = maxWidth / img.width;
			const canvas = document.createElement('canvas');
			canvas.width = maxWidth;
			canvas.height = Math.round(img.height * ratio);

			const ctx = canvas.getContext('2d');
			if (!ctx) {
				reject(new Error('canvas context 생성 실패'));
				return;
			}
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

			const type = file.type || 'image/jpeg';
			const quality = type === 'image/png' ? undefined : 1.0;

			canvas.toBlob(
				blob => {
					if (!blob) {
						reject(new Error('toBlob 실패'));
						return;
					}
					resolve(new File([blob], file.name, { type }));
				},
				type,
				quality
			);
		};

		img.onerror = () => reject(new Error('이미지 로드 실패'));
		img.src = url;
	});
}
