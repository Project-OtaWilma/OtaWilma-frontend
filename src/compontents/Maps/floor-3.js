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
      style={{
        fill: "none",
      }}
      d="M0 0h2560v1440H0z"
    />
    <path
      d="M894 1093v35"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
      }}
      transform="translate(-59 -.5)"
    />
    <path
      d="M894 1093v35"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".64px",
      }}
      transform="matrix(0 -1 .85714 0 -75.857 1972.5)"
    />
    <path
      d="M894 1093v35"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".8px",
      }}
      transform="matrix(0 -1 .34286 0 417.257 1972.5)"
    />
    <path
      d="M649 11h239v140h91v927h807v89h130v240H979v-96h-81v115H666v-115h-17V11Z"
      style={{
        fill: "var(--map-background)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
    />
    <path
    onClick={() => onLoad('3128')}
      style={{
        cursor: "pointer",
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M658 20h220v132H658z"
    />
    <path
    onClick={() => onLoad('3129')}
      style={{
        cursor: "pointer",
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M658 152h125v133H658z"
    />
    <path
    onClick={() => onLoad('3132')}
      style={{
        cursor: "pointer",
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M658 285h125v133H658z"
    />
    <path
    onClick={() => onLoad('3142')}
      style={{
        cursor: "pointer",
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M658 418h227v134H658z"
    />
    <path
    onClick={() => onLoad('3144')}
      style={{
        cursor: "pointer",
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M658 552h231v134H658z"
    />
    <path
    onClick={() => onLoad('3145')}
      style={{
        cursor: "pointer",
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M658 686h231v135H658z"
    />
    <path
    onClick={() => onLoad('3146')}
      style={{
        cursor: "pointer",
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M658 821h231v134H658z"
    />
    <path
    onClick={() => onLoad('3147')}
      style={{
        cursor: "pointer",
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M658 955h129v131H658z"
    />
    <path
    onClick={() => onLoad('3223')}
      style={{
        cursor: "pointer",
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M986 1283h125v114H986z"
      transform="matrix(.976 0 0 1 26.664 0)"
    />
    <path
    onClick={() => onLoad('3225')}
      style={{
        cursor: "pointer",
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1111 1174h137v223h-137z"
    />
    <path
    onClick={() => onLoad('3226')}
      style={{
        cursor: "pointer",
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1248 1174h135v223h-135z"
    />
    <path
    onClick={() => onLoad('3227')}
      style={{
        cursor: "pointer",
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1383 1174h135v223h-135z"
    />
    <path
    onClick={() => onLoad('3237')}
      style={{
        cursor: "pointer",
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1518 1271h264v126h-264z"
    />
    <path
    onClick={() => onLoad('3240')}
      style={{
        cursor: "pointer",
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1782 1179h124v218h-124z"
    />
    <path
    onClick={() => onLoad('3238')}
      style={{
        cursor: "pointer",
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1694 1086h83v93h-83z"
      transform="matrix(1 0 0 .94624 0 58.387)"
    />
    <path
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
      }}
      d="M755 1221h139v44H755zM658 1182h43v132h-26"
    />
    <path
      d="M692 146v-5h66v5"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".49px",
      }}
      transform="matrix(1 0 0 1.4 0 -56.4)"
    />
    <path
      d="M692 146v-5h66v5"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".54px",
      }}
      transform="matrix(-1 0 0 -1.2 1450 331.2)"
    />
    <path
      d="M692 146v-5h66v5"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".49px",
      }}
      transform="matrix(1 0 0 1.4 2 343.6)"
    />
    <path
      d="M692 146v-5h66v5"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".54px",
      }}
      transform="matrix(-1 0 0 -1.2 1452 731.2)"
    />
    <path
      d="M692 146v-5h66v5"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".48px",
      }}
      transform="matrix(0 -1.07576 1.4 0 902.1 2117.42)"
    />
    <path
      d="M692 146v-5h66v5"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".53px",
      }}
      transform="matrix(0 1.07576 -1.2 0 1290.7 557.576)"
    />
    <path
      d="M692 146v-5h66v5"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".48px",
      }}
      transform="matrix(0 -1.07576 1.4 0 1039.6 2117.42)"
    />
    <path
      d="M692 146v-5h66v5"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".53px",
      }}
      transform="matrix(0 1.07576 -1.2 0 1428.2 557.576)"
    />
    <path
      d="M692 146v-5h66v5"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".53px",
      }}
      transform="matrix(0 -.98485 1.25455 0 1594.11 2050.52)"
    />
    <path
      d="M692 146v-5h66v5"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".38px",
      }}
      transform="matrix(0 .98485 -2.01818 0 2081.56 622.485)"
    />
    <path
      d="M1511 1371h-13v-68h14"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
      }}
    />
    <path
      d="M1511 1371h-13v-68h14"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".68px",
      }}
      transform="matrix(1 0 0 .7353 0 269.912)"
    />
    <path
      d="M692 146v-5h66v5"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".47px",
      }}
      transform="matrix(0 -1.16667 1.4 0 1039.6 2088.33)"
    />
    <path
      d="M692 146v-5h66v5"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".51px",
      }}
      transform="matrix(0 1.16667 -1.2 0 1428.2 396.667)"
    />
    <path
      d="M784 813v-19h74v20"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".57px",
      }}
      transform="matrix(1 0 0 1.1 0 -79.4)"
    />
    <path
      d="M692 146v-5h66v5"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".47px",
      }}
      transform="matrix(1.15152 0 0 1.4 -14.848 343.6)"
    />
    <path
      d="M692 146v-5h66v5"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".51px",
      }}
      transform="matrix(-1.15152 0 0 -1.2 1654.85 731.2)"
    />
    <path
      d="M974 279h-4v12h5"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
      }}
    />
    <path
      d="M974 279h-4v12h5"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
      }}
      transform="translate(0 132)"
    />
    <path
      d="M974 279h-4v12h5"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
      }}
      transform="translate(0 267)"
    />
    <path
      d="M974 279h-4v12h5"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
      }}
      transform="translate(0 401)"
    />
    <path
      d="M974 279h-4v12h5"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
      }}
      transform="translate(0 533)"
    />
    <path
      d="M974 279h-4v12h5"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
      }}
      transform="translate(0 669)"
    />
    <path
      d="M796 977h98v26h-36v39h36v90H788v-37"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
      }}
    />
    <path
      d="M793 322h97v96h-2"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".59px",
      }}
      transform="matrix(1.04124 0 0 1 -36.701 0)"
    />
    <path
      d="M791 252h65v-93M890 159v79h81M881 279h12v12h-12z"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
      }}
    />
    <path
      style={{
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
      }}
      fill="none"
      d="M807 1067h51v23h-51z"
    />
    <path
      d="M755 1095v37h-97M674 1346h81v-32h135M983 1283h-3v-112h110v36h15"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
      }}
    />
    <path
      d="M1659 1261v-57h115"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".58px",
      }}
      transform="matrix(1 0 0 1.05263 0 -63.368)"
    />
    <path
      d="M1604 1261v-87h-77"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".58px",
      }}
      transform="matrix(1.03896 0 0 1.03448 -62.493 -40.483)"
    />
    <path
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
      }}
      d="M1659 1310h15v15h-15zM1641 1169h18v11h-18z"
    />
    <path
      d="M974 1070.5h-3v15h15v-4.17"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".54px",
      }}
      transform="matrix(1 0 0 1.2 0 -214.1)"
    />
    <path
      d="M1106 1085.5v7.5h15v-7.5"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".53px",
      }}
      transform="matrix(1 0 0 1.26667 0 -291.467)"
    />
    <path
      d="M1106 1085.5v7.5h15v-7.5"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".53px",
      }}
      transform="matrix(1 0 0 1.26667 134 -291.217)"
    />
    <path
      d="M1106 1085.5v7.5h15v-7.5"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".53px",
      }}
      transform="matrix(1 0 0 1.26667 268 -291.217)"
    />
    <path
      d="M1106 1085.5v7.5h15v-7.5"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".53px",
      }}
      transform="matrix(1 0 0 1.26667 402 -291.217)"
    />
    <path
      d="M1106 1085.5v7.5h15v-7.5"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".53px",
      }}
      transform="matrix(1 0 0 1.26667 535 -291.217)"
    />
    <path
      style={{
        fill: "#ebebeb",
        fillOpacity: 0,
        stroke: "",
        strokeWidth: ".3px",
      }}
      fill="none"
      d="M927 677h42v22h-42zM920 404h49v9h-49zM920 419h49v9h-49zM927 945h42v19h-42zM937 1073h32v10h-32z"
    />
    <path
      style={{
        fill: "#ebebeb",
        fillOpacity: 0,
        stroke: "",
        strokeWidth: ".3px",
      }}
      fill="none"
      d="M1102 1095h22v44h-22z"
      transform="translate(.5 .5)"
    />
    <path
      style={{
        fill: "#ebebeb",
        fillOpacity: 0,
        stroke: "",
        strokeWidth: ".3px",
      }}
      fill="none"
      d="M1372 1095h24v41h-24z"
      transform="translate(-2.5 2)"
    />
    <path
      style={{
        fill: "#ebebeb",
        fillOpacity: 0,
        stroke: "",
        strokeWidth: ".3px",
      }}
      fill="none"
      d="M1372 1095h24v41h-24z"
      transform="translate(-136.5 3.5)"
    />
    <path
      style={{
        fill: "#ebebeb",
        fillOpacity: 0,
        stroke: "",
        strokeWidth: ".3px",
      }}
      fill="none"
      d="M1372 1095h24v41h-24z"
      transform="translate(131.5 3.5)"
    />
    <path
      style={{
        fill: "#ebebeb",
        fillOpacity: 0,
        stroke: "",
        strokeWidth: ".3px",
      }}
      fill="none"
      d="M1639 1095h24v41h-24z"
      transform="translate(-2.5 2)"
    />
    <path
      style={{
        fill: "#ebebeb",
        fillOpacity: 0,
        stroke: "",
        strokeWidth: ".3px",
      }}
      fill="none"
      d="M929 859h44v14h-44zM929 876h44v14h-44zM932 759h38v13h-38zM929 714h39v13h-39zM929 546h39v15h-39zM760 1268h129v42H760z"
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
      transform="translate(549.462 -215.102) scale(.77083)"
    >
      {"3128"}
    </text>
    <text
      x={220.496}
      y={393}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fill: "var(--map-h1)",
        fontSize: "39.089px",
      }}
      transform="translate(612.688 -91.868) scale(.50244)"
    >
      {"Opetustila"}
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
      transform="translate(506.912 -82.602) scale(.77083)"
    >
      {"3129"}
    </text>
    <text
      x={220.496}
      y={393}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fill: "var(--map-h1)",
        fontSize: "39.089px",
      }}
      transform="translate(570.137 40.632) scale(.50244)"
    >
      {"Opetustila"}
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
      transform="translate(502.217 48.561) scale(.77083)"
    >
      {"3132"}
    </text>
    <text
      x={220.496}
      y={393}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fill: "var(--map-h1)",
        fontSize: "39.089px",
      }}
      transform="translate(565.442 171.796) scale(.50244)"
    >
      {"Opetustila"}
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
      transform="translate(553.217 182.061) scale(.77083)"
    >
      {"3142"}
    </text>
    <text
      x={220.496}
      y={393}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fill: "var(--map-h1)",
        fontSize: "39.089px",
      }}
      transform="translate(616.442 305.296) scale(.50244)"
    >
      {"Opetustila"}
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
      transform="translate(555.217 316.061) scale(.77083)"
    >
      {"3144"}
    </text>
    <text
      x={220.496}
      y={393}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fill: "var(--map-h1)",
        fontSize: "39.089px",
      }}
      transform="translate(618.442 439.296) scale(.50244)"
    >
      {"Opetustila"}
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
      transform="translate(554.898 450.561) scale(.77083)"
    >
      {"3145"}
    </text>
    <text
      x={220.496}
      y={393}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fill: "var(--map-h1)",
        fontSize: "39.089px",
      }}
      transform="translate(618.123 573.796) scale(.50244)"
    >
      {"Opetustila"}
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
      transform="translate(555.217 585.061) scale(.77083)"
    >
      {"3146"}
    </text>
    <text
      x={220.496}
      y={393}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fill: "var(--map-h1)",
        fontSize: "39.089px",
      }}
      transform="translate(618.442 708.296) scale(.50244)"
    >
      {"Opetustila"}
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
      transform="translate(504.217 717.561) scale(.77083)"
    >
      {"3147"}
    </text>
    <text
      x={220.496}
      y={393}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fill: "var(--map-h1)",
        fontSize: "39.089px",
      }}
      transform="translate(567.442 840.796) scale(.50244)"
    >
      {"Opetustila"}
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
      transform="translate(831.717 1037.06) scale(.77083)"
    >
      {"3223"}
    </text>
    <text
      x={220.496}
      y={393}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fill: "var(--map-h1)",
        fontSize: "39.089px",
      }}
      transform="translate(894.942 1160.3) scale(.50244)"
    >
      {"Opetustila"}
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
      transform="translate(961.217 982.561) scale(.77083)"
    >
      {"3225"}
    </text>
    <text
      x={220.496}
      y={393}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fill: "var(--map-h1)",
        fontSize: "39.089px",
      }}
      transform="translate(1024.44 1105.8) scale(.50244)"
    >
      {"Opetustila"}
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
      transform="translate(1097.22 986.009) scale(.77083)"
    >
      {"3226"}
    </text>
    <text
      x={220.496}
      y={393}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fill: "var(--map-h1)",
        fontSize: "39.089px",
      }}
      transform="translate(1160.44 1109.24) scale(.50244)"
    >
      {"Opetustila"}
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
      transform="translate(1232.22 989.456) scale(.77083)"
    >
      {"3227"}
    </text>
    <text
      x={220.496}
      y={393}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fill: "var(--map-h1)",
        fontSize: "39.089px",
      }}
      transform="translate(1295.44 1112.69) scale(.50244)"
    >
      {"Opetustila"}
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
      transform="translate(1403.22 1023.67) scale(.77083)"
    >
      {"3237"}
    </text>
    <text
      x={220.496}
      y={393}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fill: "var(--map-h1)",
        fontSize: "39.089px",
      }}
      transform="translate(1466.44 1146.9) scale(.50244)"
    >
      {"Opetustila"}
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
      transform="translate(1625.72 985.061) scale(.77083)"
    >
      {"3240"}
    </text>
    <text
      x={220.496}
      y={393}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fill: "var(--map-h1)",
        fontSize: "39.089px",
      }}
      transform="translate(1688.94 1108.3) scale(.50244)"
    >
      {"Opetustila"}
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
      transform="matrix(.48614 0 0 .48611 1598.24 945.666)"
    >
      {"3238"}
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
      transform="matrix(.72414 0 0 .72414 -210.138 -157.534)"
    />
    <text
      x={1437.86}
      y={734}
      style={{
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "13.97px",
      }}
      transform="matrix(.72414 0 0 .72414 -209.896 -157.897)"
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
      transform="matrix(.72414 0 0 .72414 -220.638 492.966)"
    />
    <text
      x={1437.86}
      y={734}
      style={{
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "13.97px",
      }}
      transform="matrix(.72414 0 0 .72414 -220.396 492.603)"
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
      transform="matrix(.72414 0 0 .72414 -7.138 699.466)"
    />
    <text
      x={1437.86}
      y={734}
      style={{
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "13.97px",
      }}
      transform="matrix(.72414 0 0 .72414 -6.896 699.103)"
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
      transform="matrix(.72414 0 0 .72414 514.362 691.466)"
    />
    <text
      x={1437.86}
      y={734}
      style={{
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "13.97px",
      }}
      transform="matrix(.72414 0 0 .72414 514.604 691.103)"
    >
      {"WC"}
    </text>
  </svg>
  )
}
