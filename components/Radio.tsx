/** @jsx h */
import { h } from "preact";
//import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";

export function Radio(props: h.JSX.HTMLAttributes<HTMLInputElement>) {
    return (
        <input class={tw`appearance-none bg-white rounded-full h-4 w-4 checked:bg-purple-600
                    focus:outline-none transition duration-200 mt-1 align-top mr-2 cursor-pointer`}
               type="radio"
               {...props}
        />
    );
}
