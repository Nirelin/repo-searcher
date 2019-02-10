import * as React from 'react';
import { Icon } from 'antd';
import './Card.css';
import langColor from './../data/langColor';
import { IItem } from './../store/reducer';

interface ICardProps {
  data: IItem;
  selectedLanguage: string;
}

const Card = (props: ICardProps) => {
  const cricleColor = langColor[props.data.language] ? langColor[props.data.language].color : null;
  return (
    <div className="card">
      <a href={props.data.htmlUrl} target="_blank">
      <div className="card-head">
        <img src={props.data.ownerAvatar} />
        <h3>{props.data.owner}</h3>
        <h2>{props.data.name}</h2>
      </div>
      <div className="card-description">
        <p>{props.data.description || 'No description'}</p>
      </div>
      <div className="card-minor">
        {(props.selectedLanguage === 'All') &&
        <div className="card-minor-info">
          <div style={{ backgroundColor: cricleColor }} className="lang-circle" />
          <span> {props.data.language || 'Unknown'}
          </span>
        </div>}
        <div className="card-minor-info">
          <Icon className="icon" type="star" theme="filled"/>
          <span>{props.data.stars}</span>
        </div>
        <div className="card-minor-info">
          <Icon className="icon" type="fork" theme="outlined"/>
          <span>{props.data.forks}</span>
        </div>
      </div>
      </a>
    </div>
  );
};
export default Card;
