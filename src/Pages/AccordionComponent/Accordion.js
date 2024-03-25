import React, { useRef, useState } from "react";
import data from "./AccordionData";
import classes from './Accordion.module.css';
import { FiPlusCircle } from "react-icons/fi";

//  accordionitem component
const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  const contentHeight = useRef();

  return (
    <div className={classes.wrapper}>
      <button
        className={`${classes.questionContainer} ${isOpen ? classes.active : ""}`}
        onClick={onClick}
      >
        <p className={classes.questionContent}>{question}</p>
        <FiPlusCircle className={`${classes.arrow} ${isOpen ? classes.active : ""}`} />
      </button>

      <div
        ref={contentHeight}
        className={classes.answerContainer}
        style={
          isOpen
            ? { height: contentHeight.current.scrollHeight }
            : { height: "0px" }
        }
      >
        <p className={classes.answerContent}>{answer}</p>
      </div>
    </div>
  );
};

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleItemClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className={classes.container}>
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={activeIndex === index}
          onClick={() => handleItemClick(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
