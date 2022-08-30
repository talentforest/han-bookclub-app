import { useEffect, useState } from "react";
import { Container } from "theme/commonStyle";
import { getCollection } from "util/getFirebaseDoc";
import UpdateCreateBox from "components/updateRequest/UpdateCreateBox";
import UpdateRequestBox from "components/updateRequest/UpdateRequestBox";

const UpdateRequest = () => {
  const [request, setRequest] = useState("");
  const [requestDoc, setRequestDoc] = useState([]);

  useEffect(() => {
    getCollection("Update Request", setRequestDoc);
  }, []);

  return (
    <Container>
      <UpdateCreateBox request={request} setRequest={setRequest} />
      <ul>
        {requestDoc.map((item) => (
          <UpdateRequestBox key={item.id} item={item} />
        ))}
      </ul>
    </Container>
  );
};

export default UpdateRequest;
