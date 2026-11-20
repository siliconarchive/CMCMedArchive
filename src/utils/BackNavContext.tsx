import React, { createContext, useContext } from 'react';

export interface BackNavContextValue {
  canGoBack: boolean;
  backLabel: string;
  goBack: () => void;
  pushSubLayer: (label: string, onUndo: () => void) => string;
  popSubLayer: (layerId: string | null) => void;
  markLayerInactive: (layerId: string | null) => void;
}

const noop = () => {};

export const BackNavContext = createContext<BackNavContextValue>({
  canGoBack: false,
  backLabel: 'Back',
  goBack: noop,
  pushSubLayer: () => '',
  popSubLayer: noop,
  markLayerInactive: noop
});

export function useBackNav(): BackNavContextValue {
  return useContext(BackNavContext);
}

// Lightweight in-memory filter preservation across section/sub-view back navigation
const sectionFilterStore = new Map<string, unknown>();

export function getSavedSectionFilters<T>(key: string): T | null {
  return (sectionFilterStore.get(key) as T) ?? null;
}

export function saveSectionFilters<T>(key: string, value: T): void {
  sectionFilterStore.set(key, value);
}
