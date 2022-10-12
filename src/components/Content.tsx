import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import {
  areasToRegions,
  GetSolunarData,
  GetUVIndexData,
  GetweatherData,
  GetWindSpeedData,
  solunarType,
} from "../GetData";
import type { forecastType } from "../GetData";

type CardWrapperProps = {};

const colWidth: string = "col-md";

const CardWrapper = (props: CardWrapperProps) => {
  return (
    <div className="container justify-content-center">
      <Row className="">
        <Col className={colWidth}>
          <Card<forecastType>
            cardTitle="Weather Forecast"
            cardSubtitle="2-hr forecasts"
            cardFunc={GetweatherData()}
            cardImage="https://source.unsplash.com/LtWFFVi1RXQ/640"
          ></Card>
        </Col>
        <Col className={colWidth}>
          <Card<forecastType>
            cardTitle="Wind Speed"
            cardSubtitle="per-minute readings"
            cardFunc={GetWindSpeedData()}
            cardImage="https://source.unsplash.com/iGDg_f_mlWo/640"
          ></Card>
        </Col>
        <Col className={colWidth}>
          <Card<forecastType>
            cardTitle="UV Index"
            cardSubtitle="per-hour reading between 7am-7pm"
            cardFunc={GetUVIndexData()}
            cardImage="https://source.unsplash.com/dtOTQYmTEs0/640"
          ></Card>
        </Col>
        <Col className={colWidth}>
          <SolunarCard<solunarType>
            cardTitle="Solunar Forecast"
            cardSubtitle="per-day activity"
            cardFunc={GetSolunarData()}
            cardImage="https://source.unsplash.com/2ydabboLbeg/640"
          ></SolunarCard>
        </Col>
      </Row>
    </div>
  );
};

type CardProps<T> = {
  cardTitle: string;
  cardFunc: Promise<any>;
  cardSubtitle?: string;
  cardText?: string;
  cardImage: string;
};

const Card = <T extends forecastType>(props: CardProps<T>) => {
  let [Item, setItem] = useState<T[]>([]);

  useEffect(() => {
    props.cardFunc.then((items) => {
      setItem(items);
    });
  }, []);

  return (
    <div className="card h-100">
      <img
        className="card-img-top"
        src={props.cardImage}
        alt="Card image cap"
      ></img>
      <div className="card-body">
        <h5 className="card-title">{props.cardTitle}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{props.cardSubtitle}</h6>
        <p className="card-text">{props.cardText}</p>
        <ul className="list-group list-group-flush">
          {Item.map(({ area, forecast }) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={area}
            >
              <h6>{area}</h6>
              <span className="badge badge-pill badge-primary bg-primary">
                {forecast}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const SolunarCard = <T extends solunarType>(props: CardProps<T>) => {
  let [Item, setItem] = useState<solunarType>({
    sunrise: "",
    sunset: "",
    moonrise: "",
    moonset: "",
    moonphase: "",
  });

  useEffect(() => {
    props.cardFunc.then((item) => {
      setItem(item);
    });
  }, []);

  return (
    <div className="card h-100">
      <img
        className="card-img-top"
        src={props.cardImage}
        alt="Card image cap"
      ></img>
      <div className="card-body">
        <h5 className="card-title">{props.cardTitle}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{props.cardSubtitle}</h6>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span>Moon Phase is {Item.moonphase}</span>
          </li>
          <li className="list-group-item">
            <span>Sunrise at {Item.sunrise}</span>
          </li>
          <li className="list-group-item">
            <span>Sunset at {Item.sunset}</span>
          </li>
          <li className="list-group-item">
            <span>Moonrise at {Item.moonrise}</span>
          </li>
          <li className="list-group-item">
            <span>Moonset at {Item.moonset}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

type ContentProps = {};

const Content = (props: ContentProps) => {
  return (
    <div className="">
      <div className="hero">
        <div className="hero-gradient"></div>
        <h1 className="hero-tag-line">
          A weather dashboard tailored for fishing purposes.
          <h5 className="hero-text text-muted">
            Find useful forecasts for fishing such as - weather, wind-speed,
            UV-Index and Solunar forecast. These forecasts are based on my
            personal experience and is what I look at before I decide on a
            fishing trip. All data is based in Singapore and divided into East,
            West, Central, North and South.
          </h5>
        </h1>
      </div>
      <CardWrapper></CardWrapper>
      <div className="container pt-4">
        <h3>
          About
          <small className=""> this project</small>
        </h3>
        <p>
          This project is an exercise of TypeScript, ReactJS, HTML and CSS. All
          data is obtained from open-source API provided by
          <a href="https://data.gov.sg"> data.gov.sg</a>, except for the Solunar
          Forecast which is obtained from
          <a href="https://solunar.org"> api.solunar.org</a>. Images are sourced
          from
          <a href="https://unsplash.com/"> Unsplash</a>.
        </p>
      </div>
    </div>
  );
};

export { CardWrapper };
export { Card };
export default Content;
