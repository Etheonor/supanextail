import { IoLogoGoogle } from 'react-icons/io';
import router from 'next/router';
import { toast } from 'react-toastify';
import { useState } from 'react';

type SignUpPanelProps = {
	signIn: ({}) => Promise<{ data: Record<string, unknown>; error: { message: string } }>;
	signUp: ({}) => Promise<{ data: Record<string, unknown>; error: { message: string } }>;
};

const SignUpPanel = ({ signIn, signUp }: SignUpPanelProps): JSX.Element => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const signup = (e: React.SyntheticEvent<HTMLButtonElement>) => {
		e.preventDefault();

		// Handle the login. Go to the homepage if success or display an error.
		signUp({
			email,
			password,
		}).then((result) => {
			if (result.data) {
				router.push('/');
			}
			if (result.error) {
				toast.error(result.error.message);
			}
		});
	};

	return (
		<div className="p-10 bg-base-100 md:flex-1 rounded-md text-base-content shadow-md max-w-sm font-body">
			<h3 className="my-4 text-2xl font-semibold font-title">Account Sign Up</h3>
			<form action="#" className="flex flex-col space-y-5">
				<div className="flex flex-col space-y-1">
					<label htmlFor="email" className="text-sm">
						Email address
					</label>
					<input
						type="email"
						id="email"
						autoFocus
						className="input input-primary input-bordered input-sm"
						value={email}
						onChange={(event) => {
							setEmail(event.target.value);
						}}
					/>
				</div>
				<div className="flex flex-col space-y-1">
					<input
						type="password"
						id="password"
						className="input input-primary input-bordered input-sm"
						value={password}
						onChange={(event) => {
							setPassword(event.target.value);
						}}
					/>
				</div>

				<div>
					<button
						className="btn btn-primary w-full"
						onClick={(event) => {
							signup(event);
						}}
					>
						Sign Up
					</button>
				</div>
				<div className="flex flex-col space-y-5">
					<span className="flex items-center justify-center space-x-2">
						<span className="h-px bg-gray-400 w-14" />
						<span className="font-normal text-gray-500">or sign up with</span>
						<span className="h-px bg-gray-400 w-14" />
					</span>
					<div className="flex flex-col space-y-4">
						<button
							className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-base-200 rounded-md group hover:bg-base-300 focus:outline-none "
							onClick={(event) => {
								event.preventDefault();
								signIn({ provider: 'google' });
							}}
						>
							<div className="text-base-content">
								<IoLogoGoogle />
							</div>
							<span className="text-sm font-medium text-base-content">Gmail</span>
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default SignUpPanel;