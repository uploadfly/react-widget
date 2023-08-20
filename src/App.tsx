import { UfWidget } from ".";
import { MdUpload } from "react-icons/md";

const App = () => {
  return (
    <div className="flex justify-between py-5 px-10">
      <h1>Uploadfly</h1>
      <UfWidget apiKey="" accentColor="#f945ab">
        <button className="bg-orange-500 flex items-center gap-2 px-8 py-3 rounded-full text-white font-semibold">
          <MdUpload />
          Upload
        </button>
      </UfWidget>
    </div>
  );
};

export default App;
