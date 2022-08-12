/** @jsx h */
import { h } from "preact";
//import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";

export function Button(props: h.JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
      <button
          {...props}
          type="button"
          class={tw`px-8 py-1 bg-purple-600 text-white 
                    text-sm uppercase rounded hover:bg-purple-700 
                    hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none 
                    focus:ring-0 transition duration-150 ease-in-out`}
      />
  );
}
