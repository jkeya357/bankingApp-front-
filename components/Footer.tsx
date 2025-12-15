"use client";
const Footer = () => {
  return (
    <footer className="w-full mt-12 pb-8 px-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
        <div className="hover:text-primary transition-colors cursor-pointer">
          Instagram: <span className="font-medium">nzimbuBanking</span>
        </div>
        <div className="hover:text-primary transition-colors cursor-pointer">
          Facebook: <span className="font-medium">nzimbuBanking</span>
        </div>
        <div className="hover:text-primary transition-colors cursor-pointer">
          X: <span className="font-medium">nzimbuBanking</span>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Nzimbu Book. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
