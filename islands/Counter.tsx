/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "@twind";

import { GridButton } from "../components/GridButton.tsx";
import Game from "./Game.tsx";

interface CounterProps {
  start: number;
}

export default function Counter(props: CounterProps) {
    const [count, setCount] = useState(props.start);
    return (
        <div class={tw`flex gap-2 w-full`}>
            <Game/>
            <p class={tw`flex-grow-1 font-bold text-xl`}>{count}</p>
            <GridButton onClick={() => setCount(count - 1)}>-1</GridButton>
            <GridButton onClick={() => setCount(count + 1)}>+1</GridButton>
        </div>
    );
}
