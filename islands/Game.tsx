/** @jsx h */
import {h} from "preact";
import { tw } from "@twind";
import {GridButton} from "../components/GridButton.tsx";
import {useEffect, useState} from "preact/hooks";
import {Radio} from "../components/Radio.tsx";
import {Button} from "../components/Button.tsx";

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'e087d87df3mshc6a4f6b56c10748p16ade8jsn0e0539caf4f1',
        'X-RapidAPI-Host': 'stujo-tic-tac-toe-stujo-v1.p.rapidapi.com'
    }
}

const g = {
    X: 'X',
    O: 'O',
}

export default function Game() {
    const [playerChosen, setPlayerChosen] = useState(g.O);
    const [computerTurn, setComputerTurn] = useState(false);
    const [state, setState] = useState({
        start: false,
        game: '---------',
        computer: g.X,
        player: g.O,
        winner: '',
    })

    const handleRestart = () => {
        setState(({
            start: false,
            game: '---------',
            computer: g.X,
            player: g.O,
            winner: '',
        }))
    }

    useEffect(()=> {
        checkWinner()
        if(computerTurn || state.winner){
            computerMove()
        }
    }, [computerTurn, state.game])

    const move = (player, index) => {
        setState(prevState => {
            let newGameState = prevState.game.split('').map((s, i) => {
                if(i == index){
                    return player;
                }
                return s
            }).join('')

            return {...prevState, game: newGameState}
        })
    }
    const checkWinner = () => {
        let board = [
            [...state.game.substring(0, 3)],
            [...state.game.substring(3, 6)],
            [...state.game.substring(6, 9)],
        ]
        let hasWinner = []
        let row = '', col = '', r = '', l = ''
        let draw = true
        for(let i = 1, m = 3; i <= board.length; i++, m--){
            for(let j = 1; j <= board[i-1].length; j++){
                if(board[i-1][j-1] === '-'){
                    draw = false
                }
                row += board[i-1][j-1]
                col += board[j-1][i-1]
                if(i == j)
                    l += board[i-1][j-1]
                if(m == j)
                    r += board[i-1][j-1]
            }
            hasWinner.push(row)
            hasWinner.push(col)
            row = ''
            col = ''
        }
        hasWinner.push(l)
        hasWinner.push(r)
        if(draw){
            setState(prevState => ({
                ...prevState, winner: 'Draw!'
            }))
        }

        let winner = ''
        if(hasWinner.includes(g.X.repeat(3))){
            winner = g.X
        }else if(hasWinner.includes(g.O.repeat(3))){
            winner = g.O
        }
        if(winner !== ''){
            if(state.computer == winner)
                setState(prevState => ({
                    ...prevState, winner: 'Computer Wins!'
                }))
            else
                setState(prevState => ({
                    ...prevState, winner: 'You Win!'
                }))
        }
    }

    const computerMove = async () => {
        let url = `https://stujo-tic-tac-toe-stujo-v1.p.rapidapi.com/${state.game}/${state.player}`
        await fetch(url, options)
            .then((response) => response.json())
            .then((result) => {
                move(state.computer, result?.recommendation)
                setComputerTurn(false)
            })
            .catch((error) => {
                setComputerTurn(false)
                console.error('Error:', error);
            });
    }



    const handleButtonOnClick = async (index) => {
        if(computerTurn || state.winner) return
        move(state.player, index)
        setComputerTurn(true)
    }

    const handleButtonOnClickStart = () => {
        setState(prevState => ({
            ...prevState,
            player: playerChosen == g.O ? g.O : g.X,
            computer: playerChosen == g.O ? g.X : g.O,
            start: true
        }))
        if(playerChosen == g.X){
            setComputerTurn(true)
        }
    }


    const onClickRadio = (e) => {
        setPlayerChosen(e.target.value)
    }


    return (
        <div class={tw`px-3 w-50`}>
            <div class={tw`${state.start ? 'hidden' : ''}`}>
                <div class={tw`mt-5`}>O will go first : </div>
                <div class={tw`flex flex-row items-center ml-5 mt-2`}>
                    <div class={tw`ml-3`}>
                        <Radio
                            value={g.O}
                            onClick={onClickRadio}
                            checked={playerChosen === g.O}
                        />
                        <label>O</label>
                    </div>
                    <div class={tw`ml-5 mr-5`}>
                        <Radio
                            value={g.X}
                            onClick={onClickRadio}
                            checked={playerChosen === g.X}
                        />
                        <label>X</label>
                    </div>
                    <Button onClick={handleButtonOnClickStart}>
                        Start
                    </Button>
                </div>
            </div>
            {state.winner ? (
                <div class={tw`text-left mb-3 mt-5`}>
                    <div>{state.winner}</div>
                    <Button
                        onClick={handleRestart}
                    >
                        Restart
                    </Button>
                </div>
            ): (
                computerTurn ? (
                    <div class={tw`text-left mt-5`}>Fetching Computer Move..</div>
                ): (
                    state.start && !state.winner ? (
                        <div class={tw`text-left mt-5`}>Your Turn!</div>
                    ): ''
                )
            )}
            <div>
                <div class={tw`grid grid-cols-3 w-96 ${state.start ? 'opacity-1' : 'opacity-0'}`}>
                    {state.game.split('').map((s, i) => {
                        if(s == '-'){
                            return (
                                <GridButton
                                    key={i}
                                    onClick={() => handleButtonOnClick(i)}
                                />
                            )
                        }else{
                            return(
                                <GridButton
                                    key={i}
                                    disabled
                                >
                                    {s}
                                </GridButton>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    );
}
