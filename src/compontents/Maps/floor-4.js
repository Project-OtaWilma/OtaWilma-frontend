import * as React from "react"
import { useAuth } from '../../features/authentication/authSlice'
import { useRooms } from '../../features/schedule/roomSlice';
import { useSelector, useDispatch } from 'react-redux'
import { LoadingScreen } from "../LoadingScreen/LoadingScreen";

export const MapCompontent = ({zoom, onLoad}) => {
    const dispatch = useDispatch()
    const auth = useSelector(useAuth)
    const rooms = useSelector(useRooms)

    return (
        <svg
        viewBox="0 0 2560 1440"
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        style={{
          fillRule: "evenodd",
          clipRule: "evenodd",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeMiterlimit: 1.5,
          transform: `scale(${zoom})`
        }}
      >
        <path
          d="M628 496h1123v133h185v316H628V496Z"
          style={{
            fill: "var(--map-background)",
            stroke: "var(--map-outline)",
            strokeWidth: "2.00px",
          }}
        />
        <path
          style={{
            fill: "none",
          }}
          d="M0 0h2560v1440H0z"
        />
        <circle
          cx={1325.75}
          cy={580.25}
          r={14.75}
          style={{
            fill: "#ebebeb",
            fillOpacity: 0,
            stroke: "var(--map-details)",
            strokeWidth: ".3px",
          }}
          fill="none"
        />
        <path
        onClick={() => onLoad('4270')}
          style={{
            fill: "var(--map-fill)",
            stroke: "var(--map-outline)",
            strokeWidth: "2.00px",
          }}
          d="M1018 773h375v162h-375z"
        />
        <path
        onClick={() => onLoad('4219')}
          style={{
            fill: "var(--map-fill)",
            stroke: "var(--map-outline)",
            strokeWidth: "2.00px",
          }}
          d="M1018 506h255v128h-255z"
        />
        <path
        onClick={() => onLoad('4223')}
          style={{
            fill: "var(--map-fill)",
            stroke: "var(--map-outline)",
            strokeWidth: "2.00px",
          }}
          d="M1393 506h348v128h-348z"
        />
        <path
        onClick={() => onLoad('4256')}
          style={{
            fill: "var(--map-fill)",
            stroke: "var(--map-outline)",
            strokeWidth: "2.00px",
          }}
          d="M1755 640h172v295h-172z"
        />
        <path
        onClick={() => onLoad('4265')}
          style={{
            fill: "var(--map-fill)",
            stroke: "var(--map-outline)",
            strokeWidth: "2.00px",
          }}
          d="M1393 773h362v162h-362z"
        />
        <path
          style={{
            fill: "none",
            stroke: "var(--map-details)",
            strokeWidth: ".6px",
          }}
          d="M806 818h25v91h-25zM825 517v22"
        />
        <path
          d="M817 503v10h16v-8.5"
          style={{
            fill: "none",
            stroke: "var(--map-details)",
            strokeWidth: ".54px",
          }}
          transform="matrix(1 0 0 1.2 0 -102.6)"
        />
        <path
          style={{
            fill: "none",
            stroke: "var(--map-details)",
            strokeWidth: ".6px",
          }}
          d="M825 543h42v19h-42zM792 619h33v18h-33zM825 566.5V614M1011 543h-40v19h40M831 637h180"
        />
        <path
          d="M920 504.5V631"
          style={{
            fill: "none",
            stroke: "var(--map-details)",
            strokeWidth: ".59px",
          }}
          transform="matrix(1 0 0 1.02767 0 -17.459)"
        />
        <path
          d="M635 674h31v105h-32"
          style={{
            fill: "none",
            stroke: "var(--map-details)",
            strokeWidth: ".6px",
          }}
        />
        <path
          d="M660 710h-26"
          style={{
            fill: "none",
            stroke: "var(--map-details)",
            strokeWidth: ".57px",
          }}
          transform="matrix(1.11538 0 0 1 -73.154 0)"
        />
        <path
          d="M660 710h-26"
          style={{
            fill: "none",
            stroke: "var(--map-details)",
            strokeWidth: ".57px",
          }}
          transform="matrix(1.11538 0 0 1 -73.154 34)"
        />
        <path
          style={{
            fill: "none",
            stroke: "var(--map-details)",
            strokeWidth: ".6px",
          }}
          d="M788 674h35v105h-35zM785 674h-37v105h37M752 710h33"
        />
        <path
          d="M752 710h33"
          style={{
            fill: "none",
            stroke: "var(--map-details)",
            strokeWidth: ".6px",
          }}
          transform="translate(-.5 34)"
        />
        <path
          d="M634 818h61v23h-61M754 939v-10h52v10M818.5 914v25M836 818h174M884 823v116M1010 779h-9V674h26v91M997 674h-49v105h50M1031 674h341v34h25v-34h37v91M1145 678v94"
          style={{
            fill: "none",
            stroke: "var(--map-details)",
            strokeWidth: ".6px",
          }}
        />
        <path
          d="M1145 678v94"
          style={{
            fill: "none",
            stroke: "var(--map-details)",
            strokeWidth: ".6px",
          }}
          transform="translate(64 -2)"
        />
        <path
          d="M1145 678v94"
          style={{
            fill: "none",
            stroke: "var(--map-details)",
            strokeWidth: ".6px",
          }}
          transform="translate(126 -2)"
        />
        <path
          d="M1213 723h55M1397 765v-54"
          style={{
            fill: "none",
            stroke: "var(--map-details)",
            strokeWidth: ".6px",
          }}
        />
        <path
          d="M1397 765v-54"
          style={{
            fill: "none",
            stroke: "var(--map-details)",
            strokeWidth: ".6px",
          }}
          transform="translate(-25)"
        />
        <path
          d="M1401 708h29"
          style={{
            fill: "none",
            stroke: "var(--map-details)",
            strokeWidth: ".6px",
          }}
        />
        <path
          d="M1401 708h29"
          style={{
            fill: "none",
            stroke: "var(--map-details)",
            strokeWidth: ".6px",
          }}
          transform="translate(0 32)"
        />
        <path
          d="M1401 708h29"
          style={{
            fill: "none",
            stroke: "var(--map-details)",
            strokeWidth: ".6px",
          }}
          transform="translate(84.5)"
        />
        <path
          d="M1401 708h29"
          style={{
            fill: "none",
            stroke: "var(--map-details)",
            strokeWidth: ".6px",
          }}
          transform="translate(84.5 32)"
        />
        <path
          d="M1482 765v-91h265M1518 678v87"
          style={{
            fill: "none",
            stroke: "var(--map-details)",
            strokeWidth: ".6px",
          }}
        />
        <path
          d="M1518 678v87"
          style={{
            fill: "none",
            stroke: "var(--map-details)",
            strokeWidth: ".6px",
          }}
          transform="translate(74)"
        />
        <path
          d="M1518 678v87"
          style={{
            fill: "none",
            stroke: "var(--map-details)",
            strokeWidth: ".6px",
          }}
          transform="translate(152)"
        />
        <path
          d="M1385 623h-19v11h19"
          style={{
            fill: "none",
            stroke: "var(--map-details)",
            strokeWidth: ".46px",
          }}
          transform="matrix(1 0 0 1.54545 4 -345.818)"
        />
        <path
          d="M1386 588h-7l.5-70h7.5"
          style={{
            fill: "none",
            stroke: "var(--map-details)",
            strokeWidth: ".6px",
          }}
        />
        <path
          d="M1386 588h-7l.5-70h7.5"
          style={{
            fill: "none",
            stroke: "var(--map-details)",
            strokeWidth: ".6px",
          }}
          transform="rotate(-180 1392.5 553)"
        />
        <path
          d="M1898 647v45h22M1762 808h16v92h-17M1385 813h-15v76h-26v40M1400 889h30v39"
          style={{
            fill: "none",
            stroke: "var(--map-details)",
            strokeWidth: ".6px",
          }}
        />
        <path
          style={{
            fill: "#ebebeb",
            fillOpacity: 0,
            stroke: "var(--map-details)",
            strokeWidth: ".3px",
          }}
          fill="none"
          d="M634 536h41v59h-41zM906 682h23v86h-23zM823 677h10v82h-10z"
        />
        <text
          x={239}
          y={393}
          style={{
            fontFamily: "'Arial-BoldMT','Arial',sans-serif",
            fontWeight: 700,
            fill: "var(--map-h1)",
            fontSize: "39.089px",
          }}
          transform="translate(897.257 261.561) scale(.77083)"
        >
          {"Luokka 1"}
        </text>
        <text
          x={220.496}
          y={393}
          style={{
            fontFamily: "'ArialMT','Arial',sans-serif",
            fill: "var(--map-h1)",
            fontSize: "39.089px",
          }}
          transform="translate(990.442 385.796) scale(.50244)"
        >
          {"Opetustila"}
        </text>
        <text
          x={265.015}
          y={393}
          style={{
            fontFamily: "'ArialMT','Arial',sans-serif",
            fill: "var(--map-h1)",
            fontSize: "39.089px",
            fillOpacity: 0.52,
          }}
          transform="matrix(.33724 0 0 .33724 1041.67 464.099)"
        >
          {"4219"}
        </text>
        <text
          x={239}
          y={393}
          style={{
            fontFamily: "'Arial-BoldMT','Arial',sans-serif",
            fontWeight: 700,
            fill: "var(--map-h1)",
            fontSize: "39.089px",
          }}
          transform="translate(1318.76 256.743) scale(.77083)"
        >
          {"Luokka 2"}
        </text>
        <text
          x={220.496}
          y={393}
          style={{
            fontFamily: "'ArialMT','Arial',sans-serif",
            fill: "var(--map-h1)",
            fontSize: "39.089px",
          }}
          transform="translate(1411.94 380.978) scale(.50244)"
        >
          {"Opetustila"}
        </text>
        <text
          x={265.015}
          y={393}
          style={{
            fontFamily: "'ArialMT','Arial',sans-serif",
            fill: "var(--map-h1)",
            fontSize: "39.089px",
            fillOpacity: 0.52,
          }}
          transform="matrix(.33724 0 0 .33724 1463.17 459.281)"
        >
          {"4223"}
        </text>
        <text
          x={239}
          y={393}
          style={{
            fontFamily: "'Arial-BoldMT','Arial',sans-serif",
            fontWeight: 700,
            fill: "var(--map-h1)",
            fontSize: "39.089px",
          }}
          transform="translate(1591.07 479.24) scale(.77083)"
        >
          {"Luokka 3"}
        </text>
        <text
          x={220.496}
          y={393}
          style={{
            fontFamily: "'ArialMT','Arial',sans-serif",
            fill: "var(--map-h1)",
            fontSize: "39.089px",
          }}
          transform="translate(1684.25 603.475) scale(.50244)"
        >
          {"Opetustila"}
        </text>
        <text
          x={265.015}
          y={393}
          style={{
            fontFamily: "'ArialMT','Arial',sans-serif",
            fill: "var(--map-h1)",
            fontSize: "39.089px",
            fillOpacity: 0.52,
          }}
          transform="matrix(.33724 0 0 .33724 1735.48 681.777)"
        >
          {"4256"}
        </text>
        <text
          x={239}
          y={393}
          style={{
            fontFamily: "'Arial-BoldMT','Arial',sans-serif",
            fontWeight: 700,
            fill: "var(--map-h1)",
            fontSize: "39.089px",
          }}
          transform="translate(1323.95 545.743) scale(.77083)"
        >
          {"Luokka 4"}
        </text>
        <text
          x={220.496}
          y={393}
          style={{
            fontFamily: "'ArialMT','Arial',sans-serif",
            fill: "var(--map-h1)",
            fontSize: "39.089px",
          }}
          transform="translate(1417.14 669.978) scale(.50244)"
        >
          {"Opetustila"}
        </text>
        <text
          x={265.015}
          y={393}
          style={{
            fontFamily: "'ArialMT','Arial',sans-serif",
            fill: "var(--map-h1)",
            fontSize: "39.089px",
            fillOpacity: 0.52,
          }}
          transform="matrix(.33724 0 0 .33724 1468.37 748.281)"
        >
          {"4265"}
        </text>
        <text
          x={239}
          y={393}
          style={{
            fontFamily: "'Arial-BoldMT','Arial',sans-serif",
            fontWeight: 700,
            fill: "var(--map-h1)",
            fontSize: "39.089px",
          }}
          transform="translate(955.153 545.743) scale(.77083)"
        >
          {"Luokka 5"}
        </text>
        <text
          x={220.496}
          y={393}
          style={{
            fontFamily: "'ArialMT','Arial',sans-serif",
            fill: "var(--map-h1)",
            fontSize: "39.089px",
          }}
          transform="translate(1048.34 669.978) scale(.50244)"
        >
          {"Opetustila"}
        </text>
        <text
          x={265.015}
          y={393}
          style={{
            fontFamily: "'ArialMT','Arial',sans-serif",
            fill: "var(--map-h1)",
            fontSize: "39.089px",
            fillOpacity: 0.52,
          }}
          transform="matrix(.33724 0 0 .33724 1099.57 748.281)"
        >
          {"4270"}
        </text>
        <circle
      cx={1449.5}
      cy={728.5}
      r={14.5}
      style={{
        fill: "#fefffe",
        fillOpacity: 0,
        stroke: "#000",
        strokeWidth: "1.53px",
      }}
      fill="none"
      transform="matrix(.72414 0 0 .72414 -340.138 198.966)"
    />
    <text
      x={1437.86}
      y={734}
      style={{
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "13.97px",
      }}
      transform="matrix(.72414 0 0 .72414 -339.896 198.603)"
    >
      {"WC"}
    </text>
    <circle
      cx={1449.5}
      cy={728.5}
      r={14.5}
      style={{
        fill: "#fefffe",
        fillOpacity: 0,
        stroke: "#000",
        strokeWidth: "1.53px",
      }}
      fill="none"
      transform="matrix(.72414 0 0 .72414 408.862 192.466)"
    />
    <text
      x={1437.86}
      y={734}
      style={{
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "13.97px",
      }}
      transform="matrix(.72414 0 0 .72414 409.104 192.103)"
    >
      {"WC"}
    </text>
      </svg>
  )
}
