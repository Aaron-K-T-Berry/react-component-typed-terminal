import React, { useState, useEffect } from "react";
import Typed, { TypedOptions } from "typed.js";
import "./styles.css";

export const TypedTerminal: React.FunctionComponent<{
  title?: string;
  terminalData?: { command: string; results: string[] }[];
  promptText?: string;
  typedJsProps?: TypedOptions | {};
}> = ({
  title = "Typed Terminal",
  terminalData = [],
  promptText = "user@local:~ $",
  typedJsProps = {},
}) => {
  const [animationState, setAnimationState] = useState<boolean[]>(
    terminalData.map((_item, index) => (index == 0 ? true : false))
  );

  return (
    <div className={"TerminalWrapper"}>
      <div className={"TerminalTitle"}>{title}</div>
      <div className={"TerminalBody"}>
        {terminalData.map((item, index) => {
          const generateKey = () => {
            return `${item.command.toLowerCase().replace(" ", "")}_${index}`;
          };
          return (
            <TerminalLine
              key={generateKey()}
              hidden={!animationState[index]}
              promptText={promptText}
              typedJsProps={{
                // Combine the command and results into a single string separated
                // by new lines to get the effect of some terminal output
                strings: [item.command + "\n" + item.results.join("\n")],
                // When the line has completed its animation progress to the next one
                onComplete: () => {
                  let currentState = [...animationState];
                  currentState[index + 1] = true;
                  setAnimationState(currentState);
                },
                loop: false,
                typeSpeed: 40,
                showCursor: false,
                ...typedJsProps,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TypedTerminal;

export const TerminalLine: React.FunctionComponent<{
  promptText: string;
  hidden?: boolean;
  typedJsProps?: TypedOptions | {};
}> = ({ promptText, hidden = false, typedJsProps = {} }) => {
  // Create reference to store the DOM element containing the animation
  const targetEl = React.useRef(null);
  // Create reference to store the Typed instance itself
  const typed = React.useRef(null);

  useEffect(() => {
    if (!hidden) {
      if (!typed.current) {
        // elRef refers to the <span> rendered below
        (typed.current as unknown as Typed) = new Typed(
          targetEl.current as unknown as Element,
          typedJsProps
        );
      }
    }
  }, [hidden]);

  return (
    <div className={"TerminalLine"}>
      <span className={"TerminalPrompt"} hidden={hidden}>
        {promptText + " "}
      </span>
      <span className={"TerminalResults"} ref={targetEl} />
    </div>
  );
};
