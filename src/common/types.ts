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


export type concernCardType = {
  concern: concernType
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
  owner: boolean,
}

export type houseType = {
  id: string,
  address: string,
  apt: string,
  city: string,
  state: string,
  zip: string,
  member_number: string,
  security_code: string,
  image: string,
  note: string,
  pending_call_concerns_ids: string,
  phones: phoneType[],
  residents: residentType[],
}

export type userType = {
  id: string,
  first_name: string,
  last_name: string,
  email: string,
  type: string,
}
