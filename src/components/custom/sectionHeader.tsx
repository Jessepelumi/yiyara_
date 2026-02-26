import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";

interface SectionHeaderButtonProps {
    text: string;
    onClick: () => void;
}

export const SectionHeaderButton = ({text, onClick}: SectionHeaderButtonProps) => {
  return (
    <button onClick={onClick} className="flex gap-1 items-center text-gray-500 hover:text-blue-700">
      {text}
      <CaretDownIcon size={18} />
    </button>
  );
};
