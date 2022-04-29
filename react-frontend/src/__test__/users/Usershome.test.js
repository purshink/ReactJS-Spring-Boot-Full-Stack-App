import { render, cleanup, screen } from "@testing-library/react";
import UsersHome from "../../components/root/users/UsersHome";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeDataService from "../../api/hobby/HomeDataService";
import OffersDataService from "../../api/hobby/OffersDataService";
import mockAxios from "jest-mock-axios";

afterEach(() => {
  mockAxios.reset();
  cleanup;
});

it("should return no hobbies", async () => {
  const hobbies = [];
  mockAxios.get.mockResolvedValueOnce(hobbies);

  const result = await HomeDataService();

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith("/home", {
    params: { role: "business", username: "" },
  });
  expect(result).toEqual([]);
});

it("should render multiple hobbies", async () => {
  const hobbies = [
    {
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
    },
    {
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
      id: 2,
      intro: null,
      location: { id: 1, name: "ZURICH" },
      name: "Climbing",
      price: 73,
      profileImgUrl:
        "https://res.cloudinary.com/dv6ktrxwv/image/upload/v1640706607/i5gfpc0gesnyp4whkvul.jpg",
      profileImg_id: null,
      slogan: null,
    },
  ];

  mockAxios.get.mockReturnValueOnce(hobbies);

  const result = await HomeDataService();

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith("/home", {
    params: { role: "business", username: "" },
  });
  expect(result).toEqual([
    {
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
    },
    {
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
      id: 2,
      intro: null,
      location: { id: 1, name: "ZURICH" },
      name: "Climbing",
      price: 73,
      profileImgUrl:
        "https://res.cloudinary.com/dv6ktrxwv/image/upload/v1640706607/i5gfpc0gesnyp4whkvul.jpg",
      profileImg_id: null,
      slogan: null,
    },
  ]);
});
