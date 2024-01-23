import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import BaseSlideExecution from "../base-slide-execution";
import { ThemeStyles } from "../slide-util";
import "../global-styles.css";


/**
 * Sdb Calendar component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @param {string} props.executionId Unique id for the instance.
 * @returns {JSX.Element} The component.
 */
function SdbCalendar({ slide, content, run, slideDone, executionId }) {
  const { csv1, csv2, duration = 15000 } = content;

  /** Setup slide run function. */
  const slideExecution = new BaseSlideExecution(slide, slideDone);
  useEffect(() => {
    if (run) {
      slideExecution.start(duration);
    }

    return function cleanup() {
      slideExecution.stop();
    };
  }, [run]);

  return (
    <>
      <div>{{ csv1 }}</div>
      <div>{{ csv2 }}</div>

      <ThemeStyles id={executionId} css={slide?.themeData?.cssStyles} />
    </>
  );
}

SdbCalendar.propTypes = {
  run: PropTypes.string.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    instanceId: PropTypes.string,
    themeData: PropTypes.shape({
      cssStyles: PropTypes.string,
    }),
  }).isRequired,
  content: PropTypes.shape({
    duration: PropTypes.number.isRequired,
    csv1: PropTypes.string,
    csv2: PropTypes.string,
  }).isRequired,
  executionId: PropTypes.string.isRequired,
};

export default SdbCalendar;
