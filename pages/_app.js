import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export function reportWebVitals(metric) {
  console.log(metric)
}

export default MyApp
