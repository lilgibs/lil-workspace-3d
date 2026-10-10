const base = "primary-button inline-flex items-center justify-center rounded-[7px] border border-green bg-green leading-normal font-[550] text-white no-underline transition-[background,transform] duration-200 not-disabled:hover:bg-[#25563f] motion-safe:not-disabled:hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transition-none disabled:cursor-not-allowed";

const sizes = {
  hero: "min-h-[54px] gap-[34px] px-6 text-sm max-phone:gap-[35px] max-phone:px-[22px]",
  compact: "min-h-11 gap-[34px] px-4 text-[13px] disabled:opacity-[.48]",
  review: "min-h-[46px] gap-3 px-[18px] text-[13px] disabled:translate-y-0 disabled:border-[#d3dac7] disabled:bg-[#e9ecdf] disabled:text-[#626d59] disabled:opacity-[.48] max-phone:min-h-11 max-phone:w-full",
  rental: "min-h-[54px] gap-6 px-6 text-sm disabled:translate-y-0 disabled:opacity-50 max-phone:px-[22px]",
} as const;

export function primaryButtonStyles(size: keyof typeof sizes) {
  return base + " " + sizes[size];
}

export const secondaryButtonStyles = "secondary-button min-h-11 cursor-pointer rounded-[7px] border border-[#bdc9ad] bg-[#fcfbf6] px-4 text-[13px] leading-normal text-green";
