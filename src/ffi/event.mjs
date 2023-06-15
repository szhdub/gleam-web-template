import * as React from "react";
import * as ReactDOM from "react-dom/client";


export function getEventTargetValue(event) {
  return event.target.value || "";
}

export function getEventTargetChecked(event) {
  return event.target.checked || false;
}

export function preventDefault(event) {
  event.preventDefault();
}

export function getEventKey(event) {
  return event.key || "";
}


export function getSearch() {
  return window.location.search
}



export const mount = (app, selector) => {
  const el = document.querySelector(selector);

  if (!el) {
    console.warn(
      [
        "[lustre] Oops, it looks like I couldnt find an element on the ",
        'page matching the selector "' + selector + '".',
        "",
        "Hint: make sure you arent running your script before the rest of ",
        "the HTML document has been parsed! you can add the `defer` attribute ",
        "to your script tag to make sure that cant happen.",
      ].join("\n")
    );

    return Promise.reject();
  }

  let dispatchRef = null;
  let dispatchPromise = new Promise((resolve) => (dispatchRef = resolve));

  ReactDOM.createRoot(el).render(
    React.createElement(
      React.StrictMode,
      null,
      React.createElement(
        React.forwardRef((_, ref) => {
          // When wrapped in `<React.StrictMode />` and when in development
          // mode, React will run effects (and some other hooks) twice to
          // help us debug potential issues that arise from impurity.
          //
          // This is a problem for our cmds because they are intentionally
          // impure. We can/should expect user code to be pure, but we want
          // to allow top-level impurity in the form of cmds.
          //
          // So we can keep the benefits of strict mode, we add an additional
          // bit of state to track whether we need to run the cmds we have or
          // not.
          const [shouldRunCmds, setShouldRunCmds] = React.useState(true);
          const [[state, cmds], dispatch] = React.useReducer((state, msg) => {
            

            // Every time we call the user's update function we'll get back a
            // new lot of cmds to run, so we need to set this flag to true to
            // let our `useEffect` know it can run them!
            setShouldRunCmds(true);
            return app.update(state, msg);
          }, app.init);

          React.useImperativeHandle(ref, () => dispatch, [dispatch]);
          React.useEffect(() => {
            if (shouldRunCmds && cmds) {
              for (const cmd of Cmd.to_list(cmds)) {
                cmd(dispatch);
              }

              // Once we've performed the side effects, we'll toggle this flag
              // back to false so we don't run them again on subsequent renders
              // or during development.
              setShouldRunCmds(false);
            }
          }, [cmds, shouldRunCmds]);

          return React.createElement(
            Dispatcher.Provider,
            { value: dispatch },
            React.createElement(({ state }) => app.render(state), { state })
          );
        }),
        { ref: dispatchRef }
      )
    )
  );

  return dispatchPromise;
};
