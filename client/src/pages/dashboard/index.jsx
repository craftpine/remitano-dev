import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

import "./index.css";

export default function Dashboard() {
  const [data, setData] = useState([]);

  const getYoutubeLink = async () => {
    try {
      const res = await axios.get("/api/link");

      setData(res.data.response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getYoutubeLink();
  }, []);

  
  return (
    <>
      {data.map((e) => (
        <Card className="d-flex flex-row mb-3" key={e._id}>
          {/* {getYouTubeTitle(e.url)} */}
          <div>
            <img alt="Card image" src="https://picsum.photos/300/200" />
          </div>
          <CardBody>
            <CardTitle tag="h5">
              <a href={e.url} target="_blank" rel="noreferrer">
                {e?.title}
              </a>
            </CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              <div>Shared by: {e?.createdBy?.username}</div>
            </CardSubtitle>
            <CardText className="text-truncate-text">
              <div>Description: {e?.description}</div>
            </CardText>
          </CardBody>
        </Card>
      ))}
    </>
  );
}
