import app/data/loop.{Action, Model, Noop}
import lustre
import lustre/cmd.{Cmd}
import lustre/element.{Element, div, text}
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
  div([class("flex justify-center items-center h-screen text-red-400 font-bold text-2xl hover:text-blue-400")], [text("Gleam Web Temp")])
}
