import { ReactComponent as User } from "assets/account_circle.svg";
import styled from "styled-components";

const Reviews = () => {
  return (
    <Review>
      <div>
        <User width="16" height="16" />
        <span>전예림</span>
      </div>
      <p>
        저는 이번책은 조금 어려웠는데 같이 얘기하면서 많이 이해했고 책이
        재미있어졌어요! 역시 책은 같이 얘기해야 제맛!
      </p>
    </Review>
  );
};

const Review = styled.div`
  margin: 10px 0;
  padding: 10px 3px;
  font-size: 13px;
  border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
  > div {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    font-size: 12px;
    > svg {
      margin-right: 3px;
    }
  }
`;

export default Reviews;
