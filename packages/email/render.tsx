import * as ReactEmail from '@react-email/render';

import config from '@documenso/tailwind-config';

import { BrandingProvider, type BrandingSettings } from './providers/branding';

export type RenderOptions = ReactEmail.Options & {
  branding?: BrandingSettings;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const colors = (config.theme?.extend?.colors || {}) as Record<string, string>;

export const render = (element: React.ReactNode, options?: RenderOptions) => {
  const { branding, ...otherOptions } = options ?? {};

  return ReactEmail.render(
    <BrandingProvider branding={branding}>{element}</BrandingProvider>,
    otherOptions,
  );
};

export const renderAsync = async (element: React.ReactNode, options?: RenderOptions) => {
  const { branding, ...otherOptions } = options ?? {};

  return await ReactEmail.renderAsync(
    <BrandingProvider branding={branding}>{element}</BrandingProvider>,
    otherOptions,
  );
};
