import styles from "~/styles/demo.css";
import { Theme, useTheme } from 'remix-themes';
import { json, LoaderFunction } from "remix";
import { i18n } from "~/i18n.server";
import { useTranslation } from "react-i18next";

export function links() {
    return [{ rel: "stylesheet", href: styles }];
}

export let loader: LoaderFunction = async ({ request }) => {
    return json({
      i18n: await i18n.getTranslations(request, ["index"]),
    });
  };


export default function Demo() {
    const [_,setTheme] = useTheme();
    let { t } = useTranslation("index");
    return <div className="demo">demo<button onClick={() => setTheme(prev => (prev === Theme.DARK ? Theme.LIGHT : Theme.DARK))}>{t("toggleTheme")}</button></div>
}