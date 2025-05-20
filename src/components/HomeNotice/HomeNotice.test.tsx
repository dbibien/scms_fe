import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react"
import HomeNotice from "./HomeNotice";
import { phoneType } from "@/common/types";

describe('<HomeNotice />', () => {
  it('should display NOTHING', () => {
    const testProps = {
      phones: [{
        id: "1",
        phone_number: "555-555-5555",
        primary: true,
        type: "cell",
      }] as phoneType[],
      pending_call_concerns: "",
      callInProgress: false,
      house_check: false,
    }

    render(<HomeNotice
      phones={testProps.phones}
      pending_call_concerns_ids={testProps.pending_call_concerns}
      callInProgress={testProps.callInProgress}
      house_check={testProps.house_check}
    />)

    expect(screen.queryByTestId("home-notice-container")).toBeNull()
  })

  it('should display the component AND ONLY the string: "Primary phone number missing"', () => {
    const testProps = {
      phones: [] as phoneType[],
      pending_call_concerns: "",
      callInProgress: false,
      house_check: false,
    }

    render(<HomeNotice
      phones={testProps.phones}
      pending_call_concerns_ids={testProps.pending_call_concerns}
      callInProgress={testProps.callInProgress}
      house_check={testProps.house_check}
    />)

    expect(screen.getByTestId("home-notice-container")).not.toBeNull()
    expect(screen.getByTestId("home-notice-separator")).not.toBeNull()
    expect(screen.queryByTestId("home-notice-pending")).toBeNull()
    expect(screen.queryByTestId("home-notice-callprog")).toBeNull()
    expect(screen.queryByTestId("home-notice-houseCheck")).toBeNull()
    expect(screen.getByTestId("home-notice-phones").textContent).toEqual("Primary phone number missing")
  })

  it('should display the component AND ONLY the string: "Call pending"', () => {
    const testProps = {
      phones: [{
        id: "1",
        phone_number: "555-555-5555",
        primary: true,
        type: "cell",
      }] as phoneType[],
      pending_call_concerns: "hello",
      callInProgress: false,
      house_check: false,
    }

    render(<HomeNotice
      phones={testProps.phones}
      pending_call_concerns_ids={testProps.pending_call_concerns}
      callInProgress={testProps.callInProgress}
      house_check={testProps.house_check}
    />)

    expect(screen.getByTestId("home-notice-container")).not.toBeNull()
    expect(screen.getByTestId("home-notice-separator")).not.toBeNull()
    expect(screen.queryByTestId("home-notice-phones")).toBeNull()
    expect(screen.queryByTestId("home-notice-callprog")).toBeNull()
    expect(screen.queryByTestId("home-notice-houseCheck")).toBeNull()
    expect(screen.getByTestId("home-notice-pending").textContent).toEqual("Call pending")
  })

  it('should display the component AND ONLY the string: "Call in progress..."', () => {
    const testProps = {
      phones: [{
        id: "1",
        phone_number: "555-555-5555",
        primary: true,
        type: "cell",
      }] as phoneType[],
      pending_call_concerns: "",
      callInProgress: true,
      house_check: false,
    }

    render(<HomeNotice
      phones={testProps.phones}
      pending_call_concerns_ids={testProps.pending_call_concerns}
      callInProgress={testProps.callInProgress}
      house_check={testProps.house_check}
    />)

    expect(screen.getByTestId("home-notice-container")).not.toBeNull()
    expect(screen.getByTestId("home-notice-separator")).not.toBeNull()
    expect(screen.queryByTestId("home-notice-phones")).toBeNull()
    expect(screen.queryByTestId("home-notice-pending")).toBeNull()
    expect(screen.queryByTestId("home-notice-houseCheck")).toBeNull()
    expect(screen.getByTestId("home-notice-callprog").textContent).toEqual("Call in progress...")
  })

  it('should display the component AND ONLY the string: "Call in progress..."', () => {
    const testProps = {
      phones: [{
        id: "1",
        phone_number: "555-555-5555",
        primary: true,
        type: "cell",
      }] as phoneType[],
      pending_call_concerns: "",
      callInProgress: false,
      house_check: true,
    }

    render(<HomeNotice
      phones={testProps.phones}
      pending_call_concerns_ids={testProps.pending_call_concerns}
      callInProgress={testProps.callInProgress}
      house_check={testProps.house_check}
    />)

    expect(screen.getByTestId("home-notice-container")).not.toBeNull()
    expect(screen.getByTestId("home-notice-separator")).not.toBeNull()
    expect(screen.queryByTestId("home-notice-phones")).toBeNull()
    expect(screen.queryByTestId("home-notice-pending")).toBeNull()
    expect(screen.queryByTestId("home-notice-callprog")).toBeNull()
    expect(screen.getByTestId("home-notice-houseCheck").textContent).toEqual("House check")
  })

  it('should display the component AND ALL notices', () => {
    const testProps = {
      phones: [] as phoneType[],
      pending_call_concerns: "hello",
      callInProgress: true,
      house_check: true,
    }

    render(<HomeNotice
      phones={testProps.phones}
      pending_call_concerns_ids={testProps.pending_call_concerns}
      callInProgress={testProps.callInProgress}
      house_check={testProps.house_check}
    />)

    expect(screen.getByTestId("home-notice-container")).not.toBeNull()
    expect(screen.getByTestId("home-notice-separator")).not.toBeNull()
    expect(screen.getByTestId("home-notice-phones").textContent).toEqual("Primary phone number missing")
    expect(screen.getByTestId("home-notice-pending").textContent).toEqual("Call pending")
    expect(screen.getByTestId("home-notice-callprog").textContent).toEqual("Call in progress...")
    expect(screen.getByTestId("home-notice-houseCheck").textContent).toEqual("House check")
  })

  it('should open up the House Check dialog box when the button "House check" is clicked', () => { })
})
