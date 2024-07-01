export type selectConcernsType = {
  id: string,
  name: string,
  selected: boolean,
  // checked: boolean, 
}

export type communityType = {
  id: string,
  name: string,
  address: string,
}


export type concernType = {
  id: string,
  name: string,
  hint: string,
  say: string,
}

export type phoneType = {
  id: string,
  phone_number: string,
  primary: boolean,
  type: "cell" | "home" | "business",
}

export type residentType = {
  id: string,
  first_name: string,
  last_name: string,
  ownder: boolean,
}

export type houseType = {
  id: string,
  address: string,
  member_id: string,
  security_code: string,
  image: string,
  note: string,
  phones: phoneType[],
  residents: residentType[],
}
