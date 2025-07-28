export const CONFIG = {
    INITIAL_N: 1000*1000,
    INITIAL_S: 0,
    INITIAL_T: 16,
    INITIAL_P: 10000,
    MAX_POINTS_TO_RENDER: 33*1000 // Based on doc rendering over 100k points within 60FPS may start to struggle, after downsampling we put 2 more points per point
}