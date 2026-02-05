import styles from "./LoginHero.module.scss";
import Image480 from "../../assets/images/image_480w.webp";
import Image1200 from "../../assets/images/image_1200w1.webp";

const LoginHero = (): React.ReactElement => {
    return (
        <section className={styles.hero}>
            <img
                srcSet={`${Image480} 480w, ${Image1200} 1200w`} // List of available image files, each with a descriptor (480w)
                sizes="(max-width: 480px) 480px, (max-width: 1200px) 1200px" // Telling the browser how what the rendered width is at different viewport widths
                // (max-width: 600px) 480px → viewport ≤ 600px → use image rendered at 480px width
                // 480px → viewport ≤ 1200px use image rendered at 1200px width
                src={Image1200}
                width="1200"
                height="330"
                alt="Data Image"
                className={styles.image}
            />
        </section>
    );
}

export default LoginHero;
