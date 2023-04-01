export async function loadAndExecScript(sources: string | string[]) {
  // #ifdef H5
  const sourceToTask = async (source: string) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.crossOrigin = ''
    return new Promise<boolean>((resolve, reject) => {
      script.onload = () => resolve(true)
      script.onerror = reject
      script.src = source
      document.head.appendChild(script)
    })
  }
  if (Array.isArray(sources)) {
    for (const source of sources) {
      if (await sourceToTask(source)) return true
    }
  } else {
    return await sourceToTask(sources)
  }
  // #endif
}
