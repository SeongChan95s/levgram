import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../services/auth';
import { useAdminStore } from '../../store/adminStore';
import TextField from '../../components/common/TextField/TextField';
import Button from '../../components/common/Button/Button';
interface LoginForm {
	password: string;
}

export default function AdminLoginPage() {
	const navigate = useNavigate();
	const login = useAdminStore(s => s.login);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting }
	} = useForm<LoginForm>();

	const onSubmit = async (data: LoginForm) => {
		try {
			const token = await adminLogin(data.password);
			login(token);
			navigate('/');
		} catch {
			setError('password', { message: '비밀번호가 틀렸습니다.' });
		}
	};

	return (
		<div className="flex justify-center items-center min-h-dvh p-[24px]">
			<form className="flex flex-col gap-[16px] w-full max-w-[320px]" onSubmit={handleSubmit(onSubmit)}>
				<h1 className="text-[20px] font-bold text-center mb-[8px]">관리자 로그인</h1>
				<TextField
					{...register('password', { required: '비밀번호를 입력해주세요.' })}
					type="password"
					label="비밀번호"
					error={errors.password?.message}
					fill
				/>
				<Button type="submit" color="primary" fill disabled={isSubmitting}>
					로그인
				</Button>
			</form>
		</div>
	);
}
