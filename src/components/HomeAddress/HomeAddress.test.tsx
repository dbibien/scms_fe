import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomeAddress from "./HomeAddress";

describe("HomeAddres", () => {
  it("should display the correct home address in the correct format", () => {
    const address = {
      address: "12345 Main Street",
      apt: "",
      city: "Boca Raton",
      state: "FL",
      zip: "33311"
    }

    render(<HomeAddress
      address={address?.address}
      apt={address?.apt}
      city={address?.city}
      state={address?.state}
      zip={address?.zip}
    />)

    const renderedHomeAdress = screen.getByTestId("home-address")
    const expected = `${address.address} ${address.apt}, ${address.city} ${address.state} ${address.zip}`

    expect(renderedHomeAdress).not.toBeNull()
    expect(renderedHomeAdress.textContent).toBe(expected)
  })


  it("should error when the wrong info is given", () => {
    const address = {
      address: "12345 Main Street",
      apt: "",
      city: "Boca Raton",
      state: "FL",
      zip: "33311"
    }

    render(<HomeAddress
      address={address?.address}
      apt={address?.apt}
      city={address?.city}
      state={address?.state}
      zip={address?.zip}
    />)

    const renderedHomeAdress = screen.getByTestId("home-address")
    const expected = `11223 ${address.apt}, ${address.city} ${address.state} ${address.zip}`

    expect(renderedHomeAdress).not.toBeNull()
    expect(renderedHomeAdress.textContent).not.toBe(expected)
  })
})
