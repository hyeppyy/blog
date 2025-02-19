'use client';

import { useEffect, useRef } from 'react';

const Giscus = () => {
  const ref = useRef<HTMLDivElement>(null);
  const theme = 'light';

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;
    const scriptElem = document.createElement('script');
    scriptElem.src = 'https://giscus.app/client.js';
    scriptElem.async = true;
    scriptElem.setAttribute('data-repo', 'hyeppyy/blog');
    scriptElem.setAttribute('data-repo-id', 'R_kgDON6ulVQ');
    scriptElem.setAttribute('data-category', 'Comments');
    scriptElem.setAttribute('data-category-id', 'DIC_kwDON6ulVc4CnGax');
    scriptElem.setAttribute('data-mapping', 'pathname');
    scriptElem.setAttribute('data-strict', '0');
    scriptElem.setAttribute('data-reactions-enabled', '0');
    scriptElem.setAttribute('data-emit-metadata', '0');
    scriptElem.setAttribute('data-input-position', 'bottom');
    scriptElem.setAttribute('data-theme', theme);
    scriptElem.setAttribute('data-lang', 'ko');
    scriptElem.setAttribute('crossorigin', 'anonymous');
    ref.current.appendChild(scriptElem);
  }, []);

  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      'iframe.giscus-frame'
    );
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme } } },
      'https://giscus.app'
    );
  }, [theme]);

  return (
    <section
      className='border-t border-t-[var(--gray-01)] pt-[40px] mt-[80px]'
      ref={ref}
    />
  );
};

export default Giscus;
