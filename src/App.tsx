import { UfWidget } from ".";
import { MdUpload } from "react-icons/md";

const App = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <UfWidget apiKey="uf_e9f7ab5db69c4952b35151b72f89a609" hideAttribution>
        <button className="bg-orange-500 flex items-center gap-2 px-8 py-3 rounded-full text-white font-semibold">
          <MdUpload />
          Upload
        </button>
      </UfWidget>
    </div>
  );
};

export default App;
