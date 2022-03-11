import styles from "~/styles/demo.css";
import { Theme, useTheme } from 'remix-themes';

export function links() {
    return [{ rel: "stylesheet", href: styles }];
}

export default function Demo() {
    const [_,setTheme] = useTheme();
    return <div className="demo">demo<button onClick={() => setTheme(prev => (prev === Theme.DARK ? Theme.LIGHT : Theme.DARK))}>Toggle Theme</button></div>
}