import type { Metadata, Viewport } from "next";
import { Archivo, Newsreader } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { pageMetadata } from "@/content/seo";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { PageTransitionProvider } from "@/components/layout/PageTransition";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ToneController } from "@/components/layout/ToneController";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const home = pageMetadata("home");

// Runs before first paint: flags JS, and on a fresh visit to Home holds the
// navigation back until the hero sequence finishes (with a safety timeout).
const introScript = `(function(d){var r=d.documentElement;r.classList.add('js');try{if(location.pathname==='/'&&scrollY<10&&!matchMedia('(prefers-reduced-motion: reduce)').matches){r.classList.add('intro-pending');setTimeout(function(){r.classList.remove('intro-pending')},2800)}}catch(e){}})(document)`;

export const metadata: Metadata = {
  ...home,
  metadataBase: new URL(site.url),
  applicationName: site.name,
  authors: [{ name: site.name }],
  keywords: ["Ghana charity", "faith-based NGO", "Christian charity Ghana", "community support", "volunteer Ghana", "The Pinnacle Foundation"],
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#f6f1e8",
  width: "device-width",
  initialScale: 1,
};

const sameAs = Object.values(site.social).filter(Boolean);

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: site.name,
  description: site.mission,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  slogan: site.tagline,
  areaServed: { "@type": "Country", name: "Ghana" },
  address: { "@type": "PostalAddress", addressCountry: site.countryCode, ...(site.contact.address ? { streetAddress: site.contact.address } : {}) },
  ...(site.contact.email ? { email: site.contact.email } : {}),
  ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
  ...(sameAs.length ? { sameAs } : {}),
  nonprofitStatus: "Nonprofit",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GH" data-tone="ivory" className={`${archivo.variable} ${newsreader.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before first paint so motion-only styles never flash. */}
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      {/* Browser extensions (e.g. Grammarly) add attributes to <body> before hydration. */}
      <body suppressHydrationWarning>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll>
          <PageTransitionProvider>
            <Nav />
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
            <ToneController />
          </PageTransitionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
