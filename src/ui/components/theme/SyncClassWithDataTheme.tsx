import { useEffect } from "react";

export default function SyncClassWithDataTheme({ className, themeName }: { 
  className ?: string,
  themeName ?: string, 
}) {
  useEffect(() => {
    const html = document.documentElement;
    const cn   = className ?? "dark";
    const tn   = themeName ?? "dark";

    function syncClassWithDataTheme() {
      const theme = html.getAttribute("data-theme");
      html.classList.toggle(cn   ,    theme === tn);
    };

    syncClassWithDataTheme();

    // Observe changes to the data-theme attribute
    const observer = new MutationObserver(() => syncClassWithDataTheme());

    observer.observe(html, {
      attributes     :      true     ,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, [className, themeName]);
}