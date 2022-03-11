import styles from "~/styles/demo.css";

export function links() {
    return [{ rel: "stylesheet", href: styles }];
}

export default function Demo() {
    return <div className="demo">demo</div>
}