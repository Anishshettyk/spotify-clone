import { css } from "styled-components/macro";
import theme from "./theme";
import media from "./media";
const { colors, fontSizes } = theme;

const mixins = {
  flexComman: css`
    display: flex;
    align-items: center;
  `,
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexColumn: css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  flexStart: css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
  `,

  engulf: css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
  `,

  outline: css`
    outline: 1px solid red;
  `,

  overflowEllipsis: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 1px;
  `,

  coverShadow: css`
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  `,
  coverShadowSmall: css`
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  `,

  greenButton: css`
    display: inline-block;
    color: ${colors.white};
    font-weight: 700;
    font-size: ${fontSizes.xs};
    letter-spacing: 1px;
    text-transform: uppercase;
    background-color: ${colors.green};
    border: none;
    border-radius: 50px;
    padding: 9px 33px;
    cursor: pointer;
    transition: ${theme.transition};
    &:hover,
    &:focus {
      transform: scale(1.04);
    }
    ${media.tablet`
    font-size:${fontSizes.xs};
    padding:7px 20px;
    `}
  `,

  greenOutlineButton: css`
    display: inline-block;
    background-color: transparent;
    color: ${colors.green};
    font-weight: 700;
    font-size: ${fontSizes.xs};
    letter-spacing: 1px;
    text-transform: uppercase;
    border-radius: 50px;
    padding: 9px 33px;
    margin: 20px 0;
    cursor: pointer;
    transition: ${theme.transition};
    &:hover,
    &:focus {
      transform: scale(1.04);
    }
    ${media.tablet`
    font-size:${fontSizes.xs};
    padding:7px 20px;
    `}
  `,
};

export default mixins;
