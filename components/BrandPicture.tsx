const FILES = {
  lockup: { light: "/brand/b4u-lockup-light.svg", dark: "/brand/b4u-lockup-dark.svg" },
  mark: { light: "/brand/b4u-mark-light.svg", dark: "/brand/b4u-mark-dark.svg" },
} as const;

type Props = {
  kind: keyof typeof FILES;
  width: number;
  height: number;
  /** "" when the logo sits next to text that already names Built4You. */
  alt: string;
  /** Above the fold: fetch early. Otherwise the image loads lazily. */
  priority?: boolean;
  className?: string;
};

/** A brand logo that swaps to its dark-ground file in dark mode. */
export function BrandPicture({ kind, width, height, alt, priority = false, className }: Props) {
  const files = FILES[kind];
  return (
    <picture className={className}>
      <source srcSet={files.dark} media="(prefers-color-scheme: dark)" />
      {/* A plain <img>: next/image can't sit inside <picture> art direction. */}
      <img
        src={files.light}
        width={width}
        height={height}
        alt={alt}
        translate="no"
        fetchPriority={priority ? "high" : undefined}
        loading={priority ? undefined : "lazy"}
        className="block"
      />
    </picture>
  );
}
