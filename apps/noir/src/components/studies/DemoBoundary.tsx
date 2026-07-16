"use client";

import { Component, type ReactNode } from "react";

/**
 * Catches runtime errors inside a study demo so one broken demo shows a quiet
 * fallback instead of crashing the whole page. Remounts (and thus resets) per
 * study because the parent stage is keyed by study id.
 */
class DemoBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="mono flex h-full w-full items-center justify-center text-xs text-faint">
          demo unavailable
        </div>
      );
    }
    return this.props.children;
  }
}

export default DemoBoundary;
