import { Svg, Path, G } from 'react-native-svg';

export default function Off({ disabled }: { disabled: boolean }) {
    return (
        <Svg
            width={40}
            height={40}
            viewBox={"38.53 23.11 199.47 159.61"}
        >
            <G
                transform={{
                    translate: [0, 198],
                    scale: [0.1, -0.1]
                }}
            >
                <Path d={"M419 1740 c-29 -17 -43 -64 -27 -93 18 -35 1871 -1486 1906 -1493 41 -8 82 28 82 72 0 37 -23 59 -241 226 -59 46 -109 87 -109 92 0 4 14 25 30 46 43 54 96 174 109 244 33 181 -12 362 -123 494 -86 101 -136 123 -181 77 -39 -38 -32 -64 34 -133 93 -100 130 -193 131 -329 0 -106 -33 -197 -105 -287 -17 -23 -35 -16 -99 38 l-38 33 35 46 c84 110 70 294 -30 389 -58 55 -126 41 -139 -28 -5 -25 0 -38 24 -65 42 -48 52 -72 52 -119 0 -45 -11 -72 -43 -107 l-20 -22 -93 72 -94 72 0 303 c0 329 -3 346 -55 370 -62 28 -60 29 -277 -165 -75 -68 -141 -123 -147 -123 -5 0 -107 77 -227 171 -120 94 -235 184 -257 200 -41 30 -70 35 -98 19z"} fill={disabled ? "#83BBE0" : "#FFFFFF"} />

                <Path d={"M595 1228 c-33 -18 -76 -61 -93 -93 -11 -21 -17 -66 -20 -156 -5 -160 9 -220 67 -272 52 -47 93 -57 232 -57 l115 0 200 -177 c244 -218 251 -223 281 -223 36 0 78 25 91 55 7 16 12 76 12 153 l0 127 -415 328 c-229 180 -423 327 -433 327 -9 0 -26 -6 -37 -12z"} fill={disabled ? "#83BBE0" : "#FFFFFF"}></Path>

            </G>
        </Svg>
    )
}