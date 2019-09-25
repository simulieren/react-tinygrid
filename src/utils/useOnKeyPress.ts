import { useCallback, useState, useEffect } from "react";

const useOnKeyPress = (
  targetKey: string,
  onKeyDown: any,
  onKeyUp: any,
  isDebugging: boolean = false
) => {
  const [isKeyDown, setIsKeyDown] = useState(false);
  const onKeyDownLocal = useCallback(
    e => {
      if (isDebugging)
        console.log(
          "key down",
          e.key,
          e.key != targetKey ? "- isn't triggered" : "- is triggered"
        );
      if (e.key != targetKey) return;
      setIsKeyDown(true);
      if (typeof onKeyDown != "function") return;
      onKeyDown(e);
    },
    [isKeyDown]
  );
  const onKeyUpLocal = useCallback(
    e => {
      if (isDebugging)
        console.log(
          "key up",
          e.key,
          e.key != targetKey ? "- isn't triggered" : "- is triggered"
        );
      if (e.key != targetKey) return;
      setIsKeyDown(false);
      if (typeof onKeyUp != "function") return;
      onKeyUp(e);
    },
    [isKeyDown]
  );
  useEffect(() => {
    addEventListener("keydown", onKeyDownLocal);
    addEventListener("keyup", onKeyUpLocal);
    return () => {
      removeEventListener("keydown", onKeyDownLocal);
      removeEventListener("keyup", onKeyUpLocal);
    };
  }, []);
  return isKeyDown;
};

export default useOnKeyPress;
