import useSWR from "swr";
import { fetcher } from "../../lib/common/http";
import { Col, Row, Spinner } from "react-bootstrap";
import { getFormData } from "../../lib/common/form";
import axios from "axios";
import { HStack } from "../widgets/hstack";

export function PropComments({ prop }) {
  const { data: comments, mutate: mutateComments } = useSWR(
    `/api/properties/${prop.id}/comments`,
    fetcher
  );

  if (comments === undefined) {
    return <Spinner animation="border" />;
  }

  return (
    <div>
      <p>Comments [{comments.length}]:</p>
      <CommentForm prop={prop} mutateComments={mutateComments} />
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
          {comment.message} {comment.tag} {comment.image}
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
    <form onSubmit={onSubmit}>
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
