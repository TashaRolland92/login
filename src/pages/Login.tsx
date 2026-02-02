import { useState } from 'react';
import styles from "./Login.module.scss";
import form from "../styles/components/Form.module.scss";
import container from "../styles/layout/Container.module.scss";
import grid from "../styles/layout/Grid.module.scss";
import LoginHero from "../components/hero/LoginHero";
import ResetPassword from "../components/reset-password/ResetPassword";

type Mode = "login" | "signup";

const Login = () => {

	const [mode, setMode] = useState<Mode>("login"); // Strongly typed state so only login or signup are allowed as values
	const [isResetPasswordOpen, setIsResetPasswordOpen] = useState<boolean>(false); // Explicitly typed as a boolean here for type safety

	const handleSignUpClick = () => {
		setMode("signup");
	}

	const handleSignInClick = () => {
		setMode("login");
	}

	const handleResetPassword = () => {
		setIsResetPasswordOpen(true);
	}

	return (
		<>		
			<LoginHero />
			<div className={container.container}>		
				<div className={form.form_grid}>
					<div className={form.form_wrapper}>
						<h1 className={`${styles.heading} font-regular`}>
							{(mode === "signup")
								? <>Create an <span className={`${styles.highlight} font-bold`}>Account</span></>
								: <>Login to your <span className={`${styles.highlight} font-bold`}>Account</span></>
							}
						</h1>
						<form action="/login" method="post" className={form.form}>
							<input 
								type="email" 
								name="email" 
								id="email" 
								autoComplete="email"
								placeholder="Email Address" 
								className={`${form.input} font-bold`} 
							/>
							<input 
								type="password" 
								name="password" 
								id="password"
								placeholder="Password" 
								className={`${form.input} font-bold`} 
							/>
							{(mode === "signup") && 
								<input 
									type="password" 
									name="confirmPassword"
									placeholder="Confirm Password"
									className={`${form.input} font-bold`} 
								/>
							} 
								
							<button title={(mode === "signup") ? "Sign up" : "Log in"} type="submit" className={`${form.submit_btn} font-medium`}>{(mode === "signup") ? "Sign up" : "Log in"}</button>
						</form>
						
						{(mode === "login") &&
							<>
								<button type="button" onClick={handleResetPassword} className={styles.reset}>Reset Password?</button>
								{(isResetPasswordOpen) && <ResetPassword />}
							</>
						}

						<p className="font-style-italic">
							{(mode === "signup") 
								? <>Already have an account? <button className="" type="button" onClick={handleSignInClick}>Sign in here</button></>
								: <>Don't have an account? <button type="button" onClick={handleSignUpClick}>Sign up here</button></>
							}
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default Login;
