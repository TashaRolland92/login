import styles from "../../pages/Login.module.scss";
import reset from "./ResetPassword.module.scss";

const ResetPassword = (): React.ReactElement => {
    return (
        <div className={reset.modal__container} id="modalContainer">
            <div className={reset.modal}>
                <button type="button" className="close">Close</button>
                <form action="/reset-password" method="post" className={styles.form}>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        autoComplete="email"
                        placeholder="Email Address" 
                        className={`${styles.input} ${reset.input__modal} font-bold`} 
                    />            
                    <input 
                        type="password" 
                        name="newPassword" 
                        id="newPassword"
                        placeholder="New Password" 
                        className={`${styles.input} ${reset.input__modal} font-bold`} 
                    />
                    <input 
                        type="password" 
                        name="confirmNewPassword" 
                        id="confirmNewPassword"
                        placeholder="Confirm New Password" 
                        className={`${styles.input} ${reset.input__modal} font-bold`} 
                    />
                    <button title="Submit" type="submit" className={`${styles.btn} font-medium`}>Confirm</button>            
                </form>
            </div>
        </div>
    )
}

export default ResetPassword;
