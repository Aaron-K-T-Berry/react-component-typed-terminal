import * as React from "react";
import Typed from "typed.js";
import "./TypedTerminal.css";

export const TypedTerminal: React.FunctionComponent<{
  children?: React.ReactNode;
  title: string;
}> = (props) => {
  return (
    <div className={"TerminalWrapper"}>
      <div className={"TerminalTitle"}>{props.title}</div>
      <div className={"TerminalBody"}>{props.children}</div>
    </div>
  );
};

export const TerminalLine: React.FunctionComponent<{
  skill: { summary: string; extras: string[] };
  // TODO update this to be a display parameter
  show: boolean;
  // Change this to be an onSchreen parameter
  isVisible: boolean;
  onCompleteFunc: any;
  delay: number;
}> = (props) => {
  // Create reference to store the DOM element containing the animation
  const targetEl = React.useRef(null);
  // Create reference to store the Typed instance itself
  const typed = React.useRef(null);

  const showPromptText = (show: boolean) => (show ? "" : "none");

  // TODO this may be to specific for the example
  const buildTypedOutput = (
    summary: string,
    extras: string[],
    delay: number
  ) => {
    let cmd = `${summary}`;
    extras.map((str) => {
      cmd += `^${delay}\n    \`${str}\``;
    });
    return cmd;
  };

  React.useEffect(() => {
    if (props.show) {
      const options = {
        strings: [
          buildTypedOutput(
            props.skill.summary,
            props.skill.extras,
            props.delay
          ),
        ],
        loop: false,
        onComplete: props.onCompleteFunc,
        typeSpeed: 40,
        showCursor: false,
      };

      // TODO try and cleanup this more
      if (!typed.current) {
        // elRef refers to the <span> rendered below
        (typed.current as unknown as Typed) = new Typed(
          targetEl.current as unknown as Element,
          options
        );
      }

      return () => {
        if (typed.current) {
          // Make sure to destroy Typed instance during cleanup to prevent memory leaks
          (typed.current as Typed).destroy();
        }
      };
    }
  }, [props.show]);

  // Control if the
  React.useEffect(() => {
    // Check that the typed element has been placed on screen yet
    if (typed.current) {
      if (props.isVisible) {
        (typed.current as Typed).start();
      } else {
        (typed.current as Typed).stop();
      }
    }
  }, [props.isVisible]);

  // TODO make the prompt configurable
  return (
    <div style={{ paddingBottom: "0.5rem" }}>
      <span style={{ color: "#ff00df", display: showPromptText(props.show) }}>
        user@local:~${" "}
      </span>
      <span style={{ whiteSpace: "pre" }} ref={targetEl} />
    </div>
  );
};
