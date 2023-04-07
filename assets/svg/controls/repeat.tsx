import { Svg, Path, G } from 'react-native-svg';

export default function Repeat() {
    return (
        <Svg
            width={40}
            height={40}
            viewBox={"15.7 18 141.27 141"}
        >
            <G
                transform={{
                    translate: [0, 176],
                    scale: [0.1, -0.1]
                }}
            >
                <Path d={"M1069 1561 c-19 -15 -24 -30 -27 -85 l-4 -66 -222 0 c-121 0 -249 -5 -284 -10 -190 -27 -350 -188 -372 -373 -12 -104 11 -146 81 -147 56 0 78 24 89 98 5 35 20 85 33 110 27 53 100 114 157 131 23 7 128 11 279 11 l241 0 0 -56 c0 -30 5 -64 10 -75 16 -28 67 -51 99 -44 33 7 225 197 240 238 17 44 -6 82 -116 190 -93 90 -103 97 -140 97 -25 0 -50 -7 -64 -19z"} fill="#FFFFFF" />
                
                <Path d={"M1453 865 c-38 -16 -48 -34 -58 -100 -10 -70 -30 -114 -73 -158 -77 -80 -85 -82 -373 -85 l-256 -3 -6 62 c-7 77 -36 113 -92 113 -32 0 -47 -11 -148 -112 -105 -105 -112 -114 -112 -152 0 -38 7 -47 110 -150 104 -104 112 -110 151 -110 59 0 84 30 91 109 l6 61 221 0 c121 0 250 5 285 10 161 23 304 145 353 302 22 72 24 156 3 185 -22 32 -65 43 -102 28z"} fill="#FFFFFF" />

            </G>
        </Svg>
    )
}