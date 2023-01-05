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
      d="M647 7h237v135h90v266h523V269h283v888h125v241H974v-43h-90v58H647V7Z"
      style={{
        fill: "var(--map-background)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
    />
    <path
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".3px",
      }}
      d="M974 790h42v197h-42z"
    />
    <path
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".32px",
      }}
      d="M974 790h42v197h-42z"
      transform="matrix(.88095 0 0 1 598.952 0)"
    />
    <path
      d="M971 1091v71M971 1068h-10v20h20v-11"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".3px",
      }}
    />
    <path
      d="M888 548h86v-51"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".59px",
      }}
      transform="matrix(1 0 0 1.03922 0 -21.49)"
    />
    <path
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".31px",
      }}
      d="M744 1257h141v44H744z"
      transform="matrix(.93617 0 0 1 52.49 0)"
    />
    <path
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".3px",
      }}
      d="M915 799h48v26h-48zM1633 1070h18v17h-18z"
    />
    <path
      d="M1533 503h47v112h-47M1508 462h72V354h-33v-44h81"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
      }}
    />
    <path
      d="M1568 1263v-101h26v101"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".59px",
      }}
      transform="matrix(1 0 0 1.0297 0 -34.515)"
    />
    <path
      d="M977 1269h-3v-107h108v37h21"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
      }}
    />
    <path
      d="M652 1303h316v44"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".58px",
      }}
      transform="matrix(1 0 0 1.06818 0 -88.84)"
    />
    <path
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
      }}
      d="M744 1210h141v45H744zM782 993h63"
    />
    <path
      d="M782 993h63"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".47px",
      }}
      transform="matrix(1.49206 0 0 1 -515.794 -180)"
    />
    <path
      d="M782 993h63"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
      }}
      transform="translate(-.5 39)"
    />
    <path
      d="M651.5 367.5H745M777 478v54"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
      }}
    />
    <path
      d="M777 478v54"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
      }}
      transform="translate(40)"
    />
    <path
      d="M777 478v54"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
      }}
      transform="translate(104)"
    />
    <path
      onClick={() => onLoad('2225')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1106 1162h133v230h-133z"
    />
    <path
      onClick={() => onLoad('2223')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M975 1269h131v123H975z"
      transform="matrix(.96183 0 0 1 42.214 0)"
    />
    <path
    onClick={() => onLoad('2313')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1633 278h138v261h-138z"
    />
    <path
    onClick={() => onLoad('2409')}
      d="M1370 408h132v95h26v112h-158V408Z"
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
    />
    <path
    onClick={() => onLoad('2406')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1014 531h90v84h-90z"
    />
    <path
    onClick={() => onLoad('2403')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1014 531h90v84h-90z"
      transform="matrix(.5 0 0 1 512 -123)"
    />
    <path
    onClick={() => onLoad('2402')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1014 531h90v84h-90z"
      transform="matrix(.5 0 0 1 467 -123)"
    />
    <path
    onClick={() => onLoad('2404')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1014 531h90v84h-90z"
      transform="matrix(.5 0 0 1 557 -123)"
    />
    <path
    onClick={() => onLoad('2405')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1014 531h90v84h-90z"
      transform="matrix(.5 0 0 1 602 -123)"
    />
    <path
    onClick={() => onLoad('2407')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1014 531h90v84h-90z"
      transform="matrix(.91111 0 0 1 230.133 -123)"
    />
    <path
    onClick={() => onLoad('2410')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1104 531h97v84h-97z"
    />
    <path
    onClick={() => onLoad('2408')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1236 408h134v207h-134z"
    />
    <path
    onClick={() => onLoad('2129')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M654 14h224v128H654z"
    />
    <path
      onClick={() => onLoad('2148')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M777 411h106v61H777z"
    />
    <path
    onClick={() => onLoad('2164')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M777 537h106v72H777z"
    />
    <path
    onClick={() => onLoad('2146')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M654 411h95v66h-95z"
    />
    <path
      onClick={() => onLoad('2159')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M654 477h95v60h-95z"
    />
    <path
    onClick={() => onLoad('2162')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M654 550h95v128h-95z"
    />
    <path
    onClick={() => onLoad('2167')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M654 678h95v69h-95z"
    />
    <path
    onClick={() => onLoad('2174')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M654 878h95v64h-95z"
    />
    <path
    onClick={() => onLoad('2177')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M654 1034h95v47h-95z"
    />
    <path
    onClick={() => onLoad('2175')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M654 954h95v80h-95z"
    />
    <path
    onClick={() => onLoad('2168')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M777 678h108v69H777z"
    />
    <path
    onClick={() => onLoad('2171')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M777 747h108v66H777z"
    />
    <path
    onClick={() => onLoad('2173')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M777 813h108v65H777z"
    />
    <path
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M777 878h108v64H777z"
    />
    <path
    onClick={() => onLoad('2321')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1548 674h223v132h-223z"
    />
    <path
    onClick={() => onLoad('2322')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1548 806h223v135h-223z"
    />
    <path
    onClick={() => onLoad('2240')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1771 1162h128v230h-128z"
    />
    <path
    onClick={() => onLoad('2239')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1571 1269h200v123h-200z"
    />
    <path
    onClick={() => onLoad('2227')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1374 1162h133v230h-133z"
    />
    <path
    onClick={() => onLoad('2226')}
      style={{
        fill: "var(--map-fill)",
        cursor: "pointer",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1239 1162h135v230h-135z"
    />
    <path
      d="M703 148v168"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".59px",
      }}
      transform="matrix(1 0 0 1.01786 0 -2.643)"
    />
    <path
      d="M785 148v96h60v-96M789 212h52M651 189h47"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
      }}
    />
    <path
      d="M651 189h47"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
      }}
      transform="translate(.5 46)"
    />
    <path
      d="M651 189h47"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
      }}
      transform="translate(.5 90)"
    />
    <path
      d="M651 324h98v82M777 406v-82h106v82M777 949v173h108v-90h-36v-39h36v-45M744 1086v36h-92"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
      }}
    />
    <path
      d="M1513 1170h20v93"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".59px",
      }}
      transform="matrix(1 0 0 1.03226 0 -37.742)"
    />
    <path
      d="M1650 1266v-72h117M1633 545v123M974 1074v-84h45V787h-45V687h520v100h-40v203h40v84H974Z"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
      }}
    />
    <path
      d="M1580 464v36"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
      }}
      transform="translate(-2)"
    />
    <path
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".3px",
      }}
      d="M1094 1086h25v45h-25zM1228 1085h24v44h-24zM1362 1085h24v44h-24zM1496 1085h20v50h-20zM1563 1068h27v67h-27zM1563 965h27v67h-27z"
    />
    <path
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".35px",
      }}
      d="M1496 1070h15v15h-15z"
      transform="matrix(.86667 0 0 .86667 199.467 142.667)"
    />
    <path
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".3px",
      }}
      d="M1098 672h10v6h-10z"
    />
    <path
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".3px",
      }}
      d="M1098 672h10v6h-10z"
      transform="translate(133)"
    />
    <path
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".3px",
      }}
      d="M1098 672h10v6h-10z"
      transform="translate(269)"
    />
    <path
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".3px",
      }}
      d="M1098 672h10v6h-10z"
      transform="translate(387 3)"
    />
    <path
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".3px",
      }}
      d="M1098 672h10v6h-10z"
      transform="translate(-124 3)"
    />
    <path
      d="M888 1078h70M913 449h30v70h-30zM913 417h58v15h-58z"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".3px",
      }}
    />
    <text
      x={737}
      y={63}
      style={{
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="translate(-122.549 -9.178) scale(1.16655)"
    >
      {"2129"}
    </text>
    <text
      x={737}
      y={63}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="matrix(.86888 0 0 .82383 97.773 30.79)"
    >
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
        fill: "var(--map-h1)"
      }}
      transform="matrix(.68868 0 0 .68868 305.133 398.153)"
    >
      {"2148"}
    </text>
    <text
      x={701.608}
      y={63}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="matrix(.51295 0 0 .48636 435.203 421.748)"
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
        fill: "var(--map-h1)"
      }}
      transform="matrix(.68868 0 0 .68868 176.633 463.653)"
    >
      {"2159"}
    </text>
    <text
      x={733.275}
      y={63}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="matrix(.51295 0 0 .48636 306.703 487.248)"
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
        fill: "var(--map-h1)"
      }}
      transform="matrix(.8018 0 0 .8018 90.448 563.534)"
    >
      {"2162"}
    </text>
    <text
      x={717.75}
      y={63}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="matrix(.5972 0 0 .56624 241.88 591.004)"
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
        fill: "var(--map-h1)"
      }}
      transform="matrix(.8018 0 0 .8018 90.011 656.708)"
    >
      {"2167"}
    </text>
    <text
      x={733.275}
      y={63}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="matrix(.5972 0 0 .56624 241.444 684.179)"
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
        fill: "var(--map-h1)"
      }}
      transform="matrix(.8018 0 0 .8018 220.081 729.534)"
    >
      {"2171"}
    </text>
    <text
      x={701.608}
      y={63}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="matrix(.5972 0 0 .56624 371.514 757.004)"
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
        fill: "var(--map-h1)"
      }}
      transform="matrix(.8018 0 0 .8018 220.081 789.534)"
    >
      {"2173"}
    </text>
    <text
      x={701.608}
      y={63}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="matrix(.5972 0 0 .56624 371.514 817.004)"
    >
      {"Neuvottelutila"}
    </text>
    <text
      x={702.213}
      y={63}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="matrix(.5972 0 0 .56624 371.303 878.857)"
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
        fill: "var(--map-h1)"
      }}
      transform="matrix(.8018 0 0 .8018 220.336 668.309)"
    >
      {"2168"}
    </text>
    <text
      x={732.648}
      y={63}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="matrix(.5972 0 0 .56624 242.05 887.248)"
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
        fill: "var(--map-h1)"
      }}
      transform="matrix(.8018 0 0 .8018 91.707 859.29)"
    >
      {"2174"}
    </text>
    <text
      x={684.839}
      y={63}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="matrix(.3941 0 0 .37367 399.477 981.293)"
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
        fill: "var(--map-h1)"
      }}
      transform="matrix(.8018 0 0 .8018 91.707 943.29)"
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
        fill: "var(--map-h1)"
      }}
      transform="matrix(.8018 0 0 .8018 91.772 1013.31)"
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
        fill: "var(--map-h1)"
      }}
      transform="matrix(.68868 0 0 .68868 305.133 529.653)"
    >
      {"2164"}
    </text>
    <text
      x={701.608}
      y={63}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="matrix(.51295 0 0 .48636 435.203 553.248)"
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
        fill: "var(--map-h1)"
      }}
      transform="matrix(.68868 0 0 .68868 534.133 529.653)"
    >
      {"2406"}
    </text>
    <text
      x={701.608}
      y={63}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="matrix(.51295 0 0 .48636 664.203 553.248)"
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
        fill: "var(--map-h1)"
      }}
      transform="matrix(.52206 0 0 .52206 598.923 421.23)"
    >
      {"2402"}
    </text>
    <text
      x={737}
      y={63}
      style={{
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="matrix(.52206 0 0 .52206 643.923 421.23)"
    >
      {"2403"}
    </text>
    <text
      x={737}
      y={63}
      style={{
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="matrix(.52206 0 0 .52206 688.881 421.23)"
    >
      {"2404"}
    </text>
    <text
      x={737}
      y={63}
      style={{
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="matrix(.52206 0 0 .52206 733.764 421.23)"
    >
      {"2405"}
    </text>
    <text
      x={737}
      y={63}
      style={{
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="matrix(.52206 0 0 .52206 797.307 421.23)"
    >
      {"2407"}
    </text>
    <text
      x={737}
      y={63}
      style={{
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="translate(477.389 443.316) scale(1.08329)"
    >
      {"2408"}
    </text>
    <text
      x={718.993}
      y={63}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="matrix(.80687 0 0 .76503 681.988 480.431)"
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
        fill: "var(--map-h1)"
      }}
      transform="translate(615.14 1215.52) scale(1.08329)"
    >
      {"2227"}
    </text>
    <text
      x={729.54}
      y={63}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="matrix(.80687 0 0 .76503 819.738 1252.64)"
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
        fill: "var(--map-h1)"
      }}
      transform="translate(485.436 1215.52) scale(1.08329)"
    >
      {"2226"}
    </text>
    <text
      x={718.993}
      y={63}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="matrix(.80687 0 0 .76503 690.035 1252.64)"
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
        fill: "var(--map-h1)"
      }}
      transform="translate(343.436 1215.52) scale(1.08329)"
    >
      {"2225"}
    </text>
    <text
      x={718.993}
      y={63}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="matrix(.80687 0 0 .76503 548.035 1252.64)"
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
        fill: "var(--map-h1)"
      }}
      transform="translate(217.64 1260.72) scale(1.08329)"
    >
      {"2223"}
    </text>
    <text
      x={718.993}
      y={63}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="matrix(.80687 0 0 .76503 422.238 1297.83)"
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
        fill: "var(--map-h1)"
      }}
      transform="translate(623.64 446.397) scale(1.08329)"
    >
      {"2409"}
    </text>
    <text
      x={705.954}
      y={63}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="matrix(.80687 0 0 .76503 828.238 483.512)"
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
        fill: "var(--map-h1)"
      }}
      transform="translate(876.415 340.316) scale(1.08329)"
    >
      {"2313"}
    </text>
    <text
      x={737.622}
      y={63}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="matrix(.80687 0 0 .76503 1081.01 377.431)"
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
        fill: "var(--map-h1)"
      }}
      transform="translate(692.766 660.057) scale(1.27011)"
    >
      {"2321"}
    </text>
    <text
      x={737.622}
      y={63}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="matrix(.94602 0 0 .89697 932.649 703.573)"
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
        fill: "var(--map-h1)"
      }}
      transform="translate(692.766 793.557) scale(1.27011)"
    >
      {"2322"}
    </text>
    <text
      x={737.622}
      y={63}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="matrix(.94602 0 0 .89697 932.649 837.073)"
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
        fill: "var(--map-h1)"
      }}
      transform="translate(942.563 1268.84) scale(.95582)"
    >
      {"2239"}
    </text>
    <text
      x={729.54}
      y={63}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="matrix(.71193 0 0 .67501 1123.09 1301.59)"
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
        fill: "var(--map-h1)"
      }}
      transform="translate(1106.56 1215.34) scale(.95582)"
    >
      {"2240"}
    </text>
    <text
      x={720.231}
      y={63}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="matrix(.71193 0 0 .67501 1287.09 1248.09)"
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
        fill: "var(--map-h1)"
      }}
      transform="matrix(.68868 0 0 .68868 629.133 532.766)"
    >
      {"2410"}
    </text>
    <text
      x={701.608}
      y={63}
      style={{
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "22.337px",
        fill: "var(--map-h1)"
      }}
      transform="matrix(.51295 0 0 .48636 759.203 556.361)"
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
        fill: "var(--map-h1)"
      }}
      transform="matrix(.68868 0 0 .68868 176.912 406.047)"
    >
      {"2146"}
    </text>
    <path
      d="M1565 1269h-51"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
        strokeLinejoin: "miter",
        strokeMiterlimit: 1,
      }}
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
      transform="matrix(.72414 0 0 .72414 491.862 -119.034)"
    />
    <text
      x={1437.86}
      y={734}
      style={{
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "13.97px",
      }}
      transform="matrix(.72414 0 0 .72414 492.104 -119.397)"
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
      transform="matrix(.72414 0 0 .72414 -221.138 -162.034)"
    />
    <text
      x={1437.86}
      y={734}
      style={{
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "13.97px",
      }}
      transform="matrix(.72414 0 0 .72414 -220.896 -162.397)"
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
      transform="matrix(.72414 0 0 .72414 -231.638 485.966)"
    />
    <text
      x={1437.86}
      y={734}
      style={{
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "13.97px",
      }}
      transform="matrix(.72414 0 0 .72414 -231.396 485.603)"
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
      transform="matrix(.72414 0 0 .72414 502.362 686.966)"
    />
    <text
      x={1437.86}
      y={734}
      style={{
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "13.97px",
      }}
      transform="matrix(.72414 0 0 .72414 502.604 686.603)"
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
      transform="matrix(.72414 0 0 .72414 -18.638 686.966)"
    />
    <text
      x={1437.86}
      y={734}
      style={{
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "13.97px",
      }}
      transform="matrix(.72414 0 0 .72414 -18.396 686.603)"
    >
      {"WC"}
    </text>
    <circle
      cx={946.5}
      cy={592.5}
      r={27.5}
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".3px",
        strokeLinejoin: "miter",
        strokeMiterlimit: 1,
      }}
      transform="translate(-7 1)"
    />
    <path
      style={{
        fill: "#fff",
        fillOpacity: 0,
        stroke: "var(--map-details)",
        strokeWidth: ".3px",
        strokeLinejoin: "miter",
        strokeMiterlimit: 1,
      }}
      fill="none"
      d="M794 613h70v14h-70z"
    />
    <path
      style={{
        fill: "#fff",
        fillOpacity: 0,
        stroke: "var(--map-details)",
        strokeWidth: ".3px",
        strokeLinejoin: "miter",
        strokeMiterlimit: 1,
      }}
      fill="none"
      d="M794 613h70v14h-70z"
      transform="translate(0 47)"
    />
    <path
      d="M777 874V750"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".6px",
        strokeLinejoin: "miter",
        strokeMiterlimit: 1,
      }}
      transform="translate(-28 1)"
    />
    <path
      d="M777 874V750"
      style={{
        fill: "none",
        stroke: "#000",
        strokeWidth: ".85px",
        strokeLinejoin: "miter",
        strokeMiterlimit: 1,
      }}
      transform="matrix(1 0 0 .04839 -28 908.71)"
    />
  </svg>
  )
}
