import { ReactComponent as BookIcon } from "assets/edit_note.svg";
import { ReactComponent as SubjectIcon } from "assets/subject.svg";
import styled from "styled-components";
import { useEffect } from "react";

const MyRecords = () => {
  useEffect(() => {}, []);

  return (
    <Record>
      <img src={require("assets/떨림과_울림.jpeg")} alt="Book" />
      <div>
        <h3>떨림과 울림</h3>
        <div>
          <button>
            <BookIcon />
            <span>발제문</span>
          </button>
          <button>
            <SubjectIcon />
            <span>에세이</span>
          </button>
        </div>
      </div>
    </Record>
  );
};

const Record = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  img {
    height: 40px;
    width: auto;
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.5);
    margin-right: 20px;
  }
  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h3 {
      font-size: 10px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    > div {
      display: flex;
      > button:first-child {
        margin-left: 0px;
      }
      button {
        cursor: pointer;
        display: flex;
        align-items: end;
        border: none;
        background-color: transparent;
        svg {
          width: 18px;
          height: 18px;
          margin-right: 4px;
        }
        span {
          font-size: 10px;
        }
        &:hover {
          span {
            color: ${(props) => props.theme.text.accent};
          }
          svg {
            fill: ${(props) => props.theme.text.accent};
          }
        }
      }
    }
  }
`;

export default MyRecords;
