interface NavElements {
  name: string
  url: string
  icon?: object
  enabled?: boolean
  external?: boolean
}

export interface NavItems {
  title: string
  elements: NavElements[]
}
