"use client";

/** Opens the browser's print dialog; the print stylesheet lays the page out as a CV. */
export default function PrintButton() {
  return (
    <button type="button" className="link-btn" onClick={() => window.print()}>
      Print
    </button>
  );
}
