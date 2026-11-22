import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="legal">
        <div className="wrap">
          <p className="kicker"><span>404</span>Page not found</p>
          <h1 className="h2">This page isn&apos;t in our records.</h1>
          <p style={{ margin: "20px 0 32px" }}>The link may be outdated, or the page may have moved.</p>
          <a href="/" className="btn btn--primary">Back to home</a>
        </div>
      </main>
      <Footer />
    </>
  );
}
