import { useEffect, useState } from "react";
import { Container } from "theme/commonStyle";
import { getUpdateRequestDoc } from "util/getFirebaseDoc";
import BackButtonHeader from "components/common/BackButtonHeader";
import UpdateCreateBox from "components/updateRequest/UpdateCreateBox";
import UpdateRequestBox from "components/updateRequest/UpdateRequestBox";

const UpdateRequest = () => {
  const [request, setRequest] = useState("");
  const [requestDoc, setRequestDoc] = useState([]);

  useEffect(() => {
    getUpdateRequestDoc(setRequestDoc);
    return () => {
      getUpdateRequestDoc(setRequestDoc);
    };
  }, []);

  return (
    <>
      <BackButtonHeader title="업데이트 요청하기" />
      <Container>
        <UpdateCreateBox request={request} setRequest={setRequest} />
        <ul>
          {requestDoc.map((item) => (
            <UpdateRequestBox key={item.id} item={item} />
          ))}
        </ul>
      </Container>
    </>
  );
};

export default UpdateRequest;
