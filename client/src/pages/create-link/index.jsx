import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

function matchYoutubeUrl(url) {
  let p =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url.match(p)) {
    return true;
  }
  return false;
}

export default function CreateLink() {
  const [isValid, setValidUrl] = useState(false);
  const [url, setUrl] = useState("");
  const handleSubmit = async () => {
    if (!isValid) {
      toast.error("Youtube Url is not valid!");

      return;
    } else {
      try {
        await axios.post("/api/link", {
          url,
        });
        toast.success("You are successfully shared your URL");
      } catch (error) {
        console.log(error);
        toast.error(error?.message);
      }
    }
  };

  const handleChange = async (e) => {
    setValidUrl(matchYoutubeUrl(e));
    setUrl(e);
  };
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="shadow-lg p-3 w-50">
        <Form>
          <FormGroup row>
            <Label for="url" sm={3}>
              Youtube Url
            </Label>
            <Col sm={9}>
              <Input
                name="url"
                placeholder="https://"
                onChange={(e) => handleChange(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col
              sm={{
                offset: 3,
                size: 12,
              }}
            >
              <Button onClick={handleSubmit} color="primary">
                Submit
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
}
