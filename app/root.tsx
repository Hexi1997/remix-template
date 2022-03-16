import {
  createCookieSessionStorage,
  Links,
  LinksFunction,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";
import type { MetaFunction } from "remix";
import {createThemeSessionResolver,ThemeProvider, useTheme, PreventFlashOnWrongTheme} from 'remix-themes'
import themeCss from './styles/theme.css'
import globalCss from './styles/global.css'
import { i18n } from "./i18n.server";
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'remix-themes',
    secure: true,
    sameSite: 'lax',
    secrets: ['s3cr3t'],
    expires: new Date('2100-08-14'),
    path: '/',
    httpOnly: true,
  },
})

export const themeSessionResolver = createThemeSessionResolver(sessionStorage)

export const loader: LoaderFunction = async ({request}) => {
  const {getTheme} = await themeSessionResolver(request)
  // let locale = await i18n.getLocale(request);
  return {
    theme: getTheme(),
    // locale
  }
}


export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};


export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: themeCss},{rel:'stylesheet',href: globalCss}]
}


export default function AppWithProviders() {
  const data = useLoaderData()
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  )
}

function App() {
  const data = useLoaderData()
  const [theme] = useTheme()
  return (
    <html lang="en" className={theme ?? ''}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}
