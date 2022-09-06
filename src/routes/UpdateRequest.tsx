import { useEffect, useState } from "react";
import { Container } from "theme/commonStyle";
import { getCollection } from "util/getFirebaseDoc";
import UpdateCreateBox from "components/updateRequest/UpdateCreateBox";
import UpdateRequestBox from "components/updateRequest/UpdateRequestBox";

const UpdateRequest = () => {
  const [requestDoc, setRequestDoc] = useState([]);

  useEffect(() => {
    getCollection("Update Request", setRequestDoc);
  }, []);

  return (
    <Container>
      <UpdateCreateBox />
      <ul>
        {requestDoc.map((request) => (
          <UpdateRequestBox key={request.id} request={request} />
        ))}
      </ul>
    </Container>
  );
};

export default UpdateRequest;
