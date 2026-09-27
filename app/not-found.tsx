import { Button } from "@/components/ui/Button";
import { PinnacleLine } from "@/components/motion/PinnacleLine";

export default function NotFound() {
  return (
    <section data-scroll-tone="ivory" className="flex min-h-[100svh] flex-col justify-center pt-32">
      <div className="container-x">
        <p className="text-sm text-[var(--muted)]">Page not found</p>
        <h1 className="display fs-huge mt-6">
          This path
          <br />
          leads nowhere.
        </h1>
        <p className="lede mt-8 max-w-[36ch] text-[var(--muted)]">The page you were looking for has moved or never existed. Let&apos;s get you back.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/projects" variant="outline">
            Explore Our Projects
          </Button>
        </div>
      </div>
      <PinnacleLine peak={60} height={60} draw="once" className="mt-20" />
    </section>
  );
}
