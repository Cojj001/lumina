// app/modules/[id]/page.js
import { useRouter } from "next/router";

export default function ModulePage({ params }) {
  const { id } = params;

  // Fetch module data based on ID
  // const module = await fetchModuleById(id);

  return (
    <div>
      <h1>Module {id}</h1>
      {/* Display module content here */}
    </div>
  );
}
