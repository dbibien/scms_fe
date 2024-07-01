export type selectConcernsType = {
  id: string,
  name: string,
  selected: boolean,
  // checked: boolean, 
}

export type concernType = {
  id: string,
  name: string,
  hint: string,
  say: string,
}

export type houseType = {
  id: string,
  address: string,
  member_id: string,
  security_code: string,
  image: string,
  note: string,
}
