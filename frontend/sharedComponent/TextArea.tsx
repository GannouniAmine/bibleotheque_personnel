export default function TextareaInput(props: any) {
  const { label, name, value, onChange, disabled = false } = props;
  return (
    <div className="col-span-6">
      <label className="block text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <textarea
        title="ha"
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        disabled={disabled}
        className="w-full p-2 border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
      />
    </div>
  );
}