import React from "react";

type CardProps = {
    children?: React.ReactNode;
};

export default function Card(props: CardProps) {
    return (
        <section className="relative flex-grow mx-auto px-4 text-white max-w-[27rem] sm:px-11">
            {props.children}
        </section>
    );
}
