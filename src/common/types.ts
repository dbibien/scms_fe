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
  house_check: boolean,
  house_check_start_date: string,
  house_check_end_date: string,
  house_check_last_date: string,
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

export type reportType = {
  id: string,
  // address: string,
  member_number: string,
  security_code: string,
  incident_time: string,
  created: string,
  ems_pbso: boolean,
  injury: boolean,
  type: "garage_check" | "false_alarm",
  phone_number: string,
  weather: "clear" | "sunny" | "cloudy" | "rain",
  narative: string,
  // created_by: string,
  house: {
    id: string,
    address: string,
    apt: string,
    city: string,
    state: string,
    zip: string,
  },
  resident: {
    id: string,
    first_name: string,
    last_name: string,
  },
  created_by: {
    id: string,
    first_name: string,
    last_name: string,
  },
}
