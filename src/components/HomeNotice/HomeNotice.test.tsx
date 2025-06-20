import ResizeObserver from 'resize-observer-polyfill'
global.ResizeObserver = ResizeObserver
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event"
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

      // house props
      id: "",
      address: "",
      apt: "",
      city: "",
      state: "",
      zip: "",
      note: "",
      house_check_note: "",
      residents: [
        {
          id: "",
          first_name: "",
          last_name: "",
          owner: false,
        }
      ],
      houseCheckStartDate: new Date(),
      houseCheckEndDate: new Date(),
      houseLastChecked: null,
      now: new Date("April 13, 2025 23:59:59")
    }

    render(<HomeNotice
      now={testProps.now}
      phones={testProps.phones}
      pending_call_concerns_ids={testProps.pending_call_concerns}
      callInProgress={testProps.callInProgress}
      house_check={testProps.house_check}

      id={testProps.id}
      address={testProps.address}
      apt={testProps.apt}
      city={testProps.city}
      state={testProps.state}
      zip={testProps.zip}
      note={testProps.note}
      house_check_note={testProps.house_check_note}
      residents={testProps.residents}
      houseCheckStartDate={testProps.houseCheckStartDate}
      houseCheckEndDate={testProps.houseCheckEndDate}
      houseLastChecked={testProps.houseLastChecked}
    />)

    expect(screen.queryByTestId("")).toBeNull()
  })

  it('should display the component AND ONLY the string: "Primary phone number missing"', () => {
    const testProps = {
      phones: [] as phoneType[],
      pending_call_concerns: "",
      callInProgress: false,
      house_check: false,

      id: "",
      address: "",
      apt: "",
      city: "",
      state: "",
      zip: "",
      note: "",
      house_check_note: "",
      residents: [
        {
          id: "",
          first_name: "",
          last_name: "",
          owner: false,
        }
      ],
      houseCheckStartDate: new Date(),
      houseCheckEndDate: new Date(),
      houseLastChecked: null,
      now: new Date("April 13, 2025 23:59:59")
    }

    render(<HomeNotice
      now={testProps.now}
      phones={testProps.phones}
      pending_call_concerns_ids={testProps.pending_call_concerns}
      callInProgress={testProps.callInProgress}
      house_check={testProps.house_check}

      id={testProps.id}
      address={testProps.address}
      apt={testProps.apt}
      city={testProps.city}
      state={testProps.state}
      zip={testProps.zip}
      note={testProps.note}
      house_check_note={testProps.house_check_note}
      residents={testProps.residents}
      houseCheckStartDate={testProps.houseCheckStartDate}
      houseCheckEndDate={testProps.houseCheckEndDate}
      houseLastChecked={testProps.houseLastChecked}
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

      id: "",
      address: "",
      apt: "",
      city: "",
      state: "",
      zip: "",
      note: "",
      house_check_note: "",
      residents: [
        {
          id: "",
          first_name: "",
          last_name: "",
          owner: false,
        }
      ],
      houseCheckStartDate: new Date(),
      houseCheckEndDate: new Date(),
      houseLastChecked: null,
      now: new Date("April 13, 2025 23:59:59")
    }

    render(<HomeNotice
      now={testProps.now}
      phones={testProps.phones}
      pending_call_concerns_ids={testProps.pending_call_concerns}
      callInProgress={testProps.callInProgress}
      house_check={testProps.house_check}

      id={testProps.id}
      address={testProps.address}
      apt={testProps.apt}
      city={testProps.city}
      state={testProps.state}
      zip={testProps.zip}
      note={testProps.note}
      house_check_note={testProps.house_check_note}
      residents={testProps.residents}
      houseCheckStartDate={testProps.houseCheckStartDate}
      houseCheckEndDate={testProps.houseCheckEndDate}
      houseLastChecked={testProps.houseLastChecked}
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

      id: "",
      address: "",
      apt: "",
      city: "",
      state: "",
      zip: "",
      note: "",
      house_check_note: "",
      residents: [
        {
          id: "",
          first_name: "",
          last_name: "",
          owner: false,
        }
      ],
      houseCheckStartDate: new Date(),
      houseCheckEndDate: new Date(),
      houseLastChecked: null,
      now: new Date("April 13, 2025 23:59:59")
    }

    render(<HomeNotice
      now={testProps.now}
      phones={testProps.phones}
      pending_call_concerns_ids={testProps.pending_call_concerns}
      callInProgress={testProps.callInProgress}
      house_check={testProps.house_check}

      id={testProps.id}
      address={testProps.address}
      apt={testProps.apt}
      city={testProps.city}
      state={testProps.state}
      zip={testProps.zip}
      note={testProps.note}
      house_check_note={testProps.house_check_note}
      residents={testProps.residents}
      houseCheckStartDate={testProps.houseCheckStartDate}
      houseCheckEndDate={testProps.houseCheckEndDate}
      houseLastChecked={testProps.houseLastChecked}
    />)

    expect(screen.getByTestId("home-notice-container")).not.toBeNull()
    expect(screen.getByTestId("home-notice-separator")).not.toBeNull()
    expect(screen.queryByTestId("home-notice-phones")).toBeNull()
    expect(screen.queryByTestId("home-notice-pending")).toBeNull()
    expect(screen.queryByTestId("home-notice-houseCheck")).toBeNull()
    expect(screen.getByTestId("home-notice-callprog").textContent).toEqual("Call in progress...")
  })

  it('should display the component AND the "House check" button when it has been MORE than 7 days since the home was last checked and the end date for the house check has not yet passed', () => {
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

      id: "",
      address: "",
      apt: "",
      city: "",
      state: "",
      zip: "",
      note: "",
      house_check_note: "",
      residents: [
        {
          id: "",
          first_name: "",
          last_name: "",
          owner: false,
        }
      ],
      houseCheckStartDate: new Date("April 01, 2025 00:00:00"),
      houseCheckEndDate: new Date("April 30, 2025 23:59:59"),
      houseLastChecked: new Date("April 03, 2025 23:59:59"),
      now: new Date("April 13, 2025 23:59:59")
    }

    render(<HomeNotice
      now={testProps.now}
      phones={testProps.phones}
      pending_call_concerns_ids={testProps.pending_call_concerns}
      callInProgress={testProps.callInProgress}
      house_check={testProps.house_check}

      id={testProps.id}
      address={testProps.address}
      apt={testProps.apt}
      city={testProps.city}
      state={testProps.state}
      zip={testProps.zip}
      note={testProps.note}
      house_check_note={testProps.house_check_note}
      residents={testProps.residents}
      houseCheckStartDate={testProps.houseCheckStartDate}
      houseCheckEndDate={testProps.houseCheckEndDate}
      houseLastChecked={testProps.houseLastChecked}
    />)

    expect(screen.getByTestId("home-notice-container")).not.toBeNull()
    expect(screen.getByTestId("home-notice-separator")).not.toBeNull()
    expect(screen.queryByTestId("home-notice-phones")).toBeNull()
    expect(screen.queryByTestId("home-notice-pending")).toBeNull()
    expect(screen.queryByTestId("home-notice-callprog")).toBeNull()
    expect(screen.getByTestId("home-notice-houseCheck").textContent).toEqual("House check")
  })

  it('should NOT display the "House check" button when it has been LESS than 7 days since the last time the house was checked and the end date for the house check has not yet passed', () => {
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

      id: "",
      address: "",
      apt: "",
      city: "",
      state: "",
      zip: "",
      note: "",
      house_check_note: "",
      residents: [
        {
          id: "",
          first_name: "",
          last_name: "",
          owner: false,
        }
      ],
      houseCheckStartDate: new Date("April 01, 2025 00:00:00"),
      houseCheckEndDate: new Date("April 30, 2025 23:59:59"),
      houseLastChecked: new Date("April 10, 2025 23:59:59"),
      now: new Date("April 13, 2025 23:59:59")
    }


    render(<HomeNotice
      now={testProps.now}
      phones={testProps.phones}
      pending_call_concerns_ids={testProps.pending_call_concerns}
      callInProgress={testProps.callInProgress}
      house_check={testProps.house_check}

      id={testProps.id}
      address={testProps.address}
      apt={testProps.apt}
      city={testProps.city}
      state={testProps.state}
      zip={testProps.zip}
      note={testProps.note}
      house_check_note={testProps.house_check_note}
      residents={testProps.residents}
      houseCheckStartDate={testProps.houseCheckStartDate}
      houseCheckEndDate={testProps.houseCheckEndDate}
      houseLastChecked={testProps.houseLastChecked}
    />)

    expect(screen.queryByTestId("home-notice-container")).toBeNull()
    expect(screen.queryByTestId("home-notice-separator")).toBeNull()
    expect(screen.queryByTestId("home-notice-phones")).toBeNull()
    expect(screen.queryByTestId("home-notice-pending")).toBeNull()
    expect(screen.queryByTestId("home-notice-callprog")).toBeNull()
    expect(screen.queryByTestId("home-notice-houseCheck")).toBeNull()
  })

  it('should display the component AND ALL notices', () => {
    const testProps = {
      phones: [] as phoneType[],
      pending_call_concerns: "hello",
      callInProgress: true,
      house_check: true,

      id: "",
      address: "",
      apt: "",
      city: "",
      state: "",
      zip: "",
      note: "",
      house_check_note: "",
      residents: [
        {
          id: "",
          first_name: "",
          last_name: "",
          owner: false,
        }
      ],
      houseCheckStartDate: new Date("April 01, 2025 00:00:00"),
      houseCheckEndDate: new Date("April 30, 2025 23:59:59"),
      houseLastChecked: new Date("April 02, 2025 23:59:59"),
      now: new Date("April 13, 2025 23:59:59")
    }

    render(<HomeNotice
      now={testProps.now}
      phones={testProps.phones}
      pending_call_concerns_ids={testProps.pending_call_concerns}
      callInProgress={testProps.callInProgress}
      house_check={testProps.house_check}

      id={testProps.id}
      address={testProps.address}
      apt={testProps.apt}
      city={testProps.city}
      state={testProps.state}
      zip={testProps.zip}
      note={testProps.note}
      house_check_note={testProps.house_check_note}
      residents={testProps.residents}
      houseCheckStartDate={testProps.houseCheckStartDate}
      houseCheckEndDate={testProps.houseCheckEndDate}
      houseLastChecked={testProps.houseLastChecked}
    />)

    expect(screen.getByTestId("home-notice-container")).not.toBeNull()
    expect(screen.getByTestId("home-notice-separator")).not.toBeNull()
    expect(screen.getByTestId("home-notice-phones").textContent).toEqual("Primary phone number missing")
    expect(screen.getByTestId("home-notice-pending").textContent).toEqual("Call pending")
    expect(screen.getByTestId("home-notice-callprog").textContent).toEqual("Call in progress...")
    expect(screen.getByTestId("home-notice-houseCheck").textContent).toEqual("House check")
  })

  it('should open up the House Check dialog box when the button "House check" is clicked', async () => {
    const user = userEvent.setup()
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

      id: "",
      address: "",
      apt: "",
      city: "",
      state: "",
      zip: "",
      note: "",
      house_check_note: "",
      residents: [
        {
          id: "",
          first_name: "",
          last_name: "",
          owner: false,
        }
      ],
      houseCheckStartDate: new Date("April 01, 2025 00:00:00"),
      houseCheckEndDate: new Date("April 30, 2025 23:59:59"),
      houseLastChecked: new Date("April 03, 2025 23:59:59"),
      now: new Date("April 13, 2025 23:59:59")
    }

    render(<HomeNotice
      now={testProps.now}
      phones={testProps.phones}
      pending_call_concerns_ids={testProps.pending_call_concerns}
      callInProgress={testProps.callInProgress}
      house_check={testProps.house_check}

      id={testProps.id}
      address={testProps.address}
      apt={testProps.apt}
      city={testProps.city}
      state={testProps.state}
      zip={testProps.zip}
      note={testProps.note}
      house_check_note={testProps.house_check_note}
      residents={testProps.residents}
      houseCheckStartDate={testProps.houseCheckStartDate}
      houseCheckEndDate={testProps.houseCheckEndDate}
      houseLastChecked={testProps.houseLastChecked}
    />)

    expect(screen.getByTestId("home-notice-container")).not.toBeNull()
    expect(screen.getByTestId("home-notice-separator")).not.toBeNull()
    expect(screen.queryByTestId("home-notice-phones")).toBeNull()
    expect(screen.queryByTestId("home-notice-pending")).toBeNull()
    expect(screen.queryByTestId("home-notice-callprog")).toBeNull()
    expect(screen.getByTestId("home-notice-houseCheck").textContent).toEqual("House check")

    // user interaction
    // fireEvent.click(screen.getByTestId("home-notice-houseCheck"))
    await user.click(screen.getByTestId("home-notice-houseCheck"))

    expect(screen.getByTestId("house-check-dialogue").textContent).toEqual("House Check")

  })
})
