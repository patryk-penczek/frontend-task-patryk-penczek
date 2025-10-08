type InputProps = {
  handleSubmit: (e: React.FormEvent) => void;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

const Input = ({ handleSubmit, inputValue, setInputValue }: InputProps) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 sm:p-8 border-b border-gray-100"
    >
      <div className="relative">
        <input
          placeholder="Example"
          type="text"
          maxLength={40}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="block w-full rounded-xl border-0 py-4 px-5 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all duration-200 text-base sm:text-lg"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium text-sm"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default Input;
