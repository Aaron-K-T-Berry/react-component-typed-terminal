import * as React from "react";
import Typed, { TypedOptions } from "typed.js";
import "./TypedTerminal.css";

export const TypedTerminal: React.FunctionComponent<{
  title: string;
  terminalData: { command: string; results: string[] }[];
  promptText: string;
  typedJsProps?: TypedOptions | {};
}> = (props) => {
  const [animationState, setAnimationState] = React.useState(
    props.terminalData.map((item, index) => (index == 0 ? true : false))
  );

  return (
    <div className={"TerminalWrapper"}>
      <div className={"TerminalTitle"}>{props.title}</div>
      <div className={"TerminalBody"}>
        {props.terminalData.map((item, index) => {
          const generateKey = () => {
            return `${item.command.toLowerCase().replace(" ", "")}_${index}`;
          };
          return (
            <TerminalLine
              key={generateKey()}
              hidden={!animationState[index]}
              promptText={props.promptText}
              command={item.command}
              results={item.results}
              typedJsProps={{
                // Combine the command and results into a single string separated
                // by new lines to get the effect of some terminal output
                strings: [item.command + "\n" + item.results.join("\n")],
                loop: false,
                typeSpeed: 40,
                showCursor: false,
                // When the line has completed its animation progress to the next one
                onComplete: () => {
                  let currentState = [...animationState];
                  currentState[index + 1] = true;
                  setAnimationState(currentState);
                },
                ...props.typedJsProps,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

TypedTerminal.defaultProps = {
  title: "Typed Terminal",
  terminalData: [],
  promptText: "user@local:~$",
};

export const TerminalLine: React.FunctionComponent<{
  command: string;
  results: string[];
  hidden: boolean;
  promptText: string;
  typedJsProps?: TypedOptions | {};
}> = (props) => {
  // Create reference to store the DOM element containing the animation
  const targetEl = React.useRef(null);
  // Create reference to store the Typed instance itself
  const typed = React.useRef(null);

  React.useEffect(() => {
    if (!props.hidden) {
      // TODO try and cleanup this more
      if (!typed.current) {
        // elRef refers to the <span> rendered below
        (typed.current as unknown as Typed) = new Typed(
          targetEl.current as unknown as Element,
          props.typedJsProps ?? {}
        );
      }

      return () => {
        if (typed.current) {
          // Make sure to destroy Typed instance during cleanup to prevent memory leaks
          (typed.current as Typed).destroy();
        }
      };
    }
  }, [props.hidden]);

  return (
    // TODO fix this styling
    <div className={"TerminalLine"}>
      <span className={"TerminalPrompt"} hidden={props.hidden}>
        {props.promptText + " "}
      </span>
      <span style={{ whiteSpace: "pre" }} ref={targetEl} />
    </div>
  );
};

TerminalLine.defaultProps = {
  hidden: false,
  typedJsProps: {},
};
