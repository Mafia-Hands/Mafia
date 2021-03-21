import React, { useRef, useEffect, useState, useContext } from 'react';
import Player from './Player';
import styles from '../Styles/Table.module.css';
import { GeneralContext } from '../App';
import { GameContext } from '../Pages/GamePage';
import { Button } from '@material-ui/core';
import socket from '../Socket';
import classNames from 'classnames';

/**
 *
 * @param playerState [{playerId: <unique id string>, name: <string>, state: <"alive", "dead", "onTrial">}]
 *
 */
export default function Table() {
    const { state: generalState } = useContext(GeneralContext);
    const { state: gameState, dispatch } = useContext(GameContext);

    const isNight = gameState.dayPeriod === 'Night';
    const amIDead = !gameState.alivePlayers.includes(generalState.nickname);

    // apply styles based on whether certain props is true
    const tableWrapperStyle = classNames({
        [styles.tableWrapper]: true,
        [styles.day]: !isNight,
        [styles.night]: isNight,
    });

    // used to keep reference to table dom element (to get width/height of it)
    const tableRef = useRef(null);
    // used to keep reference to player div (to get width)
    const playerRef = useRef(null);
    // ref to keep track of if first Render has happend (this was suggested online)
    const firstRender = useRef(true);

    // we need to keep track of px values of all players
    const [playerCoords, setPlayerCoords] = useState(initCoords());

    useEffect(() => {
        setPlayerCoords((prevState) =>
            prevState.map((p) => ({
                ...p,
                onTrial:
                    gameState.votingState.type === 'trial' && gameState.votingState.votablePlayers.includes(p.name),
            }))
        );
    }, [gameState.votingState]);

    // initially, just put everyone at 0,0
    function initCoords() {
        const numPlayers = generalState.players.length;

        const angleBetweenPlayers = 360 / numPlayers;

        return generalState.players.map((player, idx) => {
            return {
                playerId: player,
                name: player,
                top: 0,
                left: 0,
                angle: idx * angleBetweenPlayers,
                onTrial: false,
            };
        });
    }

    function getDimensions(ref) {
        return ref.current.getBoundingClientRect();
    }

    /**
     * this used the parametric equations of a ellipse (i.e. the round table)
     *
     */
    function getCoordinatesFromAngleAroundEllipse(angleDegrees, xRadius, yRadius) {
        const rads = ((angleDegrees + 90) * Math.PI) / 180;
        const x = xRadius * Math.cos(rads) + xRadius;
        const y = yRadius * Math.sin(rads) + yRadius;

        return { x, y };
    }

    /**
     * Compute coordinates for a specific player/angle
     * @param {*} angle
     * @returns {left, top } css properties to set for that player
     */
    function computeCoordinates(angle) {
        // get top/left positions for player (unadjusted for width)
        let { x, y } = getCoordinatesFromAngleAroundEllipse(
            angle,
            getDimensions(tableRef).width / 2,
            getDimensions(tableRef).height / 2
        );

        // adjust for width/height as coords start from top left of div
        x -= getDimensions(playerRef).width / 2;
        y -= getDimensions(playerRef).height / 2;

        return { left: x, top: y };
    }

    /** 
        When the page is resized, go through each player and recompute its coords on the table.
        i.e. loop through players and call computeCoordinates
    */
    const computeAllCoordinates = () => {
        if (tableRef.current) {
            const newCoords = playerCoords.map((player) => ({
                playerId: player.playerId,
                name: player.name,
                angle: player.angle,
                onTrial: player.onTrial,
                ...computeCoordinates(player.angle),
            }));
            setPlayerCoords(newCoords);
        }
    };

    /** This is taken from https://www.pluralsight.com/guides/re-render-react-component-on-window-resize to throttle events */
    function debounce(fn, ms) {
        let timer;
        return (_) => {
            clearTimeout(timer);
            timer = setTimeout((_) => {
                timer = null;
                fn.apply(this, arguments);
            }, ms);
        };
    }

    function abstainHandler() {
        socket.emit(`trial-vote`, { votingFor: `abstain Vote` });
        dispatch({ type: 'show-selected', status: `Voted to Abstain` });
    }

    useEffect(() => {
        // we want the positions to be computed after the first render
        if (firstRender.current) {
            computeAllCoordinates();
            firstRender.current = false;
        }

        // we also want the positions to be computed after the window is resized
        const debouncedResizeHandler = debounce(computeAllCoordinates);
        window.addEventListener('resize', debouncedResizeHandler);

        return () => {
            window.removeEventListener('resize', debouncedResizeHandler);
        };
    });

    return (
        <div className={tableWrapperStyle}>
            <div className={styles.table} ref={tableRef}>
                {playerCoords
                    .filter((p) => !p.onTrial)
                    .map((p) => {
                        const { playerId, name, top, left } = p;

                        return (
                            <Player
                                key={playerId}
                                playerId={playerId}
                                playerName={name}
                                childRef={playerRef}
                                style={{ top, left, position: 'absolute' }}
                            />
                        );
                    })}

                <div className={styles.trialBox}>
                    {playerCoords
                        .filter((p) => p.onTrial)
                        .map((p) => {
                            const { playerId, name } = p;

                            return (
                                <>
                                    <Player key={playerId} playerId={playerId} playerName={name} childRef={playerRef} />{' '}
                                    <Button
                                        onClick={() => {
                                            abstainHandler();
                                        }}
                                        style={{
                                            visibility: (gameState.phase !== 'trial-start' || amIDead) && 'hidden',
                                        }}
                                        variant="contained"
                                    >
                                        Abstain
                                    </Button>
                                </>
                            );
                        })}
                </div>
            </div>
            <div className={styles.overlay}></div>
        </div>
    );
}
