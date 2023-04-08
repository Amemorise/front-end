import { useRef, useEffect, useState } from "react";

const HeroCard = () => {
    let calculateAngle = function (e: MouseEvent, item: HTMLElement, parent: HTMLDivElement) {
        let dropShadowColor = parent.getAttribute("data-filter-color") || `rgba(0, 0, 0, 0.3)`;

        parent.classList.add("animated");
        // Get the x position of the users mouse, relative to the button itself
        let x = Math.abs(item.getBoundingClientRect().x - e.clientX);
        // Get the y position relative to the button
        let y = Math.abs(item.getBoundingClientRect().y - e.clientY);

        // Calculate half the width and height
        let halfWidth = item.getBoundingClientRect().width / 2;
        let halfHeight = item.getBoundingClientRect().height / 2;

        // Use this to create an angle. I have divided by 6 and 4 respectively so the effect looks good.
        // Changing these numbers will change the depth of the effect.
        let calcAngleX = (x - halfWidth) / 14;
        let calcAngleY = (y - halfHeight) / 14;

        let gX = (1 - x / (halfWidth * 2)) * 100;
        let gY = (1 - y / (halfHeight * 2)) * 100;

        // Add the glare at the reflection of where the user's mouse is hovering
        const glare = (item.querySelector(".glare") as HTMLElement)?.style;

        if (glare) {
            glare.background = `radial-gradient(circle at ${gX}% ${gY}%, rgb(199 198 243), transparent)`;
        }
        // And set its container's perspective.
        parent.style.perspective = `${halfWidth * 6}px`;
        item.style.perspective = `${halfWidth * 6}px`;

        // Set the items transform CSS property
        item.style.transform = `rotateY(${calcAngleX}deg) rotateX(${-calcAngleY}deg) scale(1.04)`;

        const backface = (parent.querySelector(".inner-card-backface") as HTMLElement)?.style;
        if (backface) {
            backface.transform = `rotateY(${calcAngleX}deg) rotateX(${-calcAngleY}deg) scale(1.04) translateZ(-4px)`;
        }

        if (parent.getAttribute("data-custom-perspective") !== null) {
            parent.style.perspective = `${parent.getAttribute("data-custom-perspective")}`;
        }

        // Reapply this to the shadow, with different dividers
        let calcShadowX = (x - halfWidth) / 3;
        let calcShadowY = (y - halfHeight) / 6;

        // Add a filter shadow - this is more performant to animate than a regular box shadow.
        item.style.filter = `drop-shadow(${-calcShadowX}px ${-calcShadowY}px 15px ${dropShadowColor})`;
    };

    const reference = useRef<HTMLDivElement>(null);

    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        reference?.current?.focus();

        const card = reference?.current;
        const innerCard = card?.querySelector(".inner-card") as HTMLElement;
        const mouseExit = () => {
            if (card) {
                const dropShadowColor = card.getAttribute("data-filter-color") || `rgba(0, 0, 0, 0.3)`;

                card.classList.remove("animated");
                const innerCard = (card.querySelector(".inner-card") as HTMLElement)?.style;
                if (innerCard) {
                    innerCard.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
                    innerCard.filter = `drop-shadow(0 10px 15px ${dropShadowColor}`;
                }
                const backface = (card.querySelector(".inner-card-backface") as HTMLElement)?.style;
                if (backface) {
                    backface.transform = "unset";
                }
            }
        };
        if (card && innerCard) {
            card.addEventListener("mouseenter", (e) => {
                calculateAngle(e, innerCard, card);
            });

            // For when the users mouse moves on top of the card
            card.addEventListener("mousemove", (e) => {
                calculateAngle(e, innerCard, card);
            });
            card.addEventListener("mouseleave", mouseExit);
        }

        return () => {
            card?.removeEventListener("mousemove", (e) => {
                calculateAngle(e, innerCard, card);
            });
            card?.removeEventListener("mouseenter", (e) => {
                calculateAngle(e, innerCard, card);
            });

            card?.removeEventListener("mouseleave", mouseExit);
        };
    }, []);
    const flipCard = () =>
        setFlipped((prev) => {
            return !prev;
        });

    return (
        <div className={`hero-card ${flipped ? "flipped" : ""}`} ref={reference} onClick={flipCard}>
            <span className="inner-card-backface">
                <span className="flip-inner-card"></span>
            </span>
            <span className="inner-card">
                <span className="glare"></span>
            </span>
        </div>
    );
};

export default HeroCard;
