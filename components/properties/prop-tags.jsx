import { useFormData } from "../../lib/hooks/use-form-data.jsx";
import { useWorking } from "../../lib/http/http.js";
import { SaveButton } from "../widgets/save-button";
import { HStack } from "../widgets/hstack";
import axios from "axios";
import useSWR from "swr";
import { fetcher } from "../../lib/common/http";
import { Badge, CloseButton } from "react-bootstrap";

export function PropTags({ prop, className }) {
  const { data: comments, mutate: mutateComments } = useSWR(
    `/api/properties/${prop.id}/comments`,
    fetcher
  );

  const tags = comments?.filter((x) => x.tag) ?? [];

  return (
    <div className={className}>
      <PropTagForm prop={prop} mutateComments={mutateComments} />
      <div className="border p-3">
        {tags.map((tag) => (
          <HStack
            key={tag.id}
            className="justify-content-start w-auto d-inline-flex px-3"
          >
            <Badge className="border px-3">{tag.tag}</Badge>
            <div
              className="border bg-primary text-white rounded"
              style={{
                color: "white",
                fontSize: "10pt",
              }}
            >
              <CloseButton />
            </div>
          </HStack>
        ))}
      </div>
    </div>
  );
}

export function PropTagForm({ prop, mutateComments, className }) {
  const { formData, onChange } = useFormData({
    tag: "",
  });
  const { isWorking, wrapWorking } = useWorking();

  const onSubmit = wrapWorking(async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.post(`/api/properties/${prop.id}/save-comment`, {
        id_prop: prop.id,
        tag: formData.tag,
      });
      await mutateComments();
    } catch (e) {
      console.error(e);
    }
  });

  return (
    <div className={className}>
      <form onSubmit={onSubmit}>
        <HStack gap={3}>
          <input
            name="tag"
            placeholder="Tag (lowercase)"
            value={formData.tag}
            onChange={onChange}
            className="form-control bg-white"
          />
          <SaveButton type="submit" forceRunning={isWorking}>
            Save
          </SaveButton>
        </HStack>
      </form>
    </div>
  );
}
