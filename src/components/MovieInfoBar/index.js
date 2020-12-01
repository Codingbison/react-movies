import React from "react";
import PropTypes from "prop-types";
import { calcTime, convertMoney } from "../../helpers";
import { Wrapper, Content } from "./MovieInfoBar.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
const MovieInfoBar = ({ time, budget, revenue, addDislike, movieData, addLike }) => (
  <Wrapper>
    <Content>
      <div className="column">
        <Content>
          <div className="column">
            <p
              style={{
                cursor: "pointer"
              }}
              onClick={addLike}
            >
              <FontAwesomeIcon icon={faThumbsUp} />
              ({movieData?.like})
            </p>
          </div>
          <div className="column">
            <p
              style={{
                cursor: "pointer"
              }}
              onClick={addDislike}
            >
              <FontAwesomeIcon icon={faThumbsDown} />
              ({movieData?.dislike})
            </p>
          </div>
        </Content>
      </div>
      <div className="column">
        <p>Running time: {calcTime(time)}</p>
      </div>
      <div className="column">
        <p>Budget: {convertMoney(budget)}</p>
      </div>
      <div className="column">
        <p>Revenue: {convertMoney(revenue)}</p>
      </div>
    </Content>
  </Wrapper>
);

MovieInfoBar.propTypes = {
  time: PropTypes.number,
  budget: PropTypes.number,
  revenue: PropTypes.number
};

export default MovieInfoBar;
