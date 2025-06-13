
import * as React from "react"

const MOBILE_BREAKPOINT = 768 // md breakpoint in Tailwind

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      setIsMobile(false); // Default to false in SSR or non-browser environments
      return;
    }

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = (event: MediaQueryListEvent) => { // Explicitly type event
      setIsMobile(event.matches)
    }
    
    // Set initial state
    setIsMobile(mql.matches);

    // Add listener
    // Using addEventListener/removeEventListener for modern browsers
    try {
        mql.addEventListener("change", onChange);
    } catch (e1) {
        // Fallback for older browsers
        try {
            (mql as any).addListener(onChange);
        } catch (e2) {
            console.error("Error adding media query listener", e2);
        }
    }


    return () => {
        try {
            mql.removeEventListener("change", onChange);
        } catch (e1) {
            try {
                (mql as any).removeListener(onChange);
            } catch (e2) {
                console.error("Error removing media query listener", e2);
            }
        }
    }
  }, [])

  return isMobile === undefined ? false : isMobile; // Return false if undefined (during initial server render)
}
