/** @jsx h */
import { h } from "preact";
//import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";

export function GridButton(props: h.JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
      <button
          {...props}
          //disabled={!IS_BROWSER || props.disabled}
          class={tw`border-1 border-black bg-gray-800 text-pink-100 
          focus:outline-none focus:ring-0 hover:bg-blue-800 
              transition duration-150 ease-in-out h-24 text-5xl`}
      />
  );
}
