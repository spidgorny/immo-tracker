import useSWR from "swr";
import { fetcher } from "../../lib/common/http";
import { Badge, Button, Col, Row, Spinner } from "react-bootstrap";
import { getFormData } from "../../lib/common/form";
import axios from "axios";
import { HStack } from "../widgets/hstack";
import Image from "next/image";
import { UploadForm } from "./upload-form.jsx";
import { useWorking } from "../../lib/http/http.js";
import { SaveButton } from "../widgets/save-button.js";

export function PropComments({ prop }) {
  const { data: comments, mutate: mutateComments } = useSWR(
    `/api/properties/${prop.id}/comments`,
    fetcher
  );

  if (comments === undefined) {
    return <Spinner animation="border" />;
  }

  return (
    <div className="my-3">
      <p>Comments [{comments.length}]:</p>
      <HStack
        className="justify-content-between flex-grow align-items-stretch
        flex-column flex-sm-row"
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
    <form onSubmit={onSubmit} className="w-100">
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
        <SaveButton type="submit">Save Comment</SaveButton>
      </div>
    </form>
  );
}
