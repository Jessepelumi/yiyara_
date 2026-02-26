interface ExamplePromptCardProps {
  text: string;
  onClick: () => void;
}

export const ExamplePromptCard = ({ text, onClick }: ExamplePromptCardProps) => {
  return (
    <button onClick={onClick} className=" p-2 rounded-lg text-xs text-gray-500 bg-linear-to-r from-blue-50 via-purple-50 via-40% to-purple-100 hover:bg-linear-to-r hover:from-blue-100 hover:via-purple-100 hover:via-40% hover:to-purple-200 text-left">
      &quot;{text}&quot;
    </button>
  );
};
