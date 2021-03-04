import React from "react";
import styled from "styled-components";
import { useSwipeable } from "react-swipeable";
import { theme, mixins, media } from "../../styles/";
import { Tooltip } from "@material-ui/core";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const { colors } = theme;

const CarouselHeading = styled.section`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.grey};
  margin: 0px 0px 15px;
  h2 {
    font-size: 26px;
    letter-spacing: 0.25px;
    margin: 0;
    ${media.tablet`
    font-size:16px;
    `};
  }
  p {
    color: ${colors.lightGrey};
    margin: 5px 0px 5px;
    font-size: 13px;
    font-weight: bold;
  }
  .button__Container {
    ${mixins.flexComman}
    button {
      padding: 0;
      margin: 0;
      margin: 0px 5px;
      padding: 5px;
      svg {
        font-size: 22px;
        color: ${colors.green};
        ${media.tablet`
        font-size:15px;
      `}
      }
    }
  }
`;

const CarouselContainer = styled.div`
  display: flex;
  transition: ${(props) => (props.sliding ? "none" : "transform 1s ease")};
  justify-content: space-between;
  margin-bottom: 30px;
`;

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

const CarouselSlot = styled.div`
  order: ${(props) => props.order};
`;

const NEXT = "NEXT";
const PREV = "PREV";

const getOrder = ({ index, pos, numItems }) => {
  return index - pos < 0 ? numItems - Math.abs(index - pos) : index - pos;
};

const initialState = { pos: 0, sliding: false, dir: NEXT };

const Carousel = ({ children, title, discription }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const numItems = React.Children.count(children);
  const slide = (dir) => {
    dispatch({ type: dir, numItems });
    setTimeout(() => {
      dispatch({ type: "stopSliding" });
    }, 50);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => slide(NEXT),
    onSwipedRight: () => slide(PREV),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div>
      {numItems > 0 && (
        <CarouselHeading>
          <div>
            <h2>{title || "No heading"}</h2>
            <p>{discription || ""}</p>
          </div>

          <div className="button__Container">
            <Tooltip title="Prev">
              <button onClick={() => slide(PREV)}>
                <ChevronLeftIcon />
              </button>
            </Tooltip>
            <Tooltip title="Next">
              <button onClick={() => slide(NEXT)}>
                <ChevronRightIcon />
              </button>
            </Tooltip>
          </div>
        </CarouselHeading>
      )}

      <div {...handlers}>
        <Wrapper>
          <CarouselContainer dir={state.dir} sliding={state.sliding}>
            {React.Children.map(children, (child, index) => (
              <CarouselSlot
                key={index}
                order={getOrder({ index: index, pos: state.pos, numItems })}
              >
                {child}
              </CarouselSlot>
            ))}
          </CarouselContainer>
        </Wrapper>
      </div>
    </div>
  );
};

function reducer(state, { type, numItems }) {
  switch (type) {
    case "reset":
      return initialState;
    case PREV:
      return {
        ...state,
        dir: PREV,
        sliding: true,
        pos: state.pos === 0 ? numItems - 1 : state.pos - 1,
      };
    case NEXT:
      return {
        ...state,
        dir: NEXT,
        sliding: true,
        pos: state.pos === numItems - 1 ? 0 : state.pos + 1,
      };
    case "stopSliding":
      return { ...state, sliding: false };
    default:
      return state;
  }
}

export default Carousel;
