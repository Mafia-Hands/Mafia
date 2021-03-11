import React, { useRef, useEffect, useState } from 'react';
import Player from './Player';
import styles from '../Styles/Table.module.css';

/**
 *
 * @param playerState [{playerId: <unique id string>, name: <string>, state: <"alive", "dead", "onTrial">}]
 *
 */
export default function Table({ playerStates }) {
    // used to keep reference to table dom element (to get width/height of it)
    const tableRef = useRef(null);
    // used to keep reference to player div (to get width)
    const playerRef = useRef(null);
    // ref to keep track of if first Render has happend (this was suggested online)
    const firstRender = useRef(true);

    // we need to keep track of px values of all players
    const [playerCoords, setPlayerCoords] = useState(initCoords());

    // initially, just put everyone at 0,0
    function initCoords() {
        const numPlayers = playerStates.length;

        const angleBetweenPlayers = 360 / numPlayers;

        return playerStates.map((player, idx) => ({
            playerId: player.playerId,
            top: 0,
            left: 0,
            angle: idx * angleBetweenPlayers,
        }));
    }

    function getDimensions(ref) {
        return ref.current.getBoundingClientRect();
    }

    /**
     * this used the parametric equations of a ellipse (i.e. the round table)
     *
     */
    function getCoordinatesFromAngleAroundEllipse(
        angleDegrees,
        xRadius,
        yRadius
    ) {
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
                angle: player.angle,
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
        <div className={styles.tableWrapper}>
            <div className={styles.table} ref={tableRef}>
                {playerCoords.map((p) => {
                    const { playerId, top, left } = p;

                    const { name: playerName } = playerStates.find(
                        (p) => p.playerId === playerId
                    );

                    return (
                        <Player
                            key={playerId}
                            playerId={playerId}
                            playerName={playerName}
                            childRef={playerRef}
                            style={{ top, left, position: 'absolute' }}
                            onClick={(e) => console.log(e)}
                        />
                    );
                })}
            </div>
            <div className={styles.overlay}></div>
        </div>
    );
}
