import tailwindConfig from '../tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';
import { createBreakpoint } from 'react-use';

const fullConfig = resolveConfig(tailwindConfig);

type TailwindScreens = typeof fullConfig.theme.screens;

type Breakpoints = {
  [K in keyof TailwindScreens]: number;
};

const breakpoints: Breakpoints = Object.fromEntries(
  Object.entries(fullConfig.theme.screens).map(([key, value]) => [
    key,
    Number.parseInt(value as string),
  ])
) as Breakpoints;

const useBreakpoint = createBreakpoint(breakpoints) as () => keyof Breakpoints;

export default useBreakpoint;
