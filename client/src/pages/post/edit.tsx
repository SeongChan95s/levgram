import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { getPost, updatePost } from '../../services/post';
import { useAdminStore } from '../../store/adminStore';
import type { Tag } from '../../types/post';
import type { ImagePickerMetadata } from '../../components/common/ImagePicker/ImagePicker';
import TextField from '../../components/common/TextField/TextField';
import Textarea from '../../components/common/Textarea/Textarea';
import ImagePicker from '../../components/common/ImagePicker/ImagePicker';
import Button from '../../components/common/Button/Button';
import { Checkbox } from '../../components/common/Checkbox';

const TAG_OPTIONS: Tag[] = ['studio', 'snap', 'cosplay', 'outdoor'];

interface PostEditForm {
	title: string;
	model: string;
	description: string;
	date: string;
	location: string;
	tags: Tag[];
	photos: ImagePickerMetadata[];
}

export default function PostEditPage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { isAdmin, token } = useAdminStore();

	useEffect(() => {
		if (!isAdmin) navigate('/');
	}, [isAdmin, navigate]);

	const { data: post } = useQuery({
		queryKey: ['post', id],
		queryFn: () => getPost(id!),
		enabled: !!id && isAdmin
	});

	const {
		handleSubmit,
		control,
		reset,
		formState: { errors, isSubmitting }
	} = useForm<PostEditForm>({
		defaultValues: {
			title: '',
			model: '',
			description: '',
			date: '',
			location: '',
			tags: [],
			photos: []
		}
	});

	useEffect(() => {
		if (post) {
			reset({
				title: post.title,
				model: post.model,
				description: post.description ?? '',
				date: post.date ?? '',
				location: post.location ?? '',
				tags: post.tags ?? [],
				photos: post.photos.map(url => ({
					key: url,
					file: null,
					blob: url,
					state: 'initial' as const
				}))
			});
		}
	}, [post, reset]);

	const onSubmit = async (data: PostEditForm) => {
		if (!id || !token) return;

		const formData = new FormData();
		formData.append('title', data.title);
		formData.append('model', data.model);
		if (data.description) formData.append('description', data.description);
		if (data.date) formData.append('date', data.date);
		if (data.location) formData.append('location', data.location);
		formData.append('tags', JSON.stringify(data.tags));

		const existingPhotos = data.photos.filter(p => p.state === 'initial').map(p => p.key);
		formData.append('existingPhotos', JSON.stringify(existingPhotos));

		data.photos
			.filter(p => p.state === 'upload' && p.file)
			.forEach(p => formData.append('photos', p.file!));

		await updatePost(id, formData, token);
		navigate('/');
	};

	if (!isAdmin) return null;

	return (
		<>
			<Helmet>
				<title>게시물 수정</title>
			</Helmet>
			<div className="pb-[40px]">
				<form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
					<Controller
						control={control}
						name="photos"
						rules={{
							validate: v =>
								v.filter(p => p.state !== 'delete').length >= 1 ||
								'사진을 최소 1장 이상 추가해주세요.'
						}}
						render={({ field }) => (
							<div>
								<ImagePicker value={field.value} onMetadataChange={field.onChange} />
								{errors.photos && <p>{errors.photos.message}</p>}
							</div>
						)}
					/>

					<div className="flex flex-col gap-[16px] px-[var(--inner)] py-[24px]">
						<Controller
							control={control}
							name="title"
							rules={{ required: '제목을 입력해주세요.' }}
							render={({ field, fieldState }) => (
								<TextField
									label="제목"
									value={field.value}
									onChange={e => field.onChange(e.target.value)}
									error={fieldState.error?.message}
									fill
								/>
							)}
						/>

						<Controller
							control={control}
							name="model"
							rules={{ required: '모델명을 입력해주세요.' }}
							render={({ field, fieldState }) => (
								<TextField
									label="모델"
									value={field.value}
									onChange={e => field.onChange(e.target.value)}
									error={fieldState.error?.message}
									fill
								/>
							)}
						/>

						<Controller
							control={control}
							name="description"
							render={({ field }) => (
								<Textarea
									label="설명"
									value={field.value}
									onChange={e => field.onChange(e.target.value)}
									rows={4}
									fill
								/>
							)}
						/>

						<Controller
							control={control}
							name="date"
							render={({ field }) => (
								<TextField
									type="date"
									label="날짜"
									value={field.value}
									onChange={e => field.onChange(e.target.value)}
									fill
								/>
							)}
						/>

						<Controller
							control={control}
							name="location"
							render={({ field }) => (
								<TextField
									label="장소"
									value={field.value}
									onChange={e => field.onChange(e.target.value)}
									fill
								/>
							)}
						/>

						<Controller
							control={control}
							name="tags"
							render={({ field }) => (
								<div className="flex flex-wrap gap-[8px]">
									{TAG_OPTIONS.map(tag => (
										<Checkbox
											key={tag}
											value={tag}
											checked={field.value.includes(tag)}
											onChange={e => {
												const current = field.value;
												if (e.target.checked) {
													field.onChange([...current, tag]);
												} else {
													field.onChange(current.filter(t => t !== tag));
												}
											}}>
											{tag}
										</Checkbox>
									))}
								</div>
							)}
						/>

						<Button type="submit" color="primary" fill disabled={isSubmitting}>
							저장
						</Button>
					</div>
				</form>
			</div>
		</>
	);
}
