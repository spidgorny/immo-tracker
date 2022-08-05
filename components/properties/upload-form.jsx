import axios from "axios";
import { useWorking } from "../../lib/http/http.js";
import { Button } from "react-bootstrap";
import { SaveButton } from "../widgets/save-button.js";

export async function readBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = function (event) {
      // Convert file to Base64 string
      // btoa is built int javascript function for base64 encoding
      resolve(btoa(event.target.result));
    };
  });
}

export function UploadForm({ prop, mutateComments }) {
  const { isWorking, wrapWorking } = useWorking();

  const onSubmit = wrapWorking(async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
    let file = formData.get("file");
    console.log(file);
    if (!file.name) {
      return;
    }
    let arrayBuffer = await file.arrayBuffer();
    // const blob = new Blob([arrayBuffer], { type: file.type });
    // console.log(blob);

    const base64 = await readBase64(file);
    console.log(base64);

    const { data } = await axios.post(
      `/api/properties/${prop.id}/upload-file`,
      {
        id_prop: prop.id,
        file_name: file.name,
        file_type: file.type,
        file: base64,
      }
    );
    // console.log(data);
    await mutateComments();
  });

  return (
    <form onSubmit={onSubmit} className="w-100">
      <div className="input-group my-3">
        <input name="user" placeholder="User" className="form-control" />
      </div>

      <div className="input-group my-3">
        <input
          type="file"
          name="file"
          placeholder="File"
          className="form-control"
        />
      </div>

      <div className="input-group my-3">
        <SaveButton type="submit" forceRunning={isWorking}>
          Upload
        </SaveButton>
      </div>
    </form>
  );
}
