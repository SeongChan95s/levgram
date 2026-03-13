import type { ImagePickerMetadata } from './ImagePicker';
import { getFileFormat } from '../../../utils/getFileFormat';
import { resizeImage } from '../../../utils/resizeImage';

export const convertImagePickerItems = (
	urls?: string[]
): ImagePickerMetadata[] | undefined => {
	return urls?.map(url => ({
		key: url,
		file: null,
		blob: url,
		state: 'initial'
	}));
};

export interface ImagePickerServerData {
	key: string;
	state: 'initial' | 'upload' | 'delete';
}

export type ImagePickerParsedData =
	| { key: string; state: 'initial' | 'delete'; file: null }
	| { key: string; state: 'upload'; file: File };

export const parseImagePickerFormData = (
	formData: FormData,
	name: string
): ImagePickerParsedData[] => {
	const dataStr = formData.get(`${name}_metadata`) as string;
	const files = formData.getAll(`${name}`) as (string | File)[];
	const fileList = files.filter((item): item is File => item instanceof File);

	if (!dataStr) return [];

	try {
		const imageData: ImagePickerServerData[] = JSON.parse(dataStr);

		let fileIndex = 0;
		const result: ImagePickerParsedData[] = imageData.map(data => {
			if (data.state === 'upload') {
				const file = fileList[fileIndex++];
				if (!file) {
					throw new Error(`upload 상태의 이미지에 대응하는 파일이 없습니다: ${data.key}`);
				}
				return { key: data.key, state: 'upload', file };
			}
			return { key: data.key, state: data.state as 'initial' | 'delete', file: null };
		});

		return result;
	} catch {
		return [];
	}
};

export const processFiles = async (
	files: FileList,
	existingImages: ImagePickerMetadata[],
	acceptExts: string[],
	maxSizeMB: number
): Promise<ImagePickerMetadata[]> => {
	const arr = Array.from(files);

	const validFiles = arr.filter(file => {
		const ext = getFileFormat(file.name).toLowerCase();
		return acceptExts.includes(ext);
	});

	const nonDuplicateFiles = validFiles.filter(file => {
		const fileIdentifier = `${file.name}_${file.size}`;
		return !existingImages.some(img => {
			if (img.state === 'delete') return false;
			if (img.file) {
				return `${img.file.name}_${img.file.size}` === fileIdentifier;
			}
			return false;
		});
	});

	const results: ImagePickerMetadata[] = [];
	for (const file of nonDuplicateFiles) {
		const resized = await resizeImage(file, 1800);
		const sizeMB = resized.size / 1024 / 1024;
		if (sizeMB > maxSizeMB) continue;
		results.push({
			key: file.name,
			file: resized,
			blob: window.URL.createObjectURL(resized),
			state: 'upload'
		});
	}

	return results;
};
