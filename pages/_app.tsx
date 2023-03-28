// importing global sass styles
import "styles/global.scss"
import { useEffect, useState } from 'react'
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// importing AppProps type from next/app
import type { AppProps } from 'next/app'

// importing NextRouter and useRouter hooks from next/router
import { NextRouter, useRouter } from 'next/router'
import Splashscreen from "../components/common/Splashscreen"

// defining IPageLoad interface to have splashscreen and main as JSX element
interface IPageLoad {
  splashscreen: JSX.Element,
  main: JSX.Element
}

interface PageWithLayout {
  getLayout: (page: JSX.Element) => JSX.Element
}

type AppPageProps = AppProps & {
  Component: PageWithLayout
}

/**
 * MyApp Component is the base component for Next.js pages.
 * @param Component represent current page's component.
 * @param pageProps The initial properties that were preloaded for your page.
 */
export default function MyApp({ Component, pageProps }: AppPageProps) {
  const getLayout = Component.getLayout || ((page) => page)

  // use NextRouter to get router object for navigating between client-side pages
  const router: NextRouter = useRouter()

  const [loadinpage, setloadpage] = useState<Boolean>(true);

  // redirect user to /auth/login when the app first load
  useEffect(() => {
    setloadpage(true)
    setTimeout(() => {
      setloadpage(false)
    }, 2000);

  }, [])

  // define PageLoad object using IPageLoad interface.
  // It has two keys which are "splashscreen" and "main", and their respective value is the appropriate JSX Element.
  const PageLoad: IPageLoad = {
    splashscreen: <Splashscreen />,
    main: <Component {...pageProps} />
  }

  // Create rtl cache
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
  });


  // rendering either the splashscreen or the main content based on the condition
  return (
    <>
      <CacheProvider value={cacheRtl}>
        {
          getLayout(PageLoad[loadinpage ? "splashscreen" : "main"])
        }
      </CacheProvider>
    </>
  )
}
