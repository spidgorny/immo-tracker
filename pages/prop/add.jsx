import { useWorking } from "../../lib/http/http~";
import { SaveButton } from "../../components/widgets/save-button.js";
import { getFormData } from "../../lib/common/form";
import axios from "axios";
import { useRouter } from "next/router";

export default function AddProp() {
  const router = useRouter();
  const { isWorking, wrapWorking } = useWorking();

  const onSubmit = wrapWorking(async (e) => {
    e.preventDefault();
    const formData = getFormData(e.target);
    const { data } = await axios.post("/api/properties/add", formData);
    const { insertId } = data;
    if (insertId) {
      await router.push(`/prop/${insertId}`);
    }
    try {
    } catch (e) {
      console.error(e);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="input-group my-3">
        <input name="user" placeholder="User" className="form-control" />
      </div>

      <div className="input-group my-3">
        <input name="url" placeholder="URL" className="form-control" />
      </div>

      <div className="input-group my-3">
        <input name="name" placeholder="Name" className="form-control" />
      </div>

      <div className="input-group my-3">
        <input
          name="price"
          placeholder="Price"
          type="number"
          className="form-control"
        />
      </div>

      <div className="input-group my-3">
        <input
          name="area"
          placeholder="Area"
          type="number"
          className="form-control"
        />
      </div>

      <div className="input-group my-3">
        <SaveButton type="submit" forceRunning={isWorking}>
          Add
        </SaveButton>
      </div>
    </form>
  );
}
