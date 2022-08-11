/** @jsx h */
import {Fragment, h} from "preact";
import { tw } from "@twind";
import {Button} from "../components/Button.tsx";
import {useEffect, useState} from "preact/hooks";
import {prerelease} from "https://deno.land/std@0.150.0/semver/mod.ts";
import stat = Deno.stat;

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'e087d87df3mshc6a4f6b56c10748p16ade8jsn0e0539caf4f1',
        'X-RapidAPI-Host': 'stujo-tic-tac-toe-stujo-v1.p.rapidapi.com'
    }
}

export default function Game() {
    const [state, setState] = useState({
        game: '---------',
        computer: 'O',
        player: 'X',
    })

    const getNewState = async (gameState) => {
        let url = `https://stujo-tic-tac-toe-stujo-v1.p.rapidapi.com/${gameState}/${state.player}`
        await fetch(url, options)
            .then((response) => response.json())
            .then((result) => {
                setState(prevState => {
                    let newGameState = prevState.game.split('').map((s, i) => {
                        if(i == result?.recommendation){
                            return prevState.computer;
                        }
                        return s
                    }).join('')

                    return {...prevState, game: newGameState}
                })
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleButtonOnClick = async (index) => {
        let newGameState = ''
        setState(prevState => {
            newGameState = prevState.game.split('').map((s, i) => {
                if(i == index){
                    return prevState.player;
                }
                return s
            }).join('')

            return {...prevState, game: newGameState}
        })
        await getNewState(newGameState)
    }

    return (
        <Fragment>
            <div class={tw`grid grid-cols-3`}>
                {state.game.split('').map((s, i) => {
                    return (
                        <Button
                            onClick={() => handleButtonOnClick(i)}
                            class={tw`border-1 py-5`}>
                            {s}
                        </Button>
                    )
                })}
            </div>
        </Fragment>
    );
}
