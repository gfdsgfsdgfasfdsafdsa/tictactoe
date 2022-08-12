/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Game from "../islands/Game.tsx";

export default function Home() {

    return (
        <div class={tw`w-screen h-screen bg-black`}
             style={{
                 color: '#ec4899',
             }}
        >
            <div class={tw`p-4 mx-auto max-w-screen-md font-mono`}>
                <h1
                    class={tw`text-5xl border-b-2 pb-3 font-semibold`}
                    style={{
                        borderColor: '#6b21a8',
                    }}
                >
                    TicTacToe
                </h1>
                <Game />
            </div>
        </div>
    );
}
