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
      viewBox="0 0 4741 2667"
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
        transform="scale(1.85185)"
      />
      <path
        d="M647 7h237v135h90v266h523V269h283v888h125v241H974v-43h-90v58H647V7Z"
        style={{
          fill: "#fff",
        }}
        transform="scale(1.85185)"
      />
      <path
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".3px",
        }}
        d="M974 790h42v197h-42z"
        transform="scale(1.85185)"
      />
      <path
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".32px",
        }}
        d="M974 790h42v197h-42z"
        transform="matrix(1.6314 0 0 1.85185 1109.17 0)"
      />
      <path
        d="M971 1091v71M971 1068h-10v20h20v-11"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".3px",
        }}
        transform="scale(1.85185)"
      />
      <path
        d="M888 548h86v-51"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".59px",
        }}
        transform="matrix(1.85185 0 0 1.92448 0 -39.797)"
      />
      <path
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".31px",
        }}
        d="M744 1257h141v44H744z"
        transform="matrix(1.73365 0 0 1.85185 97.202 0)"
      />
      <path
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".3px",
        }}
        d="M915 799h48v26h-48zM1633 1070h18v17h-18z"
        transform="scale(1.85185)"
      />
      <path
        d="M1533 503h47v112h-47M1508 462h72V354h-33v-44h81"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".6px",
        }}
        transform="scale(1.85185)"
      />
      <path
        d="M1568 1263v-101h26v101"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".59px",
        }}
        transform="matrix(1.85185 0 0 1.90685 0 -63.916)"
      />
      <path
        d="M977 1269h-3v-107h108v37h21"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".6px",
        }}
        transform="scale(1.85185)"
      />
      <path
        d="M652 1303h316v44"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".58px",
        }}
        transform="matrix(1.85185 0 0 1.9781 0 -164.52)"
      />
      <path
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".6px",
        }}
        d="M744 1210h141v45H744zM782 993h63"
        transform="scale(1.85185)"
      />
      <path
        d="M782 993h63"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".6px",
        }}
        transform="translate(-.926 72.222) scale(1.85185)"
      />
      <path
        d="M651.5 367.5H745M777 478v54"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".6px",
        }}
        transform="scale(1.85185)"
      />
      <path
        d="M777 478v54"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".6px",
        }}
        transform="translate(74.074) scale(1.85185)"
      />
      <path
        d="M777 478v54"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".6px",
        }}
        transform="translate(192.592) scale(1.85185)"
      />
      <path
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: 3,
        }}
        d="M1106 1162h133v230h-133z"
        transform="scale(1.85185)"
      />
      <path
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: "3.06px",
        }}
        d="M975 1269h131v123H975z"
        transform="matrix(1.78117 0 0 1.85185 78.173 0)"
      />
      <path
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: 3,
        }}
        d="M1633 278h138v261h-138zM1370 408h132v95h26v112h-158V408Z"
        transform="scale(1.85185)"
      />
      <path
        d="M1013 415v73"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".6px",
        }}
        transform="scale(1.85185)"
      />
      <path
        d="M1013 415v73"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".6px",
        }}
        transform="translate(83.333) scale(1.85185)"
      />
      <path
        d="M1013 415v73"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".6px",
        }}
        transform="translate(162.963) scale(1.85185)"
      />
      <path
        d="M1013 415v73"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".6px",
        }}
        transform="translate(246.296) scale(1.85185)"
      />
      <path
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: 3,
        }}
        d="M1014 531h90v84h-90zM1104 531h97v84h-97zM1236 408h134v207h-134z"
        transform="scale(1.85185)"
      />
      <path
        d="M647 7h237v135h90v266h523V269h283v888h125v241H974v-43h-90v58H647V7Z"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: 3,
        }}
        transform="scale(1.85185)"
      />
      <path
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: 3,
        }}
        d="M654 14h224v128H654zM777 411h106v61H777zM777 537h106v72H777zM654 411h95v66h-95zM654 477h95v60h-95zM654 550h95v128h-95zM654 678h95v69h-95zM654 747h95v57h-95zM654 813h95v65h-95zM654 878h95v64h-95zM654 1034h95v47h-95zM654 954h95v80h-95zM777 678h108v69H777zM777 747h108v66H777zM777 813h108v65H777zM777 878h108v64H777zM1548 674h223v132h-223zM1548 806h223v135h-223zM1771 1162h128v230h-128zM1571 1269h200v123h-200zM1374 1162h133v230h-133zM1239 1162h135v230h-135z"
        transform="scale(1.85185)"
      />
      <path
        d="M703 148v168"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".59px",
        }}
        transform="matrix(1.85185 0 0 1.88492 0 -4.894)"
      />
      <path
        d="M785 148v96h60v-96M789 212h52M651 189h47"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".6px",
        }}
        transform="scale(1.85185)"
      />
      <path
        d="M651 189h47"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".6px",
        }}
        transform="translate(.926 85.185) scale(1.85185)"
      />
      <path
        d="M651 189h47"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".6px",
        }}
        transform="translate(.926 166.667) scale(1.85185)"
      />
      <path
        d="M651 324h98v82M777 406v-82h106v82M777 949v173h108v-90h-36v-39h36v-45M744 1086v36h-92"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".6px",
        }}
        transform="scale(1.85185)"
      />
      <path
        d="M1513 1170h20v93"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".59px",
        }}
        transform="matrix(1.85185 0 0 1.9116 0 -69.892)"
      />
      <path
        d="M1650 1266v-72h117M1633 545v123M974 1074v-84h45V787h-45V687h520v100h-40v203h40v84H974Z"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".6px",
        }}
        transform="scale(1.85185)"
      />
      <path
        d="M1580 464v36"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".6px",
        }}
        transform="translate(-3.704) scale(1.85185)"
      />
      <path
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".3px",
        }}
        d="M1094 1086h25v45h-25zM1228 1085h24v44h-24zM1362 1085h24v44h-24zM1496 1085h20v50h-20zM1563 1068h27v67h-27zM1563 965h27v67h-27z"
        transform="scale(1.85185)"
      />
      <path
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".35px",
        }}
        d="M1496 1070h15v15h-15z"
        transform="matrix(1.60494 0 0 1.60494 369.383 264.198)"
      />
      <path
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".3px",
        }}
        d="M1098 672h10v6h-10z"
        transform="scale(1.85185)"
      />
      <path
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".3px",
        }}
        d="M1098 672h10v6h-10z"
        transform="translate(246.296) scale(1.85185)"
      />
      <path
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".3px",
        }}
        d="M1098 672h10v6h-10z"
        transform="translate(498.148) scale(1.85185)"
      />
      <path
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".3px",
        }}
        d="M1098 672h10v6h-10z"
        transform="translate(716.666 5.556) scale(1.85185)"
      />
      <path
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".3px",
        }}
        d="M1098 672h10v6h-10z"
        transform="translate(-229.63 5.556) scale(1.85185)"
      />
      <path
        d="M888 1078h70M913 449h30v70h-30zM913 417h58v15h-58z"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".3px",
        }}
        transform="scale(1.85185)"
      />
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "22.337px",
        }}
        transform="matrix(2.16028 0 0 2.16028 -226.942 -16.997)"
      >
        {"2128"}
      </text>
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'ArialMT','Arial',sans-serif",
          fontSize: "22.337px",
        }}
        transform="matrix(1.60904 0 0 1.5256 181.062 57.017)"
      >
        {"T"}
        <tspan x="749.412px 760.58px" y="63px 63px">
          {"y\xF6"}
        </tspan>
        {"tila"}
      </text>
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "22.337px",
        }}
        transform="matrix(1.27534 0 0 1.27534 565.06 737.32)"
      >
        {"2128"}
      </text>
      <text
        x={701.608}
        y={63}
        style={{
          fontFamily: "'ArialMT','Arial',sans-serif",
          fontSize: "22.337px",
        }}
        transform="matrix(.94991 0 0 .90066 805.93 781.014)"
      >
        {"Neuvottelutila"}
      </text>
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "22.337px",
        }}
        transform="matrix(1.27534 0 0 1.27534 327.098 858.616)"
      >
        {"2159"}
      </text>
      <text
        x={733.275}
        y={63}
        style={{
          fontFamily: "'ArialMT','Arial',sans-serif",
          fontSize: "22.337px",
        }}
        transform="matrix(.94991 0 0 .90066 567.968 902.31)"
      >
        {"Rehtori"}
      </text>
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "22.337px",
        }}
        transform="translate(167.495 1043.58) scale(1.4848)"
      >
        {"2162"}
      </text>
      <text
        x={717.75}
        y={63}
        style={{
          fontFamily: "'ArialMT','Arial',sans-serif",
          fontSize: "22.337px",
        }}
        transform="matrix(1.10593 0 0 1.04858 447.925 1094.45)"
      >
        {"Kokoustila"}
      </text>
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "22.337px",
        }}
        transform="translate(166.687 1216.125) scale(1.4848)"
      >
        {"2167"}
      </text>
      <text
        x={733.275}
        y={63}
        style={{
          fontFamily: "'ArialMT','Arial',sans-serif",
          fontSize: "22.337px",
        }}
        transform="matrix(1.10593 0 0 1.04858 447.118 1266.997)"
      >
        {"Rehtori"}
      </text>
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "22.337px",
        }}
        transform="translate(407.557 1350.988) scale(1.4848)"
      >
        {"2171"}
      </text>
      <text
        x={701.608}
        y={63}
        style={{
          fontFamily: "'ArialMT','Arial',sans-serif",
          fontSize: "22.337px",
        }}
        transform="matrix(1.10593 0 0 1.04858 687.988 1401.858)"
      >
        {"Neuvottelutila"}
      </text>
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "22.337px",
        }}
        transform="translate(407.557 1462.099) scale(1.4848)"
      >
        {"2173"}
      </text>
      <text
        x={701.608}
        y={63}
        style={{
          fontFamily: "'ArialMT','Arial',sans-serif",
          fontSize: "22.337px",
        }}
        transform="matrix(1.10593 0 0 1.04858 687.988 1512.969)"
      >
        {"Neuvottelutila"}
      </text>
      <text
        x={702.213}
        y={63}
        style={{
          fontFamily: "'ArialMT','Arial',sans-serif",
          fontSize: "22.337px",
        }}
        transform="matrix(1.10593 0 0 1.04858 687.597 1627.511)"
      >
        {"Odotushuone"}
      </text>
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "22.337px",
        }}
        transform="translate(408.03 1237.608) scale(1.4848)"
      >
        {"2168"}
      </text>
      <text
        x={732.648}
        y={63}
        style={{
          fontFamily: "'ArialMT','Arial',sans-serif",
          fontSize: "22.337px",
        }}
        transform="matrix(1.10593 0 0 1.04858 448.24 1643.05)"
      >
        {"L\xE4\xE4k\xE4ri"}
      </text>
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "22.337px",
        }}
        transform="translate(169.827 1591.276) scale(1.4848)"
      >
        {"2174"}
      </text>
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "22.337px",
        }}
        transform="translate(168.304 1484.115) scale(1.4848)"
      >
        {"2172"}
      </text>
      <text
        x={684.839}
        y={63}
        style={{
          fontFamily: "'ArialMT','Arial',sans-serif",
          fontSize: "22.337px",
        }}
        transform="matrix(.72982 0 0 .69198 739.771 1817.207)"
      >
        {"T"}
        <tspan x="696.007px 708.43px" y="63px 63px">
          {"er"}
        </tspan>
        {"veydenhoitaja"}
      </text>
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "22.337px",
        }}
        transform="translate(169.827 1746.832) scale(1.4848)"
      >
        {"2175"}
      </text>
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "22.337px",
        }}
        transform="translate(169.948 1876.498) scale(1.4848)"
      >
        {"2177"}
      </text>
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "22.337px",
        }}
        transform="matrix(1.27534 0 0 1.27534 565.06 980.838)"
      >
        {"2164"}
      </text>
      <text
        x={701.608}
        y={63}
        style={{
          fontFamily: "'ArialMT','Arial',sans-serif",
          fontSize: "22.337px",
        }}
        transform="matrix(.94991 0 0 .90066 805.93 1024.532)"
      >
        {"Neuvottelutila"}
      </text>
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "22.337px",
        }}
        transform="matrix(1.27534 0 0 1.27534 989.134 980.838)"
      >
        {"2406"}
      </text>
      <text
        x={701.608}
        y={63}
        style={{
          fontFamily: "'ArialMT','Arial',sans-serif",
          fontSize: "22.337px",
        }}
        transform="matrix(.94991 0 0 .90066 1230.004 1024.532)"
      >
        {"Neuvottelutila"}
      </text>
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "22.337px",
        }}
        transform="translate(884.053 820.955) scale(2.00609)"
      >
        {"2408"}
      </text>
      <text
        x={718.993}
        y={63}
        style={{
          fontFamily: "'ArialMT','Arial',sans-serif",
          fontSize: "22.337px",
        }}
        transform="matrix(1.4942 0 0 1.41673 1262.94 889.686)"
      >
        {"Opetustila"}
      </text>
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "22.337px",
        }}
        transform="translate(1139.147 2250.96) scale(2.00609)"
      >
        {"2227"}
      </text>
      <text
        x={729.54}
        y={63}
        style={{
          fontFamily: "'ArialMT','Arial',sans-serif",
          fontSize: "22.337px",
        }}
        transform="matrix(1.4942 0 0 1.41673 1518.032 2319.701)"
      >
        {"Biologia"}
      </text>
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "22.337px",
        }}
        transform="translate(898.955 2250.96) scale(2.00609)"
      >
        {"2226"}
      </text>
      <text
        x={718.993}
        y={63}
        style={{
          fontFamily: "'ArialMT','Arial',sans-serif",
          fontSize: "22.337px",
        }}
        transform="matrix(1.4942 0 0 1.41673 1277.841 2319.701)"
      >
        {"Opetustila"}
      </text>
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "22.337px",
        }}
        transform="translate(635.992 2250.96) scale(2.00609)"
      >
        {"2225"}
      </text>
      <text
        x={718.993}
        y={63}
        style={{
          fontFamily: "'ArialMT','Arial',sans-serif",
          fontSize: "22.337px",
        }}
        transform="matrix(1.4942 0 0 1.41673 1014.879 2319.701)"
      >
        {"Opetustila"}
      </text>
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "22.337px",
        }}
        transform="translate(403.037 2334.664) scale(2.00609)"
      >
        {"2223"}
      </text>
      <text
        x={718.993}
        y={63}
        style={{
          fontFamily: "'ArialMT','Arial',sans-serif",
          fontSize: "22.337px",
        }}
        transform="matrix(1.4942 0 0 1.41673 781.921 2403.386)"
      >
        {"Opetustila"}
      </text>
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "22.337px",
        }}
        transform="translate(1154.888 826.66) scale(2.00609)"
      >
        {"2409"}
      </text>
      <text
        x={705.954}
        y={63}
        style={{
          fontFamily: "'ArialMT','Arial',sans-serif",
          fontSize: "22.337px",
        }}
        transform="matrix(1.4942 0 0 1.41673 1533.773 895.392)"
      >
        {"Keitti\xF6luokka"}
      </text>
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "22.337px",
        }}
        transform="translate(1622.99 630.214) scale(2.00609)"
      >
        {"2313"}
      </text>
      <text
        x={737.622}
        y={63}
        style={{
          fontFamily: "'ArialMT','Arial',sans-serif",
          fontSize: "22.337px",
        }}
        transform="matrix(1.4942 0 0 1.41673 2001.868 698.946)"
      >
        {"Kemia"}
      </text>
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "22.337px",
        }}
        transform="matrix(2.35205 0 0 2.35205 1282.899 1222.327)"
      >
        {"2321"}
      </text>
      <text
        x={737.622}
        y={63}
        style={{
          fontFamily: "'ArialMT','Arial',sans-serif",
          fontSize: "22.337px",
        }}
        transform="matrix(1.7519 0 0 1.66105 1727.126 1302.912)"
      >
        {"Kemia"}
      </text>
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "22.337px",
        }}
        transform="matrix(2.35205 0 0 2.35205 1282.899 1469.549)"
      >
        {"2322"}
      </text>
      <text
        x={737.622}
        y={63}
        style={{
          fontFamily: "'ArialMT','Arial',sans-serif",
          fontSize: "22.337px",
        }}
        transform="matrix(1.7519 0 0 1.66105 1727.126 1550.134)"
      >
        {"Kemia"}
      </text>
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "22.337px",
        }}
        transform="matrix(1.77004 0 0 1.77004 1745.485 2349.701)"
      >
        {"2339"}
      </text>
      <text
        x={729.54}
        y={63}
        style={{
          fontFamily: "'ArialMT','Arial',sans-serif",
          fontSize: "22.337px",
        }}
        transform="matrix(1.31838 0 0 1.25002 2079.794 2410.35)"
      >
        {"Biologia"}
      </text>
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "22.337px",
        }}
        transform="matrix(1.77004 0 0 1.77004 2049.183 2250.627)"
      >
        {"2340"}
      </text>
      <text
        x={720.231}
        y={63}
        style={{
          fontFamily: "'ArialMT','Arial',sans-serif",
          fontSize: "22.337px",
        }}
        transform="matrix(1.31838 0 0 1.25002 2383.498 2311.275)"
      >
        {"Maantieto"}
      </text>
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "22.337px",
        }}
        transform="matrix(1.27534 0 0 1.27534 1165.06 986.603)"
      >
        {"2410"}
      </text>
      <text
        x={701.608}
        y={63}
        style={{
          fontFamily: "'ArialMT','Arial',sans-serif",
          fontSize: "22.337px",
        }}
        transform="matrix(.94991 0 0 .90066 1405.93 1030.297)"
      >
        {"Neuvottelutila"}
      </text>
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "22.337px",
        }}
        transform="matrix(1.27534 0 0 1.27534 327.614 751.938)"
      >
        {"2146"}
      </text>
      <text
        x={737}
        y={63}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "22.337px",
        }}
        transform="matrix(1.27534 0 0 1.27534 326.807 1365.826)"
      >
        {"2169"}
      </text>
      <path
        d="M974 415v77h254M1565 1269h-51"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".6px",
          strokeLinejoin: "miter",
          strokeMiterlimit: 1,
        }}
        transform="scale(1.85185)"
      />
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
        transform="matrix(1.341 0 0 1.341 910.855 -220.433)"
      />
      <text
        x={1437.86}
        y={734}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "13.97px",
        }}
        transform="matrix(1.341 0 0 1.341 911.303 -221.105)"
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
        transform="matrix(1.341 0 0 1.341 -409.514 -300.063)"
      />
      <text
        x={1437.86}
        y={734}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "13.97px",
        }}
        transform="matrix(1.341 0 0 1.341 -409.066 -300.735)"
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
        transform="matrix(1.341 0 0 1.341 -428.959 899.936)"
      />
      <text
        x={1437.86}
        y={734}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "13.97px",
        }}
        transform="matrix(1.341 0 0 1.341 -428.51 899.264)"
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
        transform="matrix(1.341 0 0 1.341 930.3 1272.158)"
      />
      <text
        x={1437.86}
        y={734}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "13.97px",
        }}
        transform="matrix(1.341 0 0 1.341 930.747 1271.486)"
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
        transform="matrix(1.341 0 0 1.341 -34.515 1272.158)"
      />
      <text
        x={1437.86}
        y={734}
        style={{
          fontFamily: "'Arial-BoldMT','Arial',sans-serif",
          fontWeight: 700,
          fontSize: "13.97px",
        }}
        transform="matrix(1.341 0 0 1.341 -34.067 1271.486)"
      >
        {"WC"}
      </text>
      <circle
        cx={946.5}
        cy={592.5}
        r={27.5}
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: ".3px",
          strokeLinejoin: "miter",
          strokeMiterlimit: 1,
        }}
        transform="translate(-12.963 1.852) scale(1.85185)"
      />
    </svg>
  )
}
