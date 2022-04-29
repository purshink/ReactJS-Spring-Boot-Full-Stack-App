import { render, cleanup, screen } from "@testing-library/react";
import CreateOffer from "../../components/root/users/business/Offer/CreateOffer";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateOfferDataService from "../../api/hobby/CreateOfferDataService";
import userEvent from "@testing-library/user-event";
import mockAxios from "jest-mock-axios";

beforeEach(() =>
  render(
    <Router>
      {" "}
      <CreateOffer />
    </Router>
  )
);
afterEach(() => {
  mockAxios.reset();
  cleanup;
});

it("input should be initially empty", () => {
  const name = screen.getByLabelText("Hobbie Name");
  const slogan = screen.getByLabelText("Slogan");
  const intro = screen.getByLabelText("Intro");
  const description = screen.getByLabelText("Description");
  const price = screen.getByLabelText("Price per entry");
  const contanct = screen.getByLabelText("Contact info");

  expect(name.value).toBe("");
  expect(slogan.value).toBe("");

  expect(intro.value).toBe("");
  expect(description.value).toBe("");

  expect(price.value).toBe("");
  expect(contanct.value).toBe("");
});

it("change value of input element works correctly", () => {
  const name = screen.getByLabelText("Hobbie Name");
  const slogan = screen.getByLabelText("Slogan");
  const intro = screen.getByLabelText("Intro");
  const description = screen.getByLabelText("Description");
  const price = screen.getByLabelText("Price per entry");
  const contanct = screen.getByLabelText("Contact info");

  userEvent.type(name, "hobby");
  expect(name.value).toBe("hobby");

  userEvent.type(slogan, "my slogan");
  expect(slogan.value).toBe("my slogan");

  userEvent.type(intro, "v");
  expect(intro.value).toBe("v");

  userEvent.type(description, "v");
  expect(description.value).toBe("v");

  userEvent.type(price, "176.4");
  expect(price.value).toBe("176.4");

  userEvent.type(contanct, "v");
  expect(contanct.value).toBe("v");
});

it("should show error message on invalid input", () => {
  const name = screen.getByLabelText("Hobbie Name");
  const slogan = screen.getByLabelText("Slogan");
  const intro = screen.getByLabelText("Intro");
  const description = screen.getByLabelText("Description");
  const price = screen.getByLabelText("Price per entry");
  const contanct = screen.getByLabelText("Contact info");

  userEvent.type(name, "pa");
  userEvent.type(slogan, "p");
  userEvent.type(intro, "");
  userEvent.type(description, "");
  userEvent.type(price, "");
  userEvent.type(contanct, "");

  const submitBtnElement = screen.getByRole("button", { name: /Submit/i });

  userEvent.click(submitBtnElement);
  const errorName = screen.getByText(
    /Hobby name must be at least 3 characters long/i
  );
  const errorSlogan = screen.getByText(
    /Text has to be between 2 and 20 characters long/i
  );
  const errorIntro = screen.getByText(/Intro is required/i);
  const errorDescription = screen.getByText(/Description is required/i);
  const errorPrice = screen.getByText(/Price is required/i);
  const errorContact = screen.getByText(/Contact info is required/i);

  expect(errorName).toBeInTheDocument();
  expect(errorSlogan).toBeInTheDocument();
  expect(errorIntro).toBeInTheDocument();
  expect(errorDescription).toBeInTheDocument();
  expect(errorPrice).toBeInTheDocument();
  expect(errorContact).toBeInTheDocument();
});

it("should create offer successfully", async () => {
  const info = {
    category: { id: "1", name: "ACTIVE" },
    contactInfo: null,
    creator: "business",
    description:
      "Rock climbing is a sport in which participants climb up, down or across natural rock formations or artificial rock walls. The goal is to reach the summit of a formation or the endpoint of a usually pre-defined route without falling. Rock climbing is a physically and mentally demanding sport, one that often tests a climber's strength, endurance, agility and balance along with mental control. Knowledge of proper climbing techniques and the use of specialized climbing equipment is crucial for the safe completion of routes.\n\nBecause of the wide range and variety of rock formations around the world, rock climbing has been separated into several different styles and sub-disciplines, such as scrambling, another activity involving the scaling of hills and similar formations, differentiated by rock climbing's sustained use of hands to support the climber's weight as well as to provide balance.",
    galleryImg1_id: null,
    galleryImg2_id: null,
    galleryImg3_id: null,
    galleryImgUrl1: null,
    galleryImgUrl2: null,
    galleryImgUrl3: null,
    id: 1,
    intro: null,
    location: { id: 1, name: "ZURICH" },
    name: "Climbing",
    price: 73,
    profileImgUrl:
      "https://res.cloudinary.com/dv6ktrxwv/image/upload/v1640706607/i5gfpc0gesnyp4whkvul.jpg",
    profileImg_id: null,
    slogan: null,
  };

  mockAxios.post.mockReturnValueOnce(info);

  const result = await CreateOfferDataService(info);

  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  expect(mockAxios.post).toHaveBeenCalledWith(`/hobbies`, info);
  expect(result).toEqual({
    category: { id: "1", name: "ACTIVE" },
    contactInfo: null,
    creator: "business",
    description:
      "Rock climbing is a sport in which participants climb up, down or across natural rock formations or artificial rock walls. The goal is to reach the summit of a formation or the endpoint of a usually pre-defined route without falling. Rock climbing is a physically and mentally demanding sport, one that often tests a climber's strength, endurance, agility and balance along with mental control. Knowledge of proper climbing techniques and the use of specialized climbing equipment is crucial for the safe completion of routes.\n\nBecause of the wide range and variety of rock formations around the world, rock climbing has been separated into several different styles and sub-disciplines, such as scrambling, another activity involving the scaling of hills and similar formations, differentiated by rock climbing's sustained use of hands to support the climber's weight as well as to provide balance.",
    galleryImg1_id: null,
    galleryImg2_id: null,
    galleryImg3_id: null,
    galleryImgUrl1: null,
    galleryImgUrl2: null,
    galleryImgUrl3: null,
    id: 1,
    intro: null,
    location: { id: 1, name: "ZURICH" },
    name: "Climbing",
    price: 73,
    profileImgUrl:
      "https://res.cloudinary.com/dv6ktrxwv/image/upload/v1640706607/i5gfpc0gesnyp4whkvul.jpg",
    profileImg_id: null,
    slogan: null,
  });
});
