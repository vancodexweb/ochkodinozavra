import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Providers } from './providers';
import '../shared/styles/globals.css';

export const metadata: Metadata = {
  title: 'Finance ERP',
  description: 'Corporate finance & accounting ERP frontend.',
  // Chromium-based browsers (Chrome/Yandex/Edge) offer inline translation
  // for pages whose language doesn't match the browser's locale. Their
  // translator rewrites text nodes directly in the DOM, behind React's
  // back - the next state update React makes near that subtree then finds
  // a DOM it no longer recognizes and crashes with
  // "Failed to execute 'insertBefore'/'removeChild' on 'Node'"
  // (a well-known React/Chrome-Translate conflict, not an app bug).
  // `translate: 'no'` + `notranslate` opt the whole app out of that feature.
  other: { google: 'notranslate' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" translate="no" className="notranslate">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
