import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import YouTube from "react-youtube";
import "./index.css";

export function youtubeParser(url) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
}

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

  const renderYoutubeView = (url) => {
    return (
      <YouTube
        videoId={youtubeParser(url)} // defaults -> ''
        opts={{ height: "390", width: "540" }}
      />
    );
  };

  useEffect(() => {
    getYoutubeLink();
  }, []);

  return (
    <>
      {data?.length === 0 ? (
        <div className="text-center">No data</div>
      ) : (
        data.map((e) => (
          <Card className="d-flex flex-row mb-3" key={e._id}>
            {/* {getYouTubeTitle(e.url)} */}
            <div>{renderYoutubeView(e.url)}</div>
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
        ))
      )}
    </>
  );
}
