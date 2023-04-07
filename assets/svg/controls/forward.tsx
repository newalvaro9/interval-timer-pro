import { Svg, Path, G } from 'react-native-svg';

export default function Forward({ disabled }: { disabled: boolean }) {
    return (
        <Svg
            width={40}
            height={40}
            viewBox={"27.2 24.34 337.8 336.04"}
        >
            <G
                transform={{
                    translate: [0, 375],
                    scale: [0.1, -0.1]
                }}
            >
                <Path d={"M3283 3491 c-57 -26 -140 -89 -185 -140 l-38 -41 0 -1484 0 -1484 70 -63 c134 -121 196 -150 269 -124 44 15 235 164 245 191 3 9 6 678 6 1489 l0 1473 -65 63 c-128 124 -217 160 -302 120z"} fill={disabled ? "#83BBE0" : "#FFFFFF"} />

                <Path d={"M485 3226 c-66 -22 -108 -53 -143 -105 -33 -47 -34 -54 -43 -183 -16 -247 -31 -1230 -26 -1638 6 -423 23 -662 53 -731 23 -53 97 -105 176 -124 59 -13 74 -13 137 0 77 16 172 62 263 129 32 22 79 56 105 74 26 19 100 70 164 115 64 45 164 116 223 157 59 41 171 121 249 178 78 56 158 114 177 127 75 51 161 113 255 185 54 41 114 86 133 99 19 13 79 67 133 120 107 105 127 144 115 228 -13 95 -85 170 -370 384 -213 160 -244 183 -346 254 -52 36 -126 89 -165 116 -38 28 -81 58 -95 67 -23 15 -222 155 -329 230 -427 303 -544 358 -666 318z"} fill={disabled ? "#83BBE0" : "#FFFFFF"}></Path>

            </G>
        </Svg>
    )
}