// Model -----------------------------------------------------------------------

pub type Model {
  Model(query: String)
}

pub fn init(query: String) -> Model {
  Model(query: query)
}

// UPDATE ----------------------------------------------------------------------

pub type Action {
  Noop
}
