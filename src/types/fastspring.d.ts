/**
 * Type declarations for FastSpring Popup Storefront JavaScript SDK (SBL)
 */
export interface FastSpringProductEntry {
  path: string;
  quantity?: number;
}

export interface FastSpringBuilderPushPayload {
  products?: FastSpringProductEntry[];
  tags?: Record<string, string>;
  coupon?: string;
  checkout?: boolean;
}

export interface FastSpringBuilder {
  push: (payload: FastSpringBuilderPushPayload) => void;
  tag: (tags: Record<string, string>) => void;
  reset: () => void;
  add: (productPath: string, quantity?: number) => void;
  remove: (productPath: string) => void;
  checkout: (productPath?: string) => void;
  recognize: (accountKey: string) => void;
}

export interface FastSpringGlobal {
  builder: FastSpringBuilder;
}

declare global {
  interface Window {
    fastspring?: FastSpringGlobal;
  }
}
