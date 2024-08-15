import React, { useState } from "react";
import "./TaskCard.css";
import Tag from "./Tag";
import deleteIcon from "../assets/delete.png";

const TaskCard = ({
  title,
  description,
  tags,
  handleDelete,
  index,
  setActiveCard,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 50;

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const renderDescription = () => {
    if (description !== undefined && description.length <= maxLength) {
      return <p className="task_description">{description}</p>;
    }

    if (isExpanded) {
      return (
        <>
          <p className="task_description">{description}</p>
          <button className="show_more_btn" onClick={toggleDescription}>
            Show Less
          </button>
        </>
      );
    }

    return (
      <>
        <p className="task_description">
          {description !== undefined && description.slice(0, maxLength)}...
        </p>
        <button className="show_more_btn" onClick={toggleDescription}>
          Show More
        </button>
      </>
    );
  };

  return (
    <article
      className="task_card"
      draggable
      onDragStart={() => setActiveCard(index)}
      onDragEnd={() => setActiveCard(null)}
    >
      <p className="task_text">{title}</p>
      {renderDescription()}
      <div className="task_card_bottom_line">
        <div className="task_card_tags">
          {tags.map((tag, idx) => (
            <Tag key={idx} tagName={tag} selected />
          ))}
        </div>
        <div className="task_delete" onClick={() => handleDelete(index)}>
          <img src={deleteIcon} className="delete_icon" alt="delete" />
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
