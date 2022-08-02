import useSWR from "swr";
import { fetcher } from "../../lib/common/http";
import { Badge, Col, Row, Spinner } from "react-bootstrap";
import { getFormData } from "../../lib/common/form";
import axios from "axios";
import { HStack } from "../widgets/hstack";
import Image from "next/image";

export function PropComments({ prop }) {
  const { data: comments, mutate: mutateComments } = useSWR(
    `/api/properties/${prop.id}/comments`,
    fetcher
  );

  console.log(comments);

  if (comments === undefined) {
    return <Spinner animation="border" />;
  }

  return (
    <div>
      <p>Comments [{comments.length}]:</p>
      <HStack
        className="justify-content-between flex-grow align-items-stretch"
        gap={3}
      >
        <CommentForm prop={prop} mutateComments={mutateComments} />
        <UploadForm prop={prop} mutateComments={mutateComments} />
      </HStack>
      {comments.map((x) => (
        <CommentRow key={x.id} comment={x} />
      ))}
    </div>
  );
}

export function CommentRow({ comment }) {
  return (
    <Row className="my-3">
      <Col className="border rounded p-3">
        <HStack>
          <div>{comment.user}</div>
          <div>{comment.created_at}</div>
        </HStack>
        <pre>
          {comment.message} {comment.tag && <Badge>{comment.tag}</Badge>}
          {comment.file_url && (
            <a
              href={comment.file_url}
              target="_blank"
              rel="noreferrer"
              alt="Image"
            >
              <Image src={comment.file_url} width={128} height={128} />
            </a>
          )}
        </pre>
      </Col>
    </Row>
  );
}

export function CommentForm({ prop, mutateComments }) {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = getFormData(e.target);
    if (!formData.message) {
      return;
    }
    // console.log(formData);
    const { data } = await axios.post(
      `/api/properties/${prop.id}/save-comment`,
      {
        id_prop: prop.id,
        ...formData,
      }
    );
    // console.log(data);
    await mutateComments();
  };

  return (
    <form onSubmit={onSubmit} className="w-50">
      <div className="input-group my-3">
        <input name="user" placeholder="User" className="form-control" />
      </div>
      <div className="input-group my-3">
        <textarea
          name="message"
          placeholder="Message"
          className="form-control"
        />
      </div>
      <div className="input-group my-3">
        <button type="submit">Save Comment</button>
      </div>
    </form>
  );
}

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
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
    let file = formData.get("file");
    console.log(file);
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
  };

  return (
    <form onSubmit={onSubmit} className="w-50">
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
        <button type="submit">Upload</button>
      </div>
    </form>
  );
}
