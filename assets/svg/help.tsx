import { Svg, Path, G } from 'react-native-svg';

export default function Help() {
    return (
        <Svg
            width={20}
            height={20}
            viewBox={"26.67 29.13 158.93 159.72"}
        >
            <G
                transform={{
                    translate: [0, 194],
                    scale: [0.1, -0.1]
                }}
            >
                <Path d={"M945 1640 c-214 -31 -419 -161 -544 -343 -153 -224 -178 -536 -61 -786 146 -312 498 -503 833 -451 320 49 571 268 659 577 32 112 32 314 0 426 -111 390 -489 636 -887 577z m320 -174 c196 -67 337 -205 413 -404 24 -61 26 -80 26 -212 0 -132 -2 -151 -26 -212 -98 -258 -318 -421 -584 -436 -65 -3 -113 0 -168 12 -249 56 -454 265 -501 510 -19 98 -19 154 0 252 46 242 253 455 495 509 100 22 246 14 345 -19z"} fill="#FFFFFF"></Path>

                <Path d={"M884 1231 c-48 -22 -83 -66 -91 -115 -13 -84 107 -119 137 -40 9 23 12 24 119 24 86 0 113 -3 125 -16 33 -32 17 -56 -74 -109 -100 -58 -110 -70 -110 -127 0 -39 5 -54 25 -73 38 -39 95 -27 113 23 7 21 28 39 76 66 36 20 76 51 90 69 75 99 44 236 -66 291 -48 24 -62 26 -177 26 -101 0 -134 -4 -167 -19z"} fill="#FFFFFF"></Path>

                <Path d={"M999 622 c-28 -25 -34 -37 -34 -72 0 -35 6 -47 34 -72 29 -26 39 -30 75 -25 116 16 116 178 0 194 -36 5 -46 1 -75 -25z"} fill="#FFFFFF"></Path>

            </G>
        </Svg>
    )
}