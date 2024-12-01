import { create } from '@kodingdotninja/use-tailwind-breakpoint';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../tailwind.config';

const config = resolveConfig(tailwindConfig);
const { useBreakpoint } = create(config.theme.screens);
export default useBreakpoint;
