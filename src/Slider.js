import { React, useState, useEffect } from "react";
import { data } from "./data";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";

const Slider = () => {
  const [index, setIndex] = useState(0);
  const [Users, setUsers] = useState(data);

  useEffect(() => {
    const lastIndex = Users.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, Users]);

  // auto slider
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 2000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);
  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>reviews
        </h2>
      </div>

      <div className="section-center">
        {Users.map((User, userIndex) => {
          const { id, name, img, job, info } = User;
          let position = "nextSlide";
          if (userIndex === index) {
            position = "activeSlide";
          }
          if (
            userIndex === index - 1 ||
            (index === 0 && userIndex === Users.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <article className={position} key={id}>
              <img src={img} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{job}</p>
              <p className="text">{info}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <FaChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default Slider;
