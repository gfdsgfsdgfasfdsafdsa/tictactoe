/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Game from "../islands/Game.tsx";

export default function Home() {

    return (
        <div class={tw`p-4 mx-auto max-w-screen-md`}>
            <h1>TicTacToe</h1>
            <Game />
        </div>
    );
}
