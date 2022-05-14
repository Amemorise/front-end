import React from "react";
import "./styles/collections.scss";

const CollectionsDisplay = () => {
    return (
        <div>
            <ul className="collection-list-cards">
                <li>
                    <a href="" className="collection-list-card">
                        <img src="https://i.imgur.com/oYiTqum.jpg" className="collection-list-card__image" alt="" />
                        <div className="collection-list-card__overlay">
                            <div className="collection-list-card__header">
                                <svg className="collection-list-card__arc" xmlns="http://www.w3.org/2000/svg">
                                    <path />
                                </svg>
                                <img className="collection-list-card__thumb" src="https://i.imgur.com/7D7I6dI.png" alt="" />
                                <div className="collection-list-card__header-text">
                                    <h3 className="collection-list-card__title">Jessica Parker</h3>
                                    <span className="collection-list-card__status">1 hour ago</span>
                                </div>
                            </div>
                            <p className="collection-list-card__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="" className="collection-list-card">
                        <img src="https://i.imgur.com/2DhmtJ4.jpg" className="collection-list-card__image" alt="" />
                        <div className="collection-list-card__overlay">
                            <div className="collection-list-card__header">
                                <svg className="collection-list-card__arc" xmlns="http://www.w3.org/2000/svg">
                                    <path />
                                </svg>
                                <img className="collection-list-card__thumb" src="https://i.imgur.com/sjLMNDM.png" alt="" />
                                <div className="collection-list-card__header-text">
                                    <h3 className="collection-list-card__title">kim Cattrall</h3>
                                    <span className="collection-list-card__status">3 hours ago</span>
                                </div>
                            </div>
                            <p className="collection-list-card__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="" className="collection-list-card">
                        <img src="https://i.imgur.com/oYiTqum.jpg" className="collection-list-card__image" alt="" />
                        <div className="collection-list-card__overlay">
                            <div className="collection-list-card__header">
                                <svg className="collection-list-card__arc" xmlns="http://www.w3.org/2000/svg">
                                    <path />
                                </svg>
                                <img className="collection-list-card__thumb" src="https://i.imgur.com/7D7I6dI.png" alt="" />
                                <div className="collection-list-card__header-text">
                                    <h3 className="collection-list-card__title">Jessica Parker</h3>
                                    <span className="collection-list-card__tagline">Lorem ipsum dolor sit amet consectetur</span>
                                    <span className="collection-list-card__status">1 hour ago</span>
                                </div>
                            </div>
                            <p className="collection-list-card__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="" className="collection-list-card">
                        <img src="https://i.imgur.com/2DhmtJ4.jpg" className="collection-list-card__image" alt="" />
                        <div className="collection-list-card__overlay">
                            <div className="collection-list-card__header">
                                <svg className="collection-list-card__arc" xmlns="http://www.w3.org/2000/svg">
                                    <path />
                                </svg>
                                <img className="collection-list-card__thumb" src="https://i.imgur.com/sjLMNDM.png" alt="" />
                                <div className="collection-list-card__header-text">
                                    <h3 className="collection-list-card__title">kim Cattrall</h3>
                                    <span className="collection-list-card__status">3 hours ago</span>
                                </div>
                            </div>
                            <p className="collection-list-card__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default CollectionsDisplay;
