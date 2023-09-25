import { useCallback } from "react";
import Particles from "react-tsparticles";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.
import styles from './background.module.css';

const Background = () => {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        //await loadFull(engine);
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    return (
        <Particles
            className={styles.background}
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                name: "Snow",
                particles: {
                    number: {
                        value: 400,
                        density: {
                            enable: true,
                        },
                    },
                    color: {
                        value: "#fff",
                    },
                    shape: {
                        type: "circle",
                    },
                    opacity: {
                        value: 1,
                    },
                    size: {
                        value: 10,
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "bottom",
                        straight: true,
                    },
                    wobble: {
                        enable: true,
                        distance: 10,
                        speed: 10,
                    },
                    zIndex: {
                        value: {
                            min: 0,
                            max: 100,
                        },
                        opacityRate: 10,
                        sizeRate: 10,
                        velocityRate: 10,
                    },
                },
                background: {
                    color: "#EFF2F1",
                },
            }}
        />
    );
};

export default Background