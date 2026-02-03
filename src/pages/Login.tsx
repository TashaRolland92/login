import { useState } from 'react';
import "../styles/layout/Grid.scss";
import styles from "./Login.module.scss";
import form from "../styles/components/Form.module.scss";
import container from "../styles/layout/Container.module.scss";
import LoginHero from "../components/hero/LoginHero";
import ResetPassword from "../components/reset-password/ResetPassword";

type Mode = "login" | "signup";

const Login = (): React.ReactElement => { // Component return type annotated here, React.ReactElement covers specifically JSX elements

	const [mode, setMode] = useState<Mode>("login"); // Strongly typed state so only login or signup are allowed as values
	const [isResetPasswordOpen, setIsResetPasswordOpen] = useState<boolean>(false); // Explicitly typed as a boolean here for type safety
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [message, setMessage] = useState<{ type: "success" | "error", text: string} | null>(null);

	const handleSignUpClick = (_e: React.MouseEvent<HTMLButtonElement>): void => { // Annotated all event handlers as (): void return type because the function does not return anything
		setMessage(null); // Clear message when switching "modes"
		setMode("signup");
	}

	const handleSignInClick = (_e: React.MouseEvent<HTMLButtonElement>): void => { // Parameter types added for event and element --> Type Annotation
		setMessage(null);
		setMode("login");
	}

	const handleResetPassword = (_e: React.MouseEvent<HTMLButtonElement>): void => { // Naming the parameter with underscore (_e) tells the linter/compiler we are aware of this event but we are intentionally ignoring it
		setIsResetPasswordOpen(true);
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		setMessage(null); // Clear any previous messages

		// Snippet of Client Side Validation
		if(mode === "signup" && password !== confirmPassword) {
			setMessage({ type: "error", text: "Passwords do not match!"});
			return;
		}

		// Set Success
		setMessage({ type: "success", text: mode === "signup" ? "Account created!" : "Login Successful!" });		

		// Log form values
		console.log(`Mode: ${mode}, Email: ${email}, Password: ${password}`);

		// Clear the form
		setEmail("");
		setPassword("");
		setConfirmPassword("");
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
						<form
							action="/login"
							method="post"
							className={form.form}
							onSubmit={handleSubmit} 
							name={(mode === "signup") ? "User Sign up Form" : "User Log in Form"}
							aria-label={(mode === "signup") ? "User Sign up Form" : "User Log in Form"}
						>
							<input
								type="email"
								name="email"
								id="email"
								value={email}
								aria-label="Email Address"
								placeholder="Email Address"
								aria-required="true"
								required
								className={`${form.input} font-bold`}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<input
								type="password"
								name="password"
								id="password"
								value={password}
								aria-label="Password"
								placeholder="Password"
								aria-required="true"
								required
								className={`${form.input} font-bold`}
								onChange={(e) => setPassword(e.target.value)}
							/>
							{(mode === "signup") &&
								<input
									type="password"
									name="confirmPassword"
									id="confirmPassword"
									value={confirmPassword}
									aria-label="Confirm Password"
									placeholder="Confirm Password"
									required
									aria-required="true"
									className={`${form.input} font-bold`}
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>
							}

							<button 
								type="submit" 
								className={`${form.submit_btn} font-medium`}
								title={(mode === "signup") ? "Sign up" : "Log in"}
							>
								{(mode === "signup") ? "Sign up" : "Log in"}
							</button>
						</form>

						{message && 
							<>						
								<div 
									role="alert" 
									aria-live="polite" 
									className={`${styles.message} `}
								>
									<p className={`font-italic ${styles[message.type]}`}>{message.text}</p>
								</div>
							</>
						}

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
