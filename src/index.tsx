/**
 * @function ExampleComponent
 */

import * as React from "react";

/**
 * Takes a value and returns a px string for numbers and passes strings through
 * 
 * @param value number or string like 100%
 */
const convertCssValue = (value: number | string) => `${typeof value === "number" ? `${value}px` : value}`

export interface TinyGridProps {
  margin?: number | string;
  gutter?: number | string;
  width?: number | string;
  columns?: number;
  color?: string;
  key?: string;
  targetKey?: string;
  isDebugging?: boolean;
  zIndex?: number;
}

const TinyGrid = ({
  margin = 16,
  gutter = 16,
  width = "auto",
  columns = 12,
  color = "rgba(255,0,0,0.1)",
  targetKey = "g",
  isDebugging = false,
  zIndex = 100
}: TinyGridProps): JSX.Element => {
  const columnArray = new Array(columns).fill(null);

  let onKeyDown: any, onKeyUp: any;

  const [isKeyDown, setIsKeyDown] = React.useState(false);

  const onKeyDownLocal = React.useCallback(
    e => {
      if (isDebugging) {
        console.log(
          "key down",
          e.key,
          e.key != targetKey ? "- isn't triggered" : "- is triggered"
        );
      }

      if (e.key != targetKey) return;
      setIsKeyDown(true);
      if (typeof onKeyDown != "function") return;
      onKeyDown(e);
    },
    [isKeyDown]
  );
  const onKeyUpLocal = React.useCallback(
    e => {
      if (isDebugging) {
        console.log(
          "key up",
          e.key,
          e.key != targetKey ? "- isn't triggered" : "- is triggered"
        );
      }
      if (e.key != targetKey) return;
      setIsKeyDown(false);
      if (typeof onKeyUp != "function") return;
      onKeyUp(e);
    },
    [isKeyDown]
  );

  React.useEffect(() => {
    addEventListener("keydown", onKeyDownLocal);
    addEventListener("keyup", onKeyUpLocal);
    return () => {
      removeEventListener("keydown", onKeyDownLocal);
      removeEventListener("keyup", onKeyUpLocal);
    };
  }, []);

  return (
    <div
      style={{
        pointerEvents: "none",
        position: "fixed",
        display: isKeyDown ? "flex" : "none",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: convertCssValue(margin),
        width: convertCssValue(width),
        zIndex
      }}
    >
      {columnArray.map((c, i) => {
        return (
          <TinyGridItem key={i} index={i} gutter={gutter} color={color} c={c} />
        );
      })}
    </div>
  );
};

interface TinyGridItemProps {
  gutter: number | string;
  color: string;
  index: number;
  c: any;
}

const TinyGridItem = ({ gutter, color, index }: TinyGridItemProps) => {
  return (
    <div
      style={{
        position: "relative",
        padding: `0 ${convertCssValue(gutter)}`,
        background: color,
        border: `1px solid ${color}`,
        borderTop: 0,
        borderBottom: 0,
        width: "100%",
        boxSizing: "border-box"
      }}
    >
      <div
        style={{
          background: color,
          position: "relative",
          height: "100%",
          width: "100%",
          color: "transparent"
        }}
      >
        {index + 1}
      </div>
    </div>
  );
};

export default TinyGrid;
