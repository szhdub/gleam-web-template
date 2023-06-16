import app/loop.{Action, Model, Noop}
import lustre
import lustre/cmd.{Cmd}
import lustre/element.{Element, div, span, text}
import lustre/attribute.{class}

pub fn main(selector: String, query: String) -> Nil {
  let assert Ok(_) =
    #(loop.init(query), cmd.batch([]))
    |> lustre.application(update, render)
    |> lustre.start(selector)

  Nil
}

fn update(m: Model, action: Action) -> #(Model, Cmd(Action)) {
  case action {
    Noop -> #(m, cmd.none())
  }
}

fn render(m: Model) -> Element(Action) {
  div(
    [class("flex justify-center items-center h-screen")],
    [
      div(
        [
          class(
            "text-blue-400 hover:text-green-400 font-bold text-2xl flex space-x-2",
          ),
        ],
        [
          span(
            [class("leading-10 bolder")],
            [text("Gleam Web Template " <> m.query)],
          ),
          span([class("loading loading-dots loading-lg")], []),
        ],
      ),
    ],
  )
}
