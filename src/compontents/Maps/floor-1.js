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
      d="M7 710V537h127V123h326v-22h705v68.5h30V238h307V123h185v343h521V350h233v749h111v196h-111v28h-233v-28h-713v-268h76V764h-179v-70H351v16H7Z"
      style={{
        fill: "var(--map-background)",
      }}
    />
    <path
      d="M1502 475h186v-4"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".56px",
      }}
    />
    <path
      d="M1648 764h122v260"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".55px",
      }}
      transform="matrix(1 0 0 1.01154 0 -8.815)"
    />
    <path
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".56px",
      }}
      d="M2002 478h12v32h-12zM2178 478h10v30h-10zM2020 470h50v8h-50z"
    />
    <path
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".56px",
      }}
      d="M2020 470h50v8h-50z"
      transform="translate(103)"
    />
    <path
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".56px",
      }}
      d="M1796 478h11v32h-11zM1840 478h11v32h-11zM1672 504h15v84h-15z"
    />
    <path
      d="M2270 467h-56"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: "1.1px",
      }}
      transform="matrix(1.02679 0 0 1 -59.304 0)"
    />
    <path
      d="M2270 467h-56"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: "1.11px",
      }}
      transform="translate(1.5 -40)"
    />
    <path
      d="M2379.5 546v31"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: "1.08px",
      }}
      transform="matrix(1 0 0 1.06452 0 -35.226)"
    />
    <path
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".56px",
      }}
      d="M2360 1018h39v29h-39zM2253 1018h39v29h-39zM1419 681h56v8h-56z"
    />
    <path
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".57px",
      }}
      d="M1594 673h15v16h-15zM1612 673h15v16h-15zM1631 673h15v16h-15z"
      transform="matrix(1 0 0 .9375 0 42.063)"
    />
    <path
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".56px",
      }}
      d="M381 646h13v43h-13zM419 646h13v43h-13zM1342 500h21v22h-21zM1342 538h29v44h-29zM1728 1074h25v19h-25z"
    />
    <path
    onClick={() => onLoad('Piazza')}
      style={{
        opacity: rooms.list['content'].includes('Piazza') ? 1 : 0.5,
        cursor: 'pointer',
        cursor: 'pointer',
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1872 807h229v220h-229z"
    />
    <path
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".56px",
      }}
      d="M1815 1102h68v16h-68zM1897 1102h64v16h-64zM1773 1074h16v19h-16zM1815 1059h146v18h-146z"
    />
    <path
      d="M2100 1229v58"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: "1.11px",
      }}
    />
    <path
      d="M2100 1229v58"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: "1.11px",
      }}
      transform="translate(112)"
    />
    <path
      d="M1419.5 440v25M1344 440v31h33M1495 440v25"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: "1.11px",
      }}
    />
    <path
      d="M7 710V537h127V123h326v-22h705v68.5h30V238h307V123h185v343h521V350h233v749h111v196h-111v28h-233v-28h-713v-268h76V764h-179v-70H351v16H7ZM147 537h-13"
      style={{
        fill: "none",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
    />
    <path
    onClick={() => onLoad('1118')}
      style={{
        opacity: rooms.list['content'].includes('1118') ? 1 : 0.5,
        cursor: 'pointer',
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1502 122h185v116h-185z"
      transform="matrix(.91351 0 0 .92241 137.903 18.465)"
    />
    <path
    onClick={() => onLoad('1504')}
      style={{
        opacity: rooms.list['content'].includes('1504') ? 1 : 0.5,
        cursor: 'pointer',
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M147 135h215v114H147z"
    />
    <path
    onClick={() => onLoad('1508')}
      style={{
        opacity: rooms.list['content'].includes('1508') ? 1 : 0.5,
        cursor: 'pointer',
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M147 259h274v280H147z"
      transform="matrix(1 0 0 .99286 0 1.85)"
    />
    <path
      d="M630 579v42"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: "1.11px",
      }}
    />
    <path
    onClick={() => onLoad('1513')}
      style={{
        opacity: rooms.list['content'].includes('1513') ? 1 : 0.5,
        cursor: 'pointer',
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M471 111h233v97H471z"
    />
    <path
    onClick={() => onLoad('1519')}
      style={{
        opacity: rooms.list['content'].includes('1519') ? 1 : 0.5,
        cursor: 'pointer',
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M704 111h225v97H704z"
    />
    <path
    onClick={() => onLoad('1520')}
      style={{
        opacity: rooms.list['content'].includes('1520') ? 1 : 0.5,
        cursor: 'pointer',
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M929 111h226v97H929z"
    />
    <path
    onClick={() => onLoad('1525')}
      style={{
        opacity: rooms.list['content'].includes('1525') ? 1 : 0.5,
        cursor: 'pointer',
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1137 246h170v114h-170z"
    />
    <path
    onClick={() => onLoad('1530')}
      style={{
        opacity: rooms.list['content'].includes('1530') ? 1 : 0.5,
        cursor: 'pointer',
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1137 360h170v112h-170z"
    />
    <path
    onClick={() => onLoad('1528')}
      style={{
        opacity: rooms.list['content'].includes('1528') ? 1 : 0.5,
        cursor: 'pointer',
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1344 246h151v114h-151z"
    />
    <path
    onClick={() => onLoad('1562')}
      style={{
        opacity: rooms.list['content'].includes('1562') ? 1 : 0.5,
        cursor: 'pointer',
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1344 360h151v75h-151z"
    />
    <path
    onClick={() => onLoad('1532')}
      style={{
        opacity: rooms.list['content'].includes('1532') ? 1 : 0.5,
        cursor: 'pointer',
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1383 472h112v117h-112z"
    />
    <path
    onClick={() => onLoad('1534')}
      style={{
        opacity: rooms.list['content'].includes('1534') ? 1 : 0.5,
        cursor: 'pointer',
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1157 472h115v117h-115z"
    />
    <path
    onClick={() => onLoad('1106')}
      style={{
        opacity: rooms.list['content'].includes('1106') ? 1 : 0.5,
        cursor: 'pointer',
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M1084 472h73v79h-73z"
    />
    <path
    onClick={() => onLoad('LI1')}
      style={{
        opacity: rooms.list['content'].includes('LI1') ? 1 : 0.5,
        cursor: 'pointer',
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M488 264h540v309H488z"
    />
    <path
    onClick={() => onLoad('1311')}
      style={{
        opacity: rooms.list['content'].includes('1311') ? 1 : 0.5,
        cursor: 'pointer',
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M2326 358h115v181h-115z"
      transform="matrix(.93044 0 0 1 161.809 0)"
    />
    <path
    onClick={() => onLoad('1315')}
      style={{
        opacity: rooms.list['content'].includes('1315') ? 1 : 0.5,
        cursor: 'pointer',
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M2214 585h227v109h-227z"
    />
    <path
    onClick={() => onLoad('1318')}
      style={{
        opacity: rooms.list['content'].includes('1318') ? 1 : 0.5,
        cursor: 'pointer',
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M2214 789h100v186h-100z"
    />
    <path
    onClick={() => onLoad('1317')}
      style={{
        opacity: rooms.list['content'].includes('1317') ? 1 : 0.5,
        cursor: 'pointer',
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M2326 789h115v186h-115z"
    />
    <path
    onClick={() => onLoad('Yrityskylä')}
      style={{
        opacity: rooms.list['content'].includes('Yrityskylä') ? 1 : 0.5,
        cursor: 'pointer',
        fill: "var(--map-fill)",
        stroke: "var(--map-outline)",
        strokeWidth: "2.00px",
      }}
      d="M7 539h131v173H7z"
      transform="matrix(.9313 0 0 .90173 9.48 59.965)"
    />
    <path
      d="M1130 252h-41v212M1034 573h4v84H801v-30.5h-45V648h-45v15h-81v-36.5h-38V663h-55v-15h-49v-69M537 579v63M592 579v42M711 579v64M756 579v42M801 579v42M1089 557v100h68v-62M1164 596h109v61h-109z"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: "1.11px",
      }}
    />
    <path
      d="M419 546v49H144h6v-49"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: "1.08px",
      }}
      transform="matrix(1 0 0 1.06122 0 -36.429)"
    />
    <path
      d="M144 610.5h46V703M296 703v-40h63v24M1572 245v75h-69M1594.5 245v117h64.5v28h20M1503 545h69v43h-69"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: "1.11px",
      }}
    />
    <path
      d="M1721 475v39h-34v74h80V474"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: "1.1px",
      }}
      transform="matrix(1 0 0 1.02632 0 -15.474)"
    />
    <path
      d="M1870 474v47h120v-47"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: "1.08px",
      }}
      transform="matrix(1 0 0 1.06383 0 -33.255)"
    />
    <path
      d="M2209 474v82h69V435M1398 692h103v4h76v-7h67v75h-67M1501 700v58"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: "1.11px",
      }}
    />
    <path
      d="M1501 700v58"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: "1.11px",
      }}
      transform="translate(76 1)"
    />
    <path
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: "1.11px",
      }}
      d="M1775 760h39v106h-39zM2169 760h39v106h-39zM2216 700v82"
    />
    <path
      d="M2319 789h3"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".94px",
      }}
      transform="matrix(1.33333 0 0 1 -774 0)"
    />
    <path
      d="M2319 789h3"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".94px",
      }}
      transform="matrix(1.33333 0 0 1 -774 186)"
    />
    <path
      d="M1578 1027h4v121h111v4h69v-4h115v75h-295v-37.5h-9v37.5h-71M1582 1152v29M1693 1157v60"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: "1.11px",
      }}
    />
    <path
      d="M1693 1157v60"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: "1.11px",
      }}
      transform="translate(69)"
    />
    <path
      d="M1502 1249h420v-26h-13v-75h80v-35h111v105h112v-3h171.5v-84h57.5v-25M1937 1153v64"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: "1.11px",
      }}
    />
    <path
      d="M1937 1153v64"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: "1.11px",
      }}
      transform="translate(52 .5)"
    />
    <path
      d="M1928 1223h172M2388 1215h157M2441 1135v75"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: "1.11px",
      }}
    />
    <path
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".56px",
      }}
      d="M2130 1125h100v17h-100zM2249 1125h106v17h-106zM2130 1164h100v17h-100zM2249 1164h106v17h-106zM2240 1202h77v13h-77zM2317 1206h29v9h-29z"
    />
    <path
      d="M416 251v-52h47"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: "1.11px",
      }}
    />
    <path
      d="M1165 237v-17"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: ".74px",
      }}
      transform="matrix(1 0 0 1.88235 0 -206.118)"
    />
    <path
      d="M1165 208h-5"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: "1.11px",
      }}
    />
    <path
      d="M2326 577v-31"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: "1.08px",
      }}
      transform="matrix(1 0 0 1.06452 0 -35.226)"
    />
    <text
      x={239}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1508') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "39.089px",
      }}
      transform="translate(.853 6.828)"
    >
      {"1508"}
    </text>
    <text
      x={239}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1508') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "39.089px",
      }}
      transform="matrix(.65182 0 0 .65182 86.053 169.792)"
    >
      {"Otasali"}
    </text>
    <text
      x={239}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1504') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "39.089px",
      }}
      transform="translate(36.241 -110.299) scale(.77083)"
    >
      {"1504"}
    </text>
    <text
      x={239}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1504') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "39.089px",
      }}
      transform="translate(101.312 17.455) scale(.50244)"
    >
      {"Musiikki"}
    </text>
    <text
      x={239}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1513') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "39.089px",
      }}
      transform="translate(369.241 -142.799) scale(.77083)"
    >
      {"1513"}
    </text>
    <text
      x={239}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1513') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "39.089px",
      }}
      transform="translate(432.467 -19.564) scale(.50244)"
    >
      {"Musiikki"}
    </text>
    <text
      x={239}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1519') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "39.089px",
      }}
      transform="translate(598.212 -137.265) scale(.77083)"
    >
      {"1519"}
    </text>
    <text
      x={220.496}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1519') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "39.089px",
      }}
      transform="translate(661.437 -14.03) scale(.50244)"
    >
      {"Opetustila"}
    </text>
    <text
      x={239}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1520') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "39.089px",
      }}
      transform="translate(825.212 -137.265) scale(.77083)"
    >
      {"1520"}
    </text>
    <text
      x={220.496}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1520') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "39.089px",
      }}
      transform="translate(888.437 -14.03) scale(.50244)"
    >
      {"Opetustila"}
    </text>
    <text
      x={239}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1525') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "39.089px",
      }}
      transform="translate(1003.72 .061) scale(.77083)"
    >
      {"1525"}
    </text>
    <text
      x={221.564}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1525') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "39.089px",
      }}
      transform="translate(1066.94 123.296) scale(.50244)"
    >
      {"Kuvataide"}
    </text>
    <text
      x={239}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1530') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "39.089px",
      }}
      transform="translate(1003.72 105.061) scale(.77083)"
    >
      {"1530"}
    </text>
    <text
      x={221.564}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1530') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "39.089px",
      }}
      transform="translate(1066.94 228.296) scale(.50244)"
    >
      {"Kuvataide"}
    </text>
    <text
      x={239}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1534') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "39.089px",
      }}
      transform="translate(995.91 231.275) scale(.77083)"
    >
      {"1534"}
    </text>
    <text
      x={255.262}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1534') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "39.089px",
      }}
      transform="translate(1059.14 354.509) scale(.50244)"
    >
      {"Media"}
    </text>
    <text
      x={239}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1106') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "39.089px",
      }}
      transform="matrix(.45746 0 0 .45746 990.774 332.806)"
    >
      {"1"}
      <tspan x="258.583px 280.322px" y="393px 393px">
        {"10"}
      </tspan>
      {"6"}
    </text>
    <text
      x={238.962}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1106') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "39.089px",
      }}
      transform="matrix(.29818 0 0 .29818 1028.3 405.941)"
    >
      {"Editointi"}
    </text>
    <text
      x={239}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1528') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "39.089px",
      }}
      transform="translate(1205.72 -8.749) scale(.77083)"
    >
      {"1528"}
    </text>
    <text
      x={202.039}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1528') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "39.089px",
      }}
      transform="translate(1268.94 114.486) scale(.50244)"
    >
      {"Makerspace"}
    </text>
    <text
      x={239}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1118') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "39.089px",
      }}
      transform="translate(1375.95 -122.939) scale(.77083)"
    >
      {"1"}
      <tspan x="258.583px 278.166px 299.905px" y="393px 393px 393px">
        {"118"}
      </tspan>
    </text>
    <text
      x={186.827}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1118') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "39.089px",
      }}
      transform="translate(1439.18 .296) scale(.50244)"
    >
      {"Kirjastoluokka"}
    </text>
    <text
      x={239}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1311') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "39.089px",
      }}
      transform="translate(2164.95 145.561) scale(.77083)"
    >
      {"131"}
      <tspan x={302.062} y={393}>
        {"1"}
      </tspan>
    </text>
    <text
      x={237.912}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1311') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "39.089px",
      }}
      transform="translate(2228.18 268.796) scale(.50244)"
    >
      {"Fysiikka"}
    </text>
    <text
      x={239}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1315') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "39.089px",
      }}
      transform="translate(2108.89 336.446) scale(.77083)"
    >
      {"1315"}
    </text>
    <text
      x={237.912}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1315') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "39.089px",
      }}
      transform="translate(2172.11 459.681) scale(.50244)"
    >
      {"Fysiikka"}
    </text>
    <text
      x={239}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1318') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "39.089px",
      }}
      transform="translate(2045.39 578.946) scale(.77083)"
    >
      {"1318"}
    </text>
    <text
      x={237.912}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1318') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "39.089px",
      }}
      transform="translate(2108.61 702.181) scale(.50244)"
    >
      {"Fysiikka"}
    </text>
    <text
      x={239}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1317') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "39.089px",
      }}
      transform="translate(2164.89 582.528) scale(.77083)"
    >
      {"1317"}
    </text>
    <text
      x={237.912}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1317') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "39.089px",
      }}
      transform="translate(2228.11 705.763) scale(.50244)"
    >
      {"Fysiikka"}
    </text>
    <text
      x={239}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1562') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "39.089px",
      }}
      transform="translate(1200.95 94.561) scale(.77083)"
    >
      {"1562"}
    </text>
    <text
      x={202.039}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1562') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'ArialMT','Arial',sans-serif",
        fontSize: "39.089px",
      }}
      transform="translate(1264.18 217.796) scale(.50244)"
    >
      {"Makerspace"}
    </text>
    <text
      x={189.05}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('1532') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "39.089px",
      }}
      transform="matrix(.39014 0 0 .39014 1318.35 380.886)"
    >
      {"OPK-HUONE"}
    </text>
    <text
      x={216.134}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('Yrityskylä') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "39.089px",
      }}
      transform="matrix(.39014 0 0 .39014 -47.808 477.632)"
    >
      {"Yrityskyl\xE4"}
    </text>
    <text
      x={237.922}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('Piazza') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "39.089px",
      }}
      transform="matrix(.39014 0 0 .39014 1866.19 769.132)"
    >
      {"PIAZZA"}
    </text>
    <text
      x={200.97}
      y={393}
      style={{
        opacity: rooms.list['content'].includes('Yrityskylä') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "39.089px",
      }}
      transform="matrix(.39014 0 0 .39014 637.118 270.632)"
    >
      {"Liikuntasali"}
    </text>
    <circle
      cx={1449.5}
      cy={728.5}
      r={14.5}
      style={{
        fill: "var(--map-background)",
        fillOpacity: 0,
        stroke: "var(--map-outline)",
        strokeWidth: "1.53px",
      }}
      fill="none"
      transform="matrix(.72414 0 0 .72414 395.862 198.966)"
    />
    <text
      x={1437.86}
      y={734}
      style={{
        opacity: rooms.list['content'].includes('Yrityskylä') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "13.97px",
      }}
      transform="matrix(.72414 0 0 .72414 396.104 198.603)"
    >
      {"WC"}
    </text>
    <circle
      cx={1449.5}
      cy={728.5}
      r={14.5}
      style={{
        fill: "var(--map-background)",
        fillOpacity: 0,
        stroke: "var(--map-outline)",
        strokeWidth: "1.53px",
      }}
      fill="none"
      transform="matrix(.72414 0 0 .72414 -66.138 81.966)"
    />
    <text
      x={1437.86}
      y={734}
      style={{
        opacity: rooms.list['content'].includes('Yrityskylä') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "13.97px",
      }}
      transform="matrix(.72414 0 0 .72414 -65.896 81.603)"
    >
      {"WC"}
    </text>
    <circle
      cx={1449.5}
      cy={728.5}
      r={14.5}
      style={{
        fill: "var(--map-background)",
        fillOpacity: 0,
        stroke: "var(--map-outline)",
        strokeWidth: "1.53px",
      }}
      fill="none"
      transform="matrix(.72414 0 0 .72414 -193.138 81.966)"
    />
    <text
      x={1437.86}
      y={734}
      style={{
        opacity: rooms.list['content'].includes('Yrityskylä') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "13.97px",
      }}
      transform="matrix(.72414 0 0 .72414 -192.896 81.603)"
    >
      {"WC"}
    </text>
    <circle
      cx={1449.5}
      cy={728.5}
      r={14.5}
      style={{
        fill: "var(--map-background)",
        fillOpacity: 0,
        stroke: "var(--map-outline)",
        strokeWidth: "1.53px",
      }}
      fill="none"
      transform="matrix(.72414 0 0 .72414 1193.777 -18.034)"
    />
    <text
      x={1437.86}
      y={734}
      style={{
        opacity: rooms.list['content'].includes('Yrityskylä') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "13.97px",
      }}
      transform="matrix(.72414 0 0 .72414 1194.019 -18.397)"
    >
      {"WC"}
    </text>
    <circle
      cx={1449.5}
      cy={728.5}
      r={14.5}
      style={{
        fill: "var(--map-background)",
        fillOpacity: 0,
        stroke: "var(--map-outline)",
        strokeWidth: "1.53px",
      }}
      fill="none"
      transform="matrix(.72414 0 0 .72414 486.777 -246.034)"
    />
    <text
      x={1437.86}
      y={734}
      style={{
        opacity: rooms.list['content'].includes('Yrityskylä') ? 1 : 0.5,
        fill: 'var(--map-h1)',
        fontFamily: "'Arial-BoldMT','Arial',sans-serif",
        fontWeight: 700,
        fontSize: "13.97px",
      }}
      transform="matrix(.72414 0 0 .72414 487.019 -246.397)"
    >
      {"WC"}
    </text>
    <path
      d="M2318 427h-40v-69"
      style={{
        fill: "none",
        stroke: "var(--map-details)",
        strokeWidth: "1.11px",
      }}
    />
  </svg>
  )
}
