interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const SectionContainer = ({
  children,
  className,
  id,
}: SectionContainerProps) => {
  return (
    <div
      id={id}
      className={`mx-auto max-w-7xl px-5 lg:px-0 space-y-5.5 lg:space-y-7.5 ${className}`}
    >
      {children}
    </div>
  );
};
